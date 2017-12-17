import React from 'react';

class AddDiscussionTopic extends React.Component {
    constructor() {
        super();
        this.state = {
            content: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
       this.setState({
            [e.target.name]: e.target.value, 
       });
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.content)
        let body = {
            content: this.state.content,
            bookID: this.props.bookID
        }
        fetch(`/api/discussion`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then( (res) => {
                this.setState({ content: '' });
                this.props.onFetchDiscussions();
            });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <form 
                    onSubmit={ this.handleSubmit }
                    className="add-discussion">
                    <input 
                        onChange={ this.handleChange } 
                        name="content" 
                        type="text" 
                        placeholder="Type your question here" 
                        value={ this.state.content }
                        className="full-width-input mb-4" />
                    <div>
                        <button 
                            onClick={ this.handleSubmit }
                            className="btn btn-outline-primary mb-5">Submit Question</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AddDiscussionTopic;