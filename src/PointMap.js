import React, {useState} from 'react';
import ReactMapboxGl, {Marker} from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {mapbox} from './ApiKeys';

const API_KEY = process.env.MAPBOX_API_KEY || mapbox;

function PointMap({longLat, icon_url}) {

    const [lng, setLng] = useState(longLat[0]);
    const [lat, setLat] = useState(longLat[1]);
    const [zoom, setZoom] = useState([14]);

    const Map = ReactMapboxGl({
        accessToken: API_KEY
    });

    const style = "mapbox://styles/mapbox/streets-v11";
    const containerStyle = {height: 400, width: 600};

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