import React from 'react';
import { Button, Form, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import './static/styles/Trips.css';
import {useHandleChange, useErrors} from './hooks';
import BoateyApi from './BoateyApi';
import Errors from './Errors';

/** Form for rating a specific point.  1 to 5, whole number ratings */

function PointRatingForm({point, username, userRating, setUserRating, setOverallRating, isMobile}) {

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
        <div className='ratingForm'>
            <Errors apiErrors={apiErrors} />
            <Form onSubmit={handleSubmit}>
                {!isMobile && 
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className='rate'>
                                <Label htmlFor={`${id}Rating`}>Rate This Location: </Label>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type='select' 
                                name='rating'
                                id={`${id}Rating`}
                                className='ratingInput'
                                value={data.rating}
                                onChange={handleChange}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Input>
                        <InputGroupAddon addonType="append" >
                            <Button>Submit Rating</Button>
                        </InputGroupAddon>
                    </InputGroup>
                }
                {isMobile &&
                    <>
                        <Label htmlFor={`${id}MRating`} className='detailTitle'>
                            Rate This Location
                        </Label>
                        <br/>
                        <Input type='select' 
                                name='rating'
                                id={`${id}MRating`}
                                className='mRatingInput'
                                value={data.rating}
                                onChange={handleChange}>
                            <option value='1'>1</option>
                            <option value='2'>2</option>
                            <option value='3'>3</option>
                            <option value='4'>4</option>
                            <option value='5'>5</option>
                        </Input>
                        <br/>
                        <Button>Submit Rating</Button>
                    </>
                }
            </Form>
        </div>
    );
};

export default PointRatingForm;