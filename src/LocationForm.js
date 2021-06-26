import React, {useState} from 'react';
import countryCodes from './static/countryCodes';
import {useHandleChange} from './hooks';
import Errors from './Errors';

/** Changes current location in state and local storage without updating
 * user information in database.
 */
function LocationForm({location, updateLocation}) {

    const [data, handleChange, setData] = useHandleChange(location);
    const [previousData, setPreviousData] = useState();
    const [errors, setErrors] = useState({});

    if (location !== previousData) {
        setData(location);
        setPreviousData(location);
    };

    /** Validates zip code and updates location data in state 
     * and local storage, without changing user database info */
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!data.zipCode || data.zipCode.length < 3 || data.zipCode.length > 12) {
            setErrors({error: "Zip/Postal Code must be between 3 and 12 characters"});
            return false;
        } else {
            setErrors({});
            const newLocation = {zipCode: data.zipCode, country: data.country};
            updateLocation(newLocation);
        };
    };

    return (
        <>
            <Errors formErrors={errors} />
            <form onSubmit={handleSubmit}>
                <label htmlFor='zipCode'>Zip/Postal Code</label>
                <input type='text'
                        name='zipCode'
                        placeholder='Zip/Postal Code'
                        value={data.zipCode}
                        onChange={handleChange} />
                <label htmlFor='country'>Country</label>
                <select name='country'
                        value={data.country}
                        onChange={handleChange}>
                    {Object.entries(countryCodes).map(([country, code]) => 
                        <option value={code} key={code}>{country}</option>
                    )}
                </select>
                <button>Search</button>
            </form>
        </>
    )
};

export default LocationForm;