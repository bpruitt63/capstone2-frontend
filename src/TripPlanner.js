import React, {useState, useEffect} from 'react';
import MarinasApi from './MarinasApi';
import Point from './Point';

function TripPlanner({longLat}) {

    const [points, setPoints] = useState();

    useEffect(() => {
        async function getPoints() {
            try {
                const p = await MarinasApi.getPoints(longLat);
                setPoints(p.data.data);
            } catch (e) {
                //setWeather('API error');
            };
        };
        getPoints();
      }, [longLat, setPoints]);

    return (
        <div>
            {!points ? <p>Loading...</p>
                : !points[0] ? <p>No points of interest nearby</p> 
                : points.map(p => 
                <Point point={p}
                        key={p.id} />
            )}
        </div>
    );
};

export default TripPlanner;