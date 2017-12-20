import React from 'react';
import moment from 'moment';

class MeetingContent extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                <div>Location: 
                    { this.props.locationID.length 
                        ? this.props.locationID 
                        : "no location chosen"
                    }
                </div>
                
                <div> Date/Time: 
                    { this.props.datetime.length
                        ? moment(this.props.datetime).format('h:mma MMMM DD, YYYY') 
                        : "no date chosen"
                    }
                </div>
                <div>Attending: 
                    
                </div>
            </div>
        );
    }

    componentDidMount() {
    }
}

export default MeetingContent;