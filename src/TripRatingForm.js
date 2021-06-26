import React from 'react';
import {useHandleChange, useErrors} from './hooks';
import Errors from './Errors';
import BoateyApi from './BoateyApi';

/** Form for rating a trip.  1 to 5, whole number ratings */
function TripRatingForm({trip, username, setRating}) {

    const initialState = trip.tripRating ? 
                            {rating: trip.tripRating} : {rating: 3};
    const [data, handleChange] = useHandleChange(initialState);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const rating = await BoateyApi.rateTrip(username, trip.tripId, data);
            setRating(rating.tripRating);
            setApiErrors({});
        } catch (err) {
            getApiErrors(err);
        };
    };

    return (
        <>
            <Errors apiErrors={apiErrors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='rating'>Rate This Trip: </label>
                <select name='rating'
                        value={data.rating}
                        onChange={handleChange}>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
                <button>Submit Rating</button>
            </form>
        </>
    );
};

export default TripRatingForm;