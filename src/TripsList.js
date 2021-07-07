import React, {useState} from 'react';
import {Button} from 'reactstrap';
import Trip from './Trip';

/** Displays list of trips retrieved from database */
function TripsList({trips, units, username, deleteTrip, isMobile}) {

    const [visibleTrips, setVisibleTrips] = useState(
        trips.length < 6 ? trips : trips.slice(0, 5));

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
            {visibleTrips && visibleTrips.map(t => 
                <Trip key={t.tripId}
                        units={units}
                        trip={t}
                        username={username}
                        deleteTrip={deleteTrip}
                        isMobile={isMobile} />)}
            {trips.length > 5 && 
                <Button onClick={toggleShowAll} className='toggle'>
                    {visibleTrips.length > 5 ? 'Show Fewer' : 'Show All'}
                </Button>
            }
        </>
    )
};

export default TripsList;