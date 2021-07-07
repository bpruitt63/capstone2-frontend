import React, {useState} from 'react';
import { Col, Row, Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import './static/styles/Form.css';
import countryCodes from './static/countryCodes';
import {useHandleChange} from './hooks';
import Errors from './Errors';

/** Changes current location in state and local storage without updating
 * user information in database.
 */
function LocationForm({location, updateLocation, isMobile}) {

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
        <div className='container'>
            <Errors formErrors={errors} />

            {isMobile &&
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col xs={12} md={5}>
                            <FormGroup>
                                <Row>
                                    <Col xs={5}>
                                        <Label htmlFor='zipCode'
                                                className='Mlabel'>
                                            Zip/Postal Code
                                        </Label>
                                    </Col>
                                    <Col xs={7}>
                                    <Input type='text'
                                            name='zipCode'
                                            id='zipCode'
                                            placeholder='Zip/Postal Code'
                                            value={data.zipCode}
                                            onChange={handleChange} />
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={5}>
                            <FormGroup>
                                <Row>
                                    <Col xs={5} md={4}>
                                        <Label htmlFor='country'
                                                className='Mlabel'>
                                            Country
                                        </Label>
                                    </Col>
                                    <Col xs={7} md={8}>
                                        <Input type='select' 
                                                name='country'
                                                id='country'
                                                value={data.country}
                                                onChange={handleChange} >
                                            {Object.entries(countryCodes).map(([country, code]) => 
                                                <option value={code} key={code}>{country}</option>
                                            )}
                                        </Input>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </Col>
                        <Col xs={12} md={2}>
                            <Button className='Mbutton'>
                                Set Location
                            </Button>
                        </Col>
                    </Row>
                </Form>
            }

            {!isMobile && 
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend" >
                            <Input type='text'
                                    name='zipCode'
                                    id='zipCode'
                                    placeholder='Zip/Postal Code'
                                    value={data.zipCode}
                                    onChange={handleChange} />
                        </InputGroupAddon>
                        <Input type='select' 
                                name='country'
                                id='country'
                                value={data.country}
                                onChange={handleChange}
                                className='mid' >
                            {Object.entries(countryCodes).map(([country, code]) => 
                                <option value={code} key={code}>{country}</option>
                            )}
                        </Input>
                        <InputGroupAddon addonType="append" >
                            <Button className='button'>Set Location</Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
            }
        </div>
    )
};

export default LocationForm;