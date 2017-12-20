import React from 'react';
import Dropdown from 'react-dropdown';

import Meeting from './Meeting';

class BookclubOverview extends React.Component {
    constructor() {
        super();
        this.state = {
            book: {},
            meetings: [],
            dropdownOptions: ['No meetings yet!'],
            currentMeeting: {},
            edit: false,
            isNewMeeting: false
        }

        this.fetchBooks = this.fetchBooks.bind(this);
        this.fetchMeetings = this.fetchMeetings.bind(this);
        this.setCurrentMeeting = this.setCurrentMeeting.bind(this);
        this.getMeetingDropdownOptions = this.getMeetingDropdownOptions.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);
        this.toggleIsNewMeeting = this.toggleIsNewMeeting.bind(this);
        this.addNewMeeting = this.addNewMeeting.bind(this);
    }

    fetchBooks() {
        fetch(`/api/books`)
            .then(res => res.json())
            .then(json => {
                this.setState({ books: json })
            });
    }

    fetchMeetings(id, newlyCreated) {
        fetch(`/api/meetings/byclub/${id}`)
            .then(res => res.json())
            .then(json => {
                let meetingToDisplay;
                if(newlyCreated) {
                    // not sure if I still need this
                    meetingToDisplay = newlyCreated;
                } else {
                    meetingToDisplay = json[0]._id;
                }
                this.setState({ meetings: json });
                this.setCurrentMeeting(meetingToDisplay);
                this.getMeetingDropdownOptions(json);
            });
    }

    getMeetingDropdownOptions(meetings) {
        //dropdown library only accepts label and value as options, will possibly change libraries
        let dropdownOptions = meetings.map(meeting => {
            let dropdownOption = {};
            dropdownOption.value = meeting._id;
            dropdownOption.label = meeting.name;
            return dropdownOption;
        });
        this.setState({ dropdownOptions: dropdownOptions });
    }

    setCurrentMeeting(id) {
        let currentMeeting = this.state.meetings.find(meeting => meeting._id === id);
        this.setState({ currentMeeting: currentMeeting });
    }

    toggleEdit() {
        this.setState({ edit: !this.state.edit });
    }

    toggleIsNewMeeting() {
        this.setState({ isNewMeeting: !this.state.isNewMeeting });
    }

    addNewMeeting() {
        this.setState({ 
            currentMeeting: {},
            isNewMeeting: true,
            edit: true
        });
    }

    render() {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col col-md-6 mb-3">
                        <Dropdown 
                            options={ this.state.dropdownOptions } 
                            onChange={(e) => this.setCurrentMeeting(e.value) } 
                            value={ this.state.currentMeeting ? this.state.currentMeeting.name : null } 
                            placeholder="Select a meeting" />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col col-md-6">
                        <button 
                            onClick={() => this.addNewMeeting() }
                            className="btn btn-outline-primary btn-block mb-5">Add New Meeting (Admin Only)</button>
                    </div>
                </div>
                <Meeting 
                        currentMeeting={ this.state.currentMeeting } 
                        bookClubID={ this.state.bookClubID }
                        books={this.state.books} 
                        edit={ this.state.edit } 
                        isNewMeeting={ this.state.isNewMeeting }
                        onToggleEdit={ this.toggleEdit } 
                        onToggleIsNewMeeting={ this.toggleIsNewMeeting }
                        fetchMeetings={ (id, newlyCreated) => this.fetchMeetings(id, newlyCreated) } />
                
            </div>
        )
    }

    componentDidMount() {
        this.fetchBooks();
        this.fetchMeetings(this.props.match.params.id);
        this.setState({bookClubID: this.props.match.params.id});
    }
}

export default BookclubOverview;