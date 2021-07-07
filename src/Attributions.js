import React from 'react';
import {Link} from 'react-router-dom';

function Attributions({isMobile}) {
    return (
        <div className={isMobile ? 'mFooter' : 'footer'}>
            <p>Weather info supplied by{' '}
                <Link to={{pathname: 'https://www.weatherbit.io/'}} target='blank'>
                    Weatherbit.io
                </Link>
            </p>
            <p>Background Photo by{' '}
                <Link to={{pathname: 'https://unsplash.com/photos/q84-1IeZytc'}} target='blank'>
                    Gautam Krishnan
                </Link>
                    {' '}on{' '}
                <Link to={{pathname: 'https://unsplash.com/'}} target='blank'>
                    Unsplash
                </Link>
            </p>
        </div>
    );
};

export default Attributions;