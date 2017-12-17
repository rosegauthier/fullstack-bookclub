import React from 'react';

import BookList from './BookList';
import Book from './Book';

class BookDetails extends React.Component {

    constructor() {
        super();
        this.state = {
            showBookList: true
        }
    }

    render() {
        return (
            <div>
                { this.props.currentMeeting.book &&
                    <h2 className="text-primary mb-5 text-center">This Is What We're Reading!</h2>
                }
                <div className="mb-5">
                    <Book book={ this.props.currentMeeting.book } />
                </div>
                {
                    this.props.edit &&
                        <div>
                            { this.props.books && this.state.showBookList
                                ? <BookList 
                                    selectingBook={true} 
                                    books={ this.props.books }
                                    onChooseBook={ (book) => this.props.onChooseBook(book) } />
                                : <button 
                                    className="btn btn-primary btn-block"
                                    onClick={ () => this.setState({ showBookList: true }) }>Choose New Book</button>
                            }
                        </div>
                }
            </div>
        )
    }

    componentDidMount() {
        this.props.currentMeeting.book && this.setState({showBookList: false });
    }

    componentWillReceiveProps() {
        this.props.currentMeeting.book && this.setState({showBookList: false });
    }
}

export default BookDetails;