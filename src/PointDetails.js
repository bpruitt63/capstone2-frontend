import React, {useState, useEffect} from 'react';
import {Button, Spinner} from 'reactstrap';
import './static/styles/Trips.css';
import {Link} from 'react-router-dom';
import PointMap from './PointMap';
import BoateyApi from './BoateyApi';
import PointRatingForm from './PointRatingForm';

/** Detailed information about one point of interest from marinas.com API */
function PointDetails({point, username, isMobile}) {

    const [showMap, setShowMap] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userRating, setUserRating] = useState();
    const [overallRating, setOverallRating] = useState();

    useEffect(() => {

        /** If user is logged in, retrieves point's ratings from database 
         * and sets them in state:
         * userRating = rating by logged in user,
         * overallRating = average of all ratings for that point.
         * If not yet rated, sets rating to message stating not rated.
         */
        async function getRatings() {
            if (username) {
                try {
                    const res = await BoateyApi.getRatings(username, point.id);
                    setUserRating(res.userRating);
                    setOverallRating(res.overallRating);
                } catch (e) {
                    setUserRating('Could not retrieve user rating');
                    setOverallRating('Could not retrieve Boatey rating');
                };
            };
        };
        getRatings();
        setIsLoading(false)
    }, [username, point, setUserRating, setOverallRating]);

    /** Toggles map of point on and off */
    const toggle = () => {
        setShowMap(!showMap);
    };

    if (isLoading) return <Spinner style={{ width: '3rem', height: '3rem' }} />

    return (
        <>
            {point.images.data[0] && 
                <img src={point.images.data[0].thumbnail_url} 
                        alt={point.name}
                        className='pointImage' />}
            <ul>
                <span>Fuel available</span>
                <li>Diesel:  {point.fuel.has_diesel ? 'Yes' : 'No'}</li>
                <li>Gas:  {point.fuel.has_gas ? 'Yes' : 'No'}</li>
                <li>Propane:  {point.fuel.has_propane ? 'Yes' : 'No'}</li>
            </ul>
            {username && 
                <p>
                    <span className='detailTitle'>Your Rating:</span>
                    {' '}{userRating}
                </p>}
            {username && 
                <p>
                    <span className='detailTitle'>
                        Boatey Avg Rating:{' '}
                    </span>
                    {overallRating}
                </p>}
            {username && userRating && 
                <PointRatingForm point={point}
                                username={username}
                                userRating={userRating}
                                setUserRating={setUserRating}
                                setOverallRating={setOverallRating}
                                isMobile={isMobile} />}
            <br/>
            {point.rating && 
                <p>Marinas.com rating: {point.rating} out of {point.review_count} reviews</p>}
            <Link to={{pathname: `${point.web_url}`}} target='blank' className='link'>
                    View on Marinas.com
            </Link>
            <Button onClick={toggle} className='pointButton'>
                {showMap ? 'Hide Map' : 'Show Map'}
            </Button>
            <br/>
            {showMap && <PointMap longLat={[point.location.lon, point.location.lat]}
                                    icon_url={point.icon_url}
                                    isMobile={isMobile} />}
        </>
    );
};

export default PointDetails;