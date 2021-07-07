import React, {useState} from 'react';
import ReactMapboxGl, {Marker} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {mapbox} from './ApiKeys';
import mapboxStyle from './static/mapboxStyle';

const API_KEY = process.env.MAPBOX_API_KEY || mapbox;

/** React-Mapbox-GL map showing location of a specific point of interest */
function PointMap({longLat, icon_url, isMobile}) {

    const [lng] = useState(longLat[0]);
    const [lat] = useState(longLat[1]);
    const [zoom] = useState([14]);

    const Map = ReactMapboxGl({
        accessToken: API_KEY
    });

    const style = mapboxStyle;
    const containerStyle = isMobile ? {height: 400, width: 300}
                                    : {height: 400, width: 600};

    return (
        <>
            <Map style={style} 
                center={[lng, lat]}
                zoom={zoom}
                containerStyle={containerStyle} >
                <Marker coordinates={[lng, lat]}
                        anchor='bottom' >
                        <img className='Marker' 
                                src={icon_url}
                                alt='Map Marker' />
                </Marker>
            </Map>
        </>
    );
};

export default PointMap;