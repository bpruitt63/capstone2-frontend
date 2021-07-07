import React, {useState} from 'react';
import {Button} from 'reactstrap';
import Point from './Point';
import TripRatingForm from './TripRatingForm';
import { calculateDistance } from './static/helpers';
import DeleteModal from './DeleteModal';

/** Component for a single saved trip from user's trips or recent trips list */
function Trip({trip, units, username, deleteTrip, isMobile}) {

    const [showLocations, setShowLocations] = useState(false);
    const [rating, setRating] = useState();
    const distance = calculateDistance(units, trip.distance);
    const isSaved = true;

    /** Toggle whether locations for trip are visible */
    const toggleLocations = () => {
        setShowLocations(!showLocations);
    };

    return (
        <div className='Trip'>
            <div className='tripTitle'>
                <h5>
                    <span>{trip.tripName}</span>{' '}-{' '}{distance}{' '}
                    {units === 'i' ? 'mi' : 'km'}
                </h5>
                {<p>Rating: {rating || trip.tripRating || 'Not rated yet'}</p>}
            </div>
            {username &&
                <TripRatingForm trip={trip}
                                username={username}
                                setRating={setRating}
                                isMobile={isMobile} />
            }
            {showLocations &&
                trip.locations.map(l =>
                    <Point key={l.locationId}
                            point={l}
                            currentTrip={[]}
                            setCurrentTrip={{}}
                            username={username}
                            isSaved={isSaved}
                            isMobile={isMobile} />
                )}
            <Button onClick={toggleLocations} className='toggle'>
                {showLocations ? 'Hide Trip' : 'Show Trip'}
            </Button>
            <br/>
            {username &&
                <DeleteModal deleteTrip={deleteTrip}
                                username={username}
                                id={trip.tripId} />
            }
        </div>
    );
};

export default Trip;