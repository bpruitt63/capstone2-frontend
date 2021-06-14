import React, {useState} from 'react';
import PointDetails from './PointDetails';

function Point({point}) {

    const [showDetails, setShowDetails] = useState(false);

    const toggle = () => {
        setShowDetails(!showDetails);
    };

    return (
        <div>
            <h4>{point.name}</h4>
            <p>Location type:  {point.kind[0].toUpperCase() + point.kind.substring(1)}</p>
            <button onClick={toggle}>
                {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
            {showDetails && <PointDetails point={point} />}
        </div>
    );
};

export default Point;