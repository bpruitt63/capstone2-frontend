import React from 'react';

/** Creates alert text for any API or validation errors from 
 * form submissions
 */

function Errors({formErrors={}, apiErrors={}}) {
    return (
        <div>
        {Object.keys(formErrors).map((key, e) => <p
                                                 key={e}>{formErrors[key]}</p>)}
        {Object.keys(apiErrors).map((key, e) => <p
                                                 key={e}>{apiErrors[key]}</p>)}
        </div>
    )
};

export default Errors;