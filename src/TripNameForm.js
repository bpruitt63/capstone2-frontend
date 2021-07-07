import React, {useState} from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import './static/styles/Trips.css';
import {useHandleChange, useErrors} from './hooks';
import BoateyApi from './BoateyApi';
import Errors from './Errors';

/** Form to name a trip and save trip to database */
function TripNameForm({currentTrip, username, deleteCurrentTrip, addTrip}) {

    const [data, handleChange, setData] = useHandleChange({name: ''});
    const [apiErrors, getApiErrors, setApiErrors] = useErrors();
    const [formErrors, setFormErrors] = useState({});

    const onSubmit = async (e) => {
        e.preventDefault();
        setApiErrors({});

        /** Validates form data */
        if (!data.name || data.name.length < 1 || data.name.length > 30) {
            setFormErrors({error: 'Trip Name must be between one and thirty characters.'});
            return false;
        } else {
            setFormErrors({});
            try{

                /** Creates trip object and submits to database */
                let locations = [];
                for (let location of currentTrip) {
                    locations.push({location: location.id});
                };
                const tripData = {trip: {name: data.name,
                                        distance: currentTrip[currentTrip.length - 1].totalDistance},
                                        locations}
                const res = await BoateyApi.addTrip(username, tripData);

                /** Creates trip object and adds to userTrips and recentTrips */
                const trip = {tripId: res.trip.id, 
                                distance: res.trip.distance,
                                tripName: res.trip.name,
                                tripRating: null,
                                locations: res.tripLocations};
                addTrip(trip);

                /** Removes trip data from state once it has been submitted */
                setData({name: ''});
                deleteCurrentTrip();
            } catch (err) {
                getApiErrors(err);
            };
        };
    };

    return (
        <>
            <Errors formErrors={formErrors}
                    apiErrors={apiErrors} />
            <Form onSubmit={onSubmit} className='tripNameForm'>
                <InputGroup>
                    <Input type='text'
                            name='name'
                            placeholder='Trip Name'
                            value={data.name}
                            onChange={handleChange} />
                    <InputGroupAddon addonType='append'>
                        <Button>Save Trip</Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>
        </>
    )
};

export default TripNameForm;