import React, {useState} from 'react';
import Point from './Point';
import TripRatingForm from './TripRatingForm';
import { calculateDistance } from './static/helpers';

/** Component for a single saved trip from user's trips or recent trips list */
function Trip({trip, units, username, deleteTrip}) {

    const [showLocations, setShowLocations] = useState(false);
    const [rating, setRating] = useState();
    const distance = calculateDistance(units, trip.distance);
    const isSaved = true;

    /** Toggle whether locations for trip are visible */
    const toggleLocations = () => {
        setShowLocations(!showLocations);
    };

    return (
        <div>
            <p>
                {trip.tripName}{' '}-{' '}{distance}{' '}
                {units === 'i' ? 'mi' : 'km'}
            </p>
            {<p>Rating: {rating || trip.tripRating || 'Not rated yet'}</p>}
            {username &&
                <TripRatingForm trip={trip}
                                username={username}
                                setRating={setRating} />
            }
            {showLocations &&
                trip.locations.map(l =>
                    <Point key={l.locationId}
                            point={l}
                            currentTrip={[]}
                            setCurrentTrip={{}}
                            username={username}
                            isSaved={isSaved} />
                )}
            <button onClick={toggleLocations}>
                {showLocations ? 'Hide Trip' : 'Show Trip'}
            </button>
            {username &&
                <button onClick={() => deleteTrip(username, trip.tripId)}>
                    Delete Trip
                </button>
            }
        </div>
    );
};

export default Trip;