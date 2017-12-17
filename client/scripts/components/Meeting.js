import React from 'react';


import BookDetails from './BookDetails';
import MeetingDetails from './MeetingDetails';
import Discussion from './Discussion';

class Meeting extends React.Component {
    constructor() {
        super();
        this.state = {
            mode: 'book',
            currentMeeting: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderBookclubInfo = this.renderBookclubInfo.bind(this);
        this.saveMeeting = this.saveMeeting.bind(this);
    }

    handleChange(key, value) {
        const currentMeeting = this.state.currentMeeting;
        currentMeeting[key] = value;
        this.setState({ currentMeeting });
    }

    handleDate(date) {
        let currentMeeting = this.state.currentMeeting;
        currentMeeting.datetime = date._d;
        this.setState({ currentMeeting });
    }

    chooseBook(book) {
        console.log(book);
        let currentMeeting = this.state.currentMeeting;
        currentMeeting.book = book;
        this.setState({ currentMeeting });
    }

    saveMeeting(id, method) {
        const meeting = this.state.currentMeeting;
        meeting.clubID = this.props.bookClubID;
        console.log(this.state.currentMeeting)
        if(meeting.book) {
            meeting.book = meeting.book._id
        }

        fetch(`/api/meetings/${id}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(meeting)
        })
        .then(res => res.json())
        .then(json => {
            console.log('returned json', json._id);
            if(method === 'PUT') {
                this.props.onToggleEdit();
            } else if( method === 'POST') {
                this.props.onToggleIsNewMeeting();
            }
            this.props.fetchMeetings(this.props.bookClubID, json._id);
        })
        .catch(err => console.log(err));
    }

    renderBookclubInfo() {
        if(this.state.mode === 'book') {
            return <BookDetails 
                    onChooseBook={ (book) => this.chooseBook(book) } 
                    books={ this.props.books }
                    meetingID={ this.state.currentMeeting._id }
                    bookClubID={ this.props.bookClubID }
                    currentMeeting={ this.state.currentMeeting }
                    edit={ this.props.edit } />
        } else if(this.state.mode === 'meeting') {
            return <MeetingDetails 
                    {...this.state.currentMeeting } 
                    onHandleChange={ (key, value) => this.handleChange(key, value) } 
                    onHandleDate={ (date) => this.handleDate(date) } 
                    edit={ this.props.edit } />
        } else if(this.state.mode === 'discussion') {
            return <Discussion 
                    book={ this.state.currentMeeting.book } 
                    meetingID={ this.props.currentMeeting._id }
                    edit={ this.props.edit } />
        }
    }

    renderButton() {
        if(this.props.edit && this.props.isNewMeeting) {
            return <button 
                    className="btn btn-primary"
                    onClick={ () => this.saveMeeting('', 'POST') }>Create Meeting</button> 
        } else if(this.props.edit && !this.props.isNewMeeting) {
            return <button 
                    className="btn btn-primary"
                    onClick={ () => this.saveMeeting(this.state.currentMeeting._id, 'PUT') }>Save</button>
        } else {
            return <button 
                    className="btn btn-primary"
                    onClick={ this.props.onToggleEdit }>Edit</button> 
        }
    }

    render() {
        return (
            <div className="card card-outline-primary">
                <div className="card-header text-center">
                    <h2>{this.props.edit 
                            ? <input 
                                onChange={ (e) => this.handleChange(e.target.name, e.target.value) } 
                                name="name" 
                                type="text" 
                                placeholder="Meeting Name" 
                                value={ this.state.currentMeeting.name } />
                            : this.state.currentMeeting.name
                        }
                    </h2>
                    { this.renderButton() }

                </div>
                { 
                    <div>
                        <ul className="nav nav-pills nav-fill mb-4">
                            <li 
                                onClick={() => this.setState({mode: 'book'})} 
                                className={`nav-item nav-link ${this.state.mode === 'book' ? 'active' : null }`}>Book Info</li>
                            <li 
                                onClick={() => this.setState({mode: 'meeting'})} 
                                className={`nav-item nav-link ${this.state.mode === 'meeting' ? 'active' : null }`}>Meeting Info</li>
                            <li 
                                onClick={() => this.setState({mode: 'discussion'})} 
                                className={`nav-item nav-link ${this.state.mode === 'discussion' ? 'active' : null }`}>Discussion</li>
                        </ul>
                        <div className="card-block meeting-body">
                            <div>
                                { this.renderBookclubInfo() }
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        )
    }
    componentDidMount() {
        this.setState({ currentMeeting: this.props.currentMeeting});
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({currentMeeting: nextProps.currentMeeting});
    }
}

export default Meeting;