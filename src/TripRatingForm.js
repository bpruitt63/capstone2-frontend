import React from 'react';
import { Button, Form, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import './static/styles/Trips.css';
import {useHandleChange, useErrors} from './hooks';
import Errors from './Errors';
import BoateyApi from './BoateyApi';

/** Form for rating a trip.  1 to 5, whole number ratings */
function TripRatingForm({trip, username, setRating, isMobile}) {

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
        <div className='tripRatingContainer'>
        <div className='tripRatingForm'>
            <Errors apiErrors={apiErrors} />
            <Form onSubmit={handleSubmit}>
                {!isMobile &&
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText className='rate'>
                                <Label htmlFor={`${trip.tripId}rating`}>Rate This Trip: </Label>
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type='select' 
                                name='rating'
                                id={`${trip.tripId}rating`}
                                value={data.rating}
                                className='ratingInput'
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
                        <Label htmlFor={`${trip.tripId}MRating`} className='detailTitle'>
                            Rate This Trip
                        </Label>
                        <br/>
                        <Input type='select' 
                                name='rating'
                                id={`${trip.tripId}MRating`}
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
        </div>
    );
};

export default TripRatingForm;