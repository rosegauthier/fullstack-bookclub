import React from 'react';

import AddDiscussionTopic from './AddDiscussionTopic';


class Discussion extends React.Component {
    constructor() {
        super();
        this.state = {
            discussionTopics: []
        }
        this.fetchDiscussions = this.fetchDiscussions.bind(this);
    }

    fetchDiscussions(bookID) {
        fetch(`/api/discussion/${bookID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            this.setState({ discussionTopics: json });
        })
    }

    render() {
        if(!this.props.book) {
            return <p>Choose a book to start the discussion!</p>;
        }

        return (
            <div>
                { this.props.edit &&
                    <div className="align-center">
                        <AddDiscussionTopic 
                            meetingID={ this.props.meetingID } 
                            bookID={this.props.book._id}
                            onFetchDiscussions={ this.fetchDiscussions(this.props.book._id) } />
                    </div>
                }
                

                {
                    this.state.discussionTopics.map(topic => {
                        return (
                            <div key={ topic._id } className="card card-outline-secondary mb-3 discussion-card" >
                                <div className="card-block">
                                    { topic.content }<br />
                                    { topic.submittedBy.name }
                                </div>
                            </div>
                        )
                    })
                }

            </div>
        )
    }

    componentDidMount() {
        this.fetchDiscussions(this.props.book._id);
    }
}

export default Discussion;