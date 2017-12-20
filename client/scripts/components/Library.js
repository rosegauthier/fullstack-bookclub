import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import BookList from './BookList';
import Book from './Book';

class Library extends React.Component {
    constructor() {
        super();
        this.state = {
            books: []
        }
        this.fetchBooks = this.fetchBooks.bind(this);
    }

    fetchBooks() {
        fetch(`/api/books`)
            .then(res => res.json())
            .then(json => {
                this.setState({ books: json })
            });
    }

    render() {
        return (
            <div>
                <Route 
                    path={`/library/:bookid`} 
                    render={ (props) => {
                        var book = this.state.books.find(book => book._id === props.match.params.bookid);
                        if (book) {
                            return <Book book={ book } /> 
                        } else {
                            return <div>Loading...</div>
                        }
                    } } />
                <Route 
                    exact path={`/library`} render={ () => <BookList books={ this.state.books } /> } />
            </div>
        )
    }

    componentDidMount() {
        this.fetchBooks();
    }
}

export default Library;