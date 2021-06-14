import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
//import { Button, Form, FormGroup, Label, Input, Spinner } from 'reactstrap';
import {useHandleChange, useValidate, useErrors} from './hooks';
import countryCodes from './static/countryCodes';
import BoateyApi from './BoateyApi';
import Errors from './Errors';

function ProfileForm({username, updateCurrentUser}) {

    const initialState = {zipCode: '', country: '', email: '',
                            password: '', password2: '', units: 'm'};

    const [isLoading, setIsLoading] = useState(true);
    const [formErrors, validate] = useValidate();
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const history = useHistory();

    useEffect(() => {
        async function getUserInfo() {

            /** Redirect to login page if not logged in */
            if (!username) {
                history.push('/');
                return false;
            };

            /** Gets info about logged in user and sets initial form data */
            try {
                const user = await BoateyApi.getUser(username);
                setData({zipCode: user.zipCode,
                        country: user.country,
                        email: user.email,
                        units: user.units});
            } catch (e) {
                getApiErrors(e);
            };
        };
        getUserInfo(username);
        setIsLoading(false);
    }, [username, setData, setIsLoading, history, getApiErrors]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({})

        /** Checks form for errors.
         * If errors, stops form submission and sets errors object
         */
        const isSignUpForm = false;
        const err = validate(data, isSignUpForm);
        if (Object.keys(err).length > 0) {
            setData({...data, password: '', password2: ''});
            return false;
        } else {
            setIsLoading(true);

            /** Removes second password from data object */
            const dataObj = data;
            delete dataObj.password2;
            dataObj.zipCode = dataObj.zipCode.toUpperCase();
            setData(dataObj);

            /** Submits data to update user info and redirects to home */
            try {
                await BoateyApi.updateUser(username, data);
                const location = {zipCode: data.zipCode, country: data.country};
                updateCurrentUser(username, localStorage.getItem("token"), location, data.units);
                history.push('/');
            } catch (e) {
                setData({...data, password: '', password2: ''});
                getApiErrors(e);
                setIsLoading(false);
            };
        };
    };

    if (isLoading) {
        return <p>I'm loading!</p>
    };

    return (
        <>
            <h2 className='formheading'>Update User Info For {username}</h2>
            <Errors formErrors={formErrors}
                    apiErrors={apiErrors} />
            { Object.keys(apiErrors).length === 0 && 
                <form onSubmit={handleSubmit}>
                    <label htmlFor='password'>New Password: </label>
                    <input type='password'
                            name='password' 
                            placeholder='New Password'
                            value={data.password || ''}
                            onChange={handleChange} />
                    <label htmlFor='password2'>Retype New Password: </label>
                    <input type='password'
                            name='password2' 
                            placeholder='Retype New Password'
                            value={data.password2 || ''}
                            onChange={handleChange} />
                    <label htmlFor='email'>Email: </label>
                    <input type='text'
                            name='email' 
                            value={data.email}
                            onChange={handleChange} />
                    <label htmlFor='zipCode'>Zip/Postal Code: </label>
                    <input type='text'
                            name='zipCode' 
                            value={data.zipCode}
                            onChange={handleChange} />
                    <label htmlFor='country'>Country: </label>
                    <select name='country'
                        value={data.country}
                        onChange={handleChange}>
                        {Object.entries(countryCodes).map(([country, code]) => 
                            <option value={code} key={code}>{country}</option>
                        )}
                    </select>
                    <label htmlFor='units'>Preferred Units of Measurement: </label>
                    <select name='units'
                            value={data.units}
                            onChange={handleChange}>
                        <option value='i'>Imperial</option>
                        <option value='m'>Metric</option>
                    </select>
                    <button>Update User Info</button>
                </form>
            }
        </>
    )
}

export default ProfileForm;