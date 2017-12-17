import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';

class MeetingForm extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <form>
                    <div>Location: 
                        <input 
                            name="locationID" 
                            type="text" 
                            placeholder="Proposed Location" 
                            value={ this.props.locationID } 
                            onChange={ (e) => this.props.onHandleChange(e.target.name, e.target.value) } />
                    </div>
                    <Datetime 
                        defaultValue={ moment(this.props.datetime).format('h:mma MMMM Do, YYYY') }
                        inputProps={{ placeholder: 'Choose a date' }} 
                        onChange={ (date) => this.props.onHandleDate(date) } />
                    <div>Attending: SOME MECHANISM TO ADD PEOPLE HERE
                    </div>
                </form>
            </div>
        );
    }
}

export default MeetingForm;