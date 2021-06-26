import React, {useState} from 'react';
import PointDetails from './PointDetails';
import MapboxApi from './MapboxApi';
import BoateyApi from './BoateyApi';
import MarinasApi from './MarinasApi';

/** Highest level component for a single point of interest from marinas.com API */
function Point({point, currentTrip, setCurrentTrip, username, isSaved, units, searchHere}) {

    const [showDetails, setShowDetails] = useState(false);
    const [retrievedPoint, setRetrievedPoint] = useState();
    let coordinates;
    if (point.location) coordinates = [point.location.lon, point.location.lat];

    /** Opens and closes PointDetails component */
    const toggle = async () => {
        if (!point.kind && !retrievedPoint) {
            const newPoint = await MarinasApi.getOnePoint(point.locationId);
            setRetrievedPoint(newPoint);
        };
        setShowDetails(!showDetails);
    };

    /** Adds point to current trip */
    const addPoint = async () => {
        let newDistance = 0;
        const newLocation = [point.location.lon, point.location.lat];

        /** If not the launch point of the trip, calculates total
         * distance of trip
         */
        if (currentTrip[0]) {
            const previous = currentTrip[currentTrip.length - 1];
            const previousLocation = previous.location;
            newDistance = MapboxApi.getDistance(previousLocation, newLocation) 
                + previous.totalDistance;
        };

        /** Creates the new point with updated total distance.
         * Adds to current trip in state and local storage.
         */
        const newPoint = {name: point.name, 
                        location: newLocation, 
                        id: point.id,
                        totalDistance: newDistance};
        setCurrentTrip([...currentTrip, newPoint]);
        localStorage.setItem("currentTrip", JSON.stringify([...currentTrip, newPoint]));
        
        /** Adds point to database if not already there */
        const data = {id: point.id, 
                        title: point.name, 
                        latitude: point.location.lat, 
                        longitude: point.location.lon};
        await BoateyApi.addLocation(data);
    };

    /** Removes point from current trip in state and local storage */
    const removePoint = () => {
        const newCurrentTrip = [...currentTrip];
        newCurrentTrip.pop();
        setCurrentTrip(newCurrentTrip);
        localStorage.setItem("currentTrip", JSON.stringify(newCurrentTrip));
    };

    return (
        <div>
            <h4>{point.name || point.locationName}</h4>
            {point.kind && <p>Location type:  {point.kind[0].toUpperCase() + point.kind.substring(1)}</p>}
            {searchHere && 
                <button onClick={() => searchHere(coordinates, units)}>
                    Center Search Here
                </button>}
            <button onClick={toggle}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {username && !isSaved &&
                <button onClick={currentTrip[0] && 
                            currentTrip[currentTrip.length - 1].id === point.id ? 
                                removePoint
                            : addPoint}>
                    {currentTrip[0] && currentTrip[currentTrip.length - 1].id === point.id ? 'Remove From Trip'
                        : currentTrip[0] ? 'Add to Trip' 
                        : 'Launch New Trip'}
                </button>}
            {showDetails && (point.kind || retrievedPoint) &&
                <PointDetails point={isSaved ? retrievedPoint : point}
                                username={username} />}
        </div>
    );
};

export default Point;