import React from 'react';

import MeetingForm from './MeetingForm';
import MeetingContent from './MeetingContent';

const MeetingDetails = (props) => {
    return (
        <div>
            { props.edit 
                ? <MeetingForm { ...props } />
                : <MeetingContent { ...props } />
            }
        </div>
    )
}

export default MeetingDetails;