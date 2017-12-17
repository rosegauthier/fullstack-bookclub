import React from 'react';
import { render } from 'react-dom';
import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';

import Nav from './components/Nav';
import CreateUser from './components/CreateUser';
import LoginUser from './components/LoginUser';
import Dashboard from './components/Dashboard';
import Library from './components/Library';
import BookclubOverview from './components/BookclubOverview';
import AddBook from './components/AddBook';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            mode: 'login'
        }
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
    }

    logout() {
        fetch('/api/logout', {
            method: 'GET',
            credentials: 'include'
        })
            .then(() => {
                this.setState({ user: null });
            })
    }

    refresh() {
        fetch('/api/me', {
            method: 'GET',
            credentials: 'include'
        })
            .then(res => res.json())
            .then(user => {
                if(user._id) {
                    this.setState({ user });
                }
            })
    }

    render() {
        return (
            <Router>
                <div>
                    { this.state.user
                    ? <div>
                        <Nav user={ this.state.user } logout={ this.logout } />
                        <div className="container">
                            <Route exact path="/" component={Dashboard} />
                            <Route path="/library" component={Library} />
                            <Route path="/bookclubs/:id" component={BookclubOverview} />
                            <Route path="/addbook" component={AddBook} />
                        </div>
                    </div>
                    : <div className="row justify-content-center mt-5">
                        <div className="col-md-7">
                            <div className="card card-outline-primary">
                                <ul className="nav nav-pills nav-fill mb-4">
                                    <li 
                                        onClick={() => this.setState({mode: 'login'})} 
                                        className={`nav-item nav-link ${this.state.mode === 'login' ? 'active' : null }`}>Login</li>
                                    <li 
                                        onClick={() => this.setState({mode: 'create'})} 
                                        className={`nav-item nav-link ${this.state.mode === 'create' ? 'active' : null }`}>Sign Up</li>
                                </ul>
                                <div className="card-block meeting-body">
                                    <div>
                                        { this.state.mode === 'login' && <LoginUser refresh={ this.refresh } /> }
                                        { this.state.mode === 'create' && <CreateUser refresh={ this.refresh } /> }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                </div>
            </Router>
        )
    }
    componentDidMount() {
        this.refresh();
    }

}

render(<App />, document.getElementById('app'));
