import React, {useState} from 'react';
import {Card, CardText, CardBody, CardTitle, Row, Col, Button, Collapse} from 'reactstrap';
import './static/styles/Weather.css';
import {makeReadableDate} from './static/helpers';

/** Component for a single day's weather forecast */
function WeatherDaily({daily, units}) {

    const [isOpen, setIsOpen] = useState(false);

    /** Toggles collapsible weather */
    const toggle = () => setIsOpen(!isOpen);

    const ICON_URL = 'https://www.weatherbit.io/static/img/icons/'
    const date = makeReadableDate(daily.valid_date);

    return (
        <Card>
            {!isOpen &&
                <CardBody className='closedCard'>
                    <CardTitle tag='h5'>{date}</CardTitle>
                    <Row>
                        <Col xs={3}>
                            <img src={`${ICON_URL}${daily.weather.icon}.png`} 
                                alt={daily.weather.description}
                                className='closedImg' />
                        </Col>
                        <Col xs={2} md={3}>
                            <CardText>High
                                <span><br/>{daily.high_temp}</span>
                            </CardText>
                        </Col>
                        <Col xs={2} md={3}>
                            <CardText>Wind
                                <span><br/>{daily.wind_spd}
                                    {units === 'i' ? 'mph ' : 'km/h '}
                                    {daily.wind_cdir}
                                </span>
                            </CardText>
                        </Col>
                        <Col xs={5} md={3}>
                            <Button className='dropdown-toggle WeatherToggle' onClick={toggle}>
                                See More
                            </Button>
                        </Col>
                    </Row>
                </CardBody>
            }
            <Collapse isOpen={isOpen}>
                <CardBody className='openCard'>
                    <CardTitle tag='h5'>{date}</CardTitle>
                    <img src={`${ICON_URL}${daily.weather.icon}.png`} 
                                alt={daily.weather.description}
                                className='openImg' />
                    <CardText>
                        {daily.weather.description}
                    </CardText>
                    <CardText>
                        Precipitation chance: {daily.pop}%
                    </CardText>
                    <CardText>
                        High: {daily.high_temp}, feels like {daily.app_max_temp}
                    </CardText>
                    <CardText>
                        Low: {daily.low_temp}, feels like {daily.app_min_temp}
                    </CardText>
                    <CardText>
                        Wind: {daily.wind_spd}
                        {units === 'i' ? 'mph ' : 'km/h '}{daily.wind_cdir}
                        , gust speed {daily.wind_gust_spd}{units === 'i' ? 'mph ' : 'km/h '}
                    </CardText>
                    <Button className='dropdown-toggle WeatherToggle' onClick={toggle}>
                        See Less
                    </Button>
                </CardBody>
            </Collapse>     
        </Card>
    );
};

export default WeatherDaily;