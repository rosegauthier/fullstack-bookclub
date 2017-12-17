import React from 'react';

class Dashboard extends React.Component {
    constructor() {
        super();
        this.state = {
            bookclubs: [],
            newBookclub: {
                name: ''
            }
        }

        this.fetchBookclubs = this.fetchBookclubs.bind(this);
        this.addBookclub = this.addBookclub.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        let newState = this.state.newBookclub;
        newState.name = value;
        this.setState({
            newBookclub: newState
        })
    }

    addBookclub() {
        const bookclub = Object.assign({}, this.state.newBookclub);
        fetch('/api/bookclubs', {
            method: 'POST',
            body: JSON.stringify(bookclub),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( (doc) => this.fetchBookclubs() );
    }

    fetchBookclubs() {
        fetch('/api/bookclubs')
            .then(res => res.json())
            .then(json => this.setState({ bookclubs: json }));
    }

    goToBookclub(id) {
        this.props.history.push(`/bookclubs/${id}`);
    }

    render() {
        return (
            <div>
                <div>
                    <label htmlFor="bookclubname">
                        Bookclub Name:
                        <input id="bookclubname" type="text" onChange={(e) => this.handleChange(e.target.value)} />
                    </label>
                    <button className="btn btn-primary" onClick={ this.addBookclub }>Add Bookclub</button>
                </div>
                <div>
                    <h2>Your Bookclubs</h2>
                    <div className="row">
                        {
                            this.state.bookclubs.map(club => {
                                return <div className="col-md-4" key={ club._id }>
                                    <div 
                                        className="card card-inverse card-primary mb-3 text-center"
                                        key={club._id} 
                                        onClick={ () => this.goToBookclub(club._id) }>
                                        <h3>{ club.name }</h3>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.fetchBookclubs();
    }
};

export default Dashboard;