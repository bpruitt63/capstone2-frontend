import React from "react";
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import Logout from './Logout';
import ProfileForm from './ProfileForm';
import WeatherForecast from "./WeatherForecast";
import TripPlanner from "./TripPlanner";

function Routes({username, updateCurrentUser, weather, longLat, units, setWeather, isMobile}) {
    return (
        <Switch>
            <Route exact path='/'>
                <Home username={username} />
            </Route>
            <Route exact path='/register'>
                <RegisterForm username={username} 
                            updateCurrentUser={updateCurrentUser} />
            </Route>
            <Route exact path='/login'>
                <LoginForm username={username}
                            updateCurrentUser={updateCurrentUser}
                            isMobile={isMobile} />
            </Route>
            <Route exact path='/profile'>
                <ProfileForm username={username}
                            updateCurrentUser={updateCurrentUser} />
            </Route>
            <Route exact path='/logout'>
                <Logout updateCurrentUser={updateCurrentUser} />
            </Route>
            <Route exact path='/forecast'>
                <WeatherForecast weather={weather}
                                    units={units} />
            </Route>
            <Route exact path='/planner' >
                <TripPlanner longLat={longLat}
                                units={units}
                                username={username}
                                setWeather={setWeather}
                                isMobile={isMobile} />
            </Route>
            <Redirect to='/' />
        </Switch>
    );
};

export default Routes;