import React from 'react';
import {Link} from 'react-router-dom';

function Attributions() {
    return (
        <div>
            <p>Weather info supplied by{' '}
                <Link to={{pathname: 'https://www.weatherbit.io/'}} target='blank'>
                    Weatherbit.io
                </Link>
            </p>
        </div>
    );
};

export default Attributions;