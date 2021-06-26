import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
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
function TripPlanner({longLat, units, username, setWeather}) {

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
                    const trips = await BoateyApi.getUserTrips(username);
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
                const trips = await BoateyApi.getRecentTrips();
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

    /** TODO adds newly created trip to saved/recent trips lists */
    // const addedTrip = (trip) => {
    //     setUserTrips([trip, ...userTrips]);
    // };


    /** Deletes trip from database.  
     * 
     * TODO removes trip from saved/recent trips lists
     */
    const deleteTrip = async (username, tripId) => {
        await BoateyApi.deleteTrip(username, tripId);
        //const trips = [...userTrips];
        const trips = [];
        for (let trip of userTrips) {
            trips.push({...trip});
        };
        const removed = trips.findIndex(function(trip) {
            return trip.tripId === tripId;
        });
        trips.splice(removed, 1);
        setUserTrips(trips);
    };

    return (
        <div>
            {!username && 
                <p>
                    <Link to='/login'>Login</Link> or{' '}
                    <Link to='/register'>register</Link>{' '}
                    to create your own trips.
                </p>
            }   
            {showRecentTrips && 
                <h3>Recently Created Trips</h3>}
            {showRecentTrips && recentTrips && 
                <TripsList trips={recentTrips}
                            units={units} />}
            <button onClick={toggleShowRecent}>
                {showRecentTrips ? 'Hide Recent Trips' : 'Show Recent Trips'}
            </button>
            {username &&
                <div>
                    {userTrips && showUserTrips &&
                        <>
                            <h3>Your Saved Trips</h3>
                            <TripsList trips={userTrips}
                                       units={units}
                                       username={username}
                                       deleteTrip={deleteTrip} />
                        </>
                    }
                    <button onClick={toggleShowUser}>
                        {showUserTrips ? 'Hide Saved Trips' : 'Show Saved Trips'}
                    </button>
                    <CurrentTrip currentTrip={currentTrip}
                            deleteCurrentTrip={deleteCurrentTrip}
                            units={units}
                            username={username} />
                </div>
            }
            <h3>Nearby Points of Interest</h3>
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
                        searchHere={searchHere} />
            )}
        </div>
    );
};

export default TripPlanner;