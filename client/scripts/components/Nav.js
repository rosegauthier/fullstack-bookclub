import React from 'react';
import { 
    BrowserRouter as Router, 
    Route, Link } from 'react-router-dom';

import Dashboard from './Dashboard';

class Nav extends React.Component {
    constructor() {
        super();
        this.state = {

        }
    }

    render() {
        return (
            <header className="mb-4">
                <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
                    <div className="row justify-content-end">
                        <div className=" col-md-3">
                            <div className="container">
                                <div className="collapse navbar-collapse">
                                    <ul className="navbar-nav">
                                        <li className="nav-item">
                                            <Link to="/" className="nav-link text-white">Dashboard</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/library" className="nav-link text-white">Books</Link>
                                        </li>
                                        { this.props.user && <li onClick={ this.props.logout } className="nav-link text-white">Logout</li> }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Nav;