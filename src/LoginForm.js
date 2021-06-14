import React, {useState} from 'react';
import {Redirect, useHistory} from 'react-router-dom';
import {useHandleChange, useErrors} from './hooks';
import Errors from './Errors';
import BoateyApi from './BoateyApi';

function LoginForm({username, updateCurrentUser}) {

    const initialState = {username: '', password: ''}

    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [data, handleChange, setData] = useHandleChange(initialState);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const history = useHistory();

    /** Redirects to home if already logged in */
    if (username) {
        return <Redirect to='/' />
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setApiErrors({});

        /** Validates login form and sets error if missing fields */
        if (!data.username || !data.password) {
            setErrors({error: "Username and Password are required"})
            setData(initialState);
            return false;
        } else {
            setIsLoading(true);

            /** Checks for valid name/password combination.
             * Returns API token.
             * Runs function to put username and token into state and local storage.
             */
            try {
                const {token, location, units} = await BoateyApi.login(data);
                updateCurrentUser(data.username, token, location, units);
                BoateyApi.token = token;
                history.push('/');
            } catch (e) {
                getApiErrors(e);
                setData(initialState);
                setIsLoading(false);
            };
        };
    };

    if (isLoading) {
        return <p>I'm loading!</p>
    };

    return (
        <>
            <Errors formErrors={errors}
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
                <button>Log In</button>
            </form>
        </>
    )
};

export default LoginForm;