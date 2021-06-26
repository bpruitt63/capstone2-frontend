import React from 'react';
import {useHandleChange, useErrors} from './hooks';
import BoateyApi from './BoateyApi';
import Errors from './Errors';

/** Form for rating a specific point.  1 to 5, whole number ratings */

function PointRatingForm({point, username, userRating, setUserRating, setOverallRating}) {

    const initialState = userRating && userRating.length === 1 ? 
                            {rating: userRating} : {rating: 3};
    const [data, handleChange] = useHandleChange(initialState);
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const id = point.id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            /** Checks if point exists in database, adds to database
             * if not already there.
             */
            const locationData = {id, 
                                title: point.name, 
                                latitude: point.location.lat,
                                longitude: point.location.lon};
            await BoateyApi.addLocation(locationData);
            const ratingData = {rating: parseInt(data.rating), id, username};

            /** Adds rating into database and sets userRating to that value */
            const user = await BoateyApi.addRating(username, ratingData);
            setUserRating(user);

            /** Retrieves updated average rating from database and sets to state */
            let overall = await BoateyApi.getRatings(username, id);
            setOverallRating(overall.overallRating);
            setApiErrors({});
        } catch (err) {
            getApiErrors(err);
        };
    };

    return (
        <>
            <Errors apiErrors={apiErrors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='rating'>Rate This Location: </label>
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

export default PointRatingForm;