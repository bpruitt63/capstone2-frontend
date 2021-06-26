import React, {useState} from 'react';
import {useHandleChange, useErrors} from './hooks';
import BoateyApi from './BoateyApi';
import Errors from './Errors';

/** Form to name a trip and save trip to database */
function TripNameForm({currentTrip, username, deleteCurrentTrip}) {

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
                await BoateyApi.addTrip(username, tripData);

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
            <form onSubmit={onSubmit}>
                <label htmlFor='name'>Name Trip: </label>
                <input type='text'
                        name='name'
                        placeholder='Trip Name'
                        value={data.name}
                        onChange={handleChange} />
                <button>Save Trip</button>
            </form>
        </>
    )
};

export default TripNameForm;