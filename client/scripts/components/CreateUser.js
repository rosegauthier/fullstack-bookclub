import React from 'react';
import Field from './Field';

class CreateUser extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        fetch('/api/signup', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((json) => {
            this.props.refresh();
        });
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div>
                <h2>Create An Account</h2>
                <form onSubmit={this.handleSubmit}>
                    <Field
                        type="text"
                        name="name"
                        label="Enter your name: "
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Field
                        type="email"
                        name="email"
                        label="Enter your email: "
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <Field
                        type="password"
                        name="password"
                        label="Enter your password: "
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                    <button className="btn btn-outline-primary">Create User</button>
                </form>
            </div>
        );
    }    
}

export default CreateUser;