import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './static/styles/Trips.css';
import {Button} from 'reactstrap';
import MarinasApi from './MarinasApi';
import Point from './Point';
import CurrentTrip from './CurrentTrip';
import TripsList from './TripsList';
import BoateyApi from './BoateyApi';
import WeatherApi from './WeatherApi';

/** Top level component for trip planning feature.  Shows all points
 * of interest near specified location, and allows logged in users to 
 * create their own trips.
 */
function TripPlanner({longLat, units, username, setWeather, isMobile}) {

    const [points, setPoints] = useState();
    const [currentTrip, setCurrentTrip] = useState(JSON.parse(localStorage.getItem("currentTrip")) || []);
    const [userTrips, setUserTrips] = useState();
    const [recentTrips, setRecentTrips] = useState();
    const [showRecentTrips, setShowRecentTrips] = useState(false);
    const [showUserTrips, setShowUserTrips] = useState(false);
    const isSaved = false;

    useEffect(() => {

        /** Retrieves array of nearby points and sets in state */
        async function getPoints() {
            try {
                const p = await MarinasApi.getPoints(longLat);
                setPoints(p.data.data);
            } catch (e) {
                setPoints('API error');
            };
        };
        getPoints();
    }, [longLat, setPoints]);

    useEffect(() => {

        /** Retrieves all of logged in user's saved trips */
        async function getUserTrips() {
            if (username){
                try {
                    let trips = await BoateyApi.getUserTrips(username);
                    if (!trips[0]) {
                        trips = 'You have not created any trips yet';
                    };
                    setUserTrips(trips);
                } catch (e) {
                    setUserTrips("Can't retrieve trip information");
                };
            };
        };
        getUserTrips();
    }, [username, setUserTrips]);

    useEffect(() => {

        /** Retrieves last saved trips from database */
        async function getRecentTrips() {
            try {
                let trips = await BoateyApi.getRecentTrips();
                if (!trips[0]) {
                    trips = 'No trips found';
                };
                setRecentTrips(trips);
            } catch (e) {
                setRecentTrips("Can't retrieve trip information");
            };
        };
        getRecentTrips();
    }, [setRecentTrips]);

    /** Removes all current trip data */
    const deleteCurrentTrip = () => {
        setCurrentTrip([]);
        localStorage.removeItem("currentTrip");
    };

    /** Toggles visibility of recent trips */
    const toggleShowRecent = () => {
        setShowRecentTrips(!showRecentTrips);
    };

    /** Toggles visibility of user's trips */
    const toggleShowUser = () => {
        setShowUserTrips(!showUserTrips);
    };

    /** Sets weather and points list to center on the longitude/latitude
     * of the selected point.
     */
    const searchHere = async (coordinates) => {
        try {
            const w = await WeatherApi.getWeatherbyLongLat(coordinates, units);
            setWeather(w);
        } catch (e) {
            setWeather('API error');
        };
        try {
            const p = await MarinasApi.getPoints(coordinates);
            setPoints(p.data.data);
        } catch (e) {
            setPoints('API error');
        };
    };

    /** Adds newly created trip to saved/recent trips lists */
    const addTrip = (trip) => {
        typeof(userTrips) === 'string' ? setUserTrips([trip])
            : setUserTrips([trip, ...userTrips]);
        typeof(recentTrips) === 'string' ? setRecentTrips([trip])
            : setRecentTrips([trip, ...recentTrips]);
        setShowUserTrips(!showUserTrips);
        setShowRecentTrips(!showRecentTrips);
        setShowUserTrips(!showUserTrips);
        setShowRecentTrips(!showRecentTrips);
    };


    /** Deletes trip from database.  
     * Removes trip from saved/recent trips lists
     */
    const deleteTrip = async (username, tripId) => {
        await BoateyApi.deleteTrip(username, tripId);

        /** Removes from userTrips */
        let trips = [...userTrips];
        const removed = trips.findIndex(function(trip) {
            return trip.tripId === tripId;
        });
        trips.splice(removed, 1);
        if (trips.length === 0) {
            trips = 'You have not created any trips yet'
        };

        /** Removes from recentTrips */
        let recent = [...recentTrips];
        const removedRecent = recent.findIndex(function(trip) {
            return trip.tripId === tripId;
        });
        if (removedRecent !== -1) recent.splice(removedRecent, 1);

        /** Updates trips arrays and resets shown lists */
        setUserTrips(trips);
        setRecentTrips(recent);
        setShowUserTrips(!showUserTrips);
        setShowRecentTrips(!showRecentTrips);
        setShowUserTrips(!showUserTrips);
        setShowRecentTrips(!showRecentTrips);
    };

    return (
        <div className='container'>
            {!username && 
                <p className='links'>
                    <Link to='/login'>Login</Link> or{' '}
                    <Link to='/register'>register</Link>{' '}
                    to create your own trips.
                </p>
            }   
            <br/>
            <div className={showRecentTrips ? 'tripsGroup' : 'notUsed'}>
                {showRecentTrips && 
                    <h3 className='tripsTitle'>Recently Created Trips</h3>}
                {showRecentTrips && recentTrips && 
                    <TripsList trips={recentTrips}
                                units={units}
                                isMobile={isMobile} />}
                <br/>
                <Button onClick={toggleShowRecent} className='toggle'>
                    {showRecentTrips ? 'Hide Recent Trips' : 'Show Recent Trips'}
                </Button>
            </div>
            {username &&
                <div>
                    <div className={showUserTrips ? 'tripsGroup' : 'notUsed'}>
                        {userTrips && showUserTrips &&
                            <>
                                <h3 className='tripsTitle'>Your Saved Trips</h3>
                                <TripsList trips={userTrips}
                                        units={units}
                                        username={username}
                                        deleteTrip={deleteTrip}
                                        isMobile={isMobile} />
                            </>
                        }
                        <br/>
                        <Button onClick={toggleShowUser} className='toggle'>
                            {showUserTrips ? 'Hide Saved Trips' : 'Show Saved Trips'}
                        </Button>
                    </div>
                    <CurrentTrip currentTrip={currentTrip}
                            deleteCurrentTrip={deleteCurrentTrip}
                            units={units}
                            username={username}
                            addTrip={addTrip} />
                </div>
            }
            <div className='points'>
                <h3 className='pointsTitle'>Nearby Points of Interest</h3>
                {!points ? <p>Loading...</p>
                    : points === 'API error' ? <p>Error retrieving marina information.  Please try again later</p>
                    : !points[0] ? <p>No points of interest nearby</p> 
                    : points.map(p => 
                    <Point point={p}
                            key={p.id}
                            currentTrip={currentTrip}
                            setCurrentTrip={setCurrentTrip}
                            username={username}
                            isSaved={isSaved}
                            units={units}
                            searchHere={searchHere}
                            isMobile={isMobile} />
                )}
            </div>
        </div>
    );
};

export default TripPlanner;