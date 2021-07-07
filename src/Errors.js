import React from 'react';
import {Alert} from 'reactstrap';

/** Creates alert text for any API or validation errors from 
 * form submissions
 */

function Errors({formErrors={}, apiErrors={}}) {
    return (
        <div className='Errors'>
            {Object.keys(formErrors).map((key, e) => <Alert color='warning'
                                                    key={e}>{formErrors[key]}</Alert>)}
            {Object.keys(apiErrors).map((key, e) => <Alert color='danger'
                                                    key={e}>{apiErrors[key]}</Alert>)}
        </div>
    )
};

export default Errors;