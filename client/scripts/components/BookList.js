import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ReactFilestack from 'filestack-react';
import AddBook from './AddBook';

class BookList extends React.Component {
    constructor() {
        super();
        this.state = {}
    }

    render() {
        return (
            <div>
                { !this.props.selectingBook 
                    ? <Link to={`/addbook`}
                        className="btn btn-outline-primary btn-block mb-5">Suggest Book</Link>
                    : null
                }
                <div className="row">
                    {
                        this.props.books.map(book => {
                            return <div key={ book._id } className="col col-md-4 mb-3">
                                <div>
                                    <Link to={`/library/${ book._id }`} className="block" >
                                        <img src={ book.coverUrl } className="block" alt=""/>
                                    </Link>
                                    { this.props.selectingBook 
                                        ? <button 
                                            className="btn btn-primary btn-block"
                                            onClick={ () => this.props.onChooseBook(book) }>Choose this book</button>
                                        : null
                                    }
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        )
    }
}

export default BookList;