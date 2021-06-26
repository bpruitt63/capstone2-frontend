import React, {useState} from 'react';
import Trip from './Trip';

/** Displays list of trips retrieved from database */
function TripsList({trips, units, username, deleteTrip}) {

    const [visibleTrips, setVisibleTrips] = useState(trips.slice(0, 5));

    /** Shows error message if trips object not returned */
    if (typeof(trips) === 'string') {
        return <p>{trips}</p>
    };

    /** Toggle between showing entire trips array or 
     * five most recent trips
     */
    const toggleShowAll = () => {
        trips.length === visibleTrips.length ? setVisibleTrips(trips.slice(0, 5))
            : setVisibleTrips(trips);
    };

    return(
        <>
            {visibleTrips.map(t => 
                <Trip key={t.tripId}
                        units={units}
                        trip={t}
                        username={username}
                        deleteTrip={deleteTrip} />)}
            {trips.length > 5 && 
                <button onClick={toggleShowAll}>
                    {visibleTrips.length > 5 ? 'Show Fewer' : 'Show All'}
                </button>
            }
        </>
    )
};

export default TripsList;