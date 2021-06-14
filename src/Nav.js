import React from 'react';
import {NavLink} from 'react-router-dom';

function Nav({username}) {
     
    return (
        <div>
            <NavLink to='/'>Boatey Home</NavLink>
            <NavLink to='/forecast'>Weather Forecast</NavLink>
            <NavLink to='/planner'>Trip Planner</NavLink>
                {!username && 
                    <>
                        <NavLink to='/register'>Register</NavLink>
                        <NavLink to='/login'>Log In</NavLink>
                    </>
                }
                {username &&
                    <>
                        <NavLink to='/profile'>Update User Info</NavLink>
                        <NavLink to='/logout'>Log Out</NavLink>
                    </>
                }
        </div>
    );
};

export default Nav;