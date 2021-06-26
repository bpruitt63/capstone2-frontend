import React, {useState} from 'react';
import {useHistory, Redirect} from 'react-router-dom';
import {useHandleChange, useValidate, useErrors} from './hooks';
import countryCodes from './static/countryCodes';
import BoateyApi from './BoateyApi';
import Errors from './Errors';

/** Form to register new user */
function RegisterForm({username, updateCurrentUser}) {

    const [isLoading, setIsLoading] = useState(false);
    const initialState = {username: '', password: '', password2: '',
                            email: '', zipCode: '', country: 'US', units: 'm'};
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [formErrors, validate] = useValidate();
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const history = useHistory();

    /** Redirects to home if already logged in */
    if (username) {
        return <Redirect to='/' />
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});

        /** Checks form for errors.
         * If errors, stops form submission and sets errors object
         */
        const isSignUpForm = true;
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

            /** Submit new user to database.
             * Get API token.
             * Logs in new user by putting username/token into state and local storage
             * Redirects to home
             */
            try {
                const token = await BoateyApi.register(data);
                const location = {zipCode: data.zipCode, country: data.country};
                updateCurrentUser(data.username, token, location, data.units);
                BoateyApi.token = token;
                history.push('/');
            } catch (err) {
                setData({...data, password2: ''});
                getApiErrors(err);
                setIsLoading(false);
            };
        };
    };

    if (isLoading) {
        return <p>I'm loading!</p>
    };


    return (
        <>
            <Errors formErrors={formErrors}
                    apiErrors={apiErrors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input type='text'
                        name='username'
                        placeholder='Username'
                        value={data.username}
                        onChange={handleChange} />
                <label htmlFor='password'>Password</label>
                <input type='password'
                        name='password'
                        placeholder='Password'
                        value={data.password}
                        onChange={handleChange} />
                <label htmlFor='password2'>Retype Password</label>
                <input type='password'
                        name='password2'
                        placeholder='Retype Password'
                        value={data.password2}
                        onChange={handleChange} />
                <label htmlFor='email'>Email</label>
                <input type='text'
                        name='email'
                        placeholder='Email'
                        value={data.email}
                        onChange={handleChange} />
                <label htmlFor='zipCode'>Zip/Postal Code</label>
                <input type='text'
                        name='zipCode'
                        placeholder='Zip/Postal Code'
                        value={data.zipCode}
                        onChange={handleChange} />
                <label htmlFor='country'>Country</label>
                <select name='country'
                        value={data.country}
                        onChange={handleChange}>
                    {Object.entries(countryCodes).map(([country, code]) => 
                        <option value={code} key={code}>{country}</option>
                    )}
                </select>
                <label htmlFor='units'>Preferred Units of Measurement</label>
                <select name='units'
                        value={data.units}
                        onChange={handleChange}>
                    <option value='i'>Imperial</option>
                    <option value='m'>Metric</option>
                </select>
                <button>Register</button>
            </form>
        </>
    );
};

export default RegisterForm;