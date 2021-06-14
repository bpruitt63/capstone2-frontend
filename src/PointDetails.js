import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import PointMap from './PointMap';

function PointDetails({point}) {

    const [showMap, setShowMap] = useState(false);

    const toggle = () => {
        setShowMap(!showMap);
    };

    return (
        <>
            {point.images.data[0] && 
                <img src={point.images.data[0].thumbnail_url} 
                        alt={point.name} />}
            <ul>
                <span>Fuel available:</span>
                <li>Diesel?  {point.fuel.has_diesel ? 'Yes' : 'No'}</li>
                <li>Gas?  {point.fuel.has_gas ? 'Yes' : 'No'}</li>
                <li>Propane?  {point.fuel.has_propane ? 'Yes' : 'No'}</li>
            </ul>
            {point.rating && 
                <p>Marinas.com rating: {point.rating} out of {point.review_count} reviews</p>}
            <Link to={{pathname: `${point.web_url}`}} target='blank'>
                    View on Marinas.com
            </Link>
            <button onClick={toggle}>
                {showMap ? 'Hide Map' : 'Show Map'}
            </button>
            {showMap && <PointMap longLat={[point.location.lon, point.location.lat]}
                                    icon_url={point.icon_url} />}
        </>
    );
};

export default PointDetails;