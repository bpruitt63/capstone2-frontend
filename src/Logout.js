import {Redirect} from 'react-router-dom';
import { useEffect } from 'react';
import BoateyApi from './BoateyApi';

function Logout({updateCurrentUser}) {

    /** Removes name, location, and token from state and local storage */
    useEffect(() => {
        updateCurrentUser('', '', '');
        BoateyApi.token = '';
    }, [updateCurrentUser]);
    

    return <Redirect to='/' />
};

export default Logout;