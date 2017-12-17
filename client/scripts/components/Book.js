import React from 'react';

class Book extends React.Component {
    constructor() {
        super();
    }

    render() {
        console.log(this.props)
        return (
            <div>
            {
                this.props.book 
                ? <div className="row justify-content-between">
                    <div className="col-md-4">
                        <img src={ this.props.book.coverUrl } alt=""/>
                    </div>
                    <div className="col-md-7">
                        <h2>{ this.props.book.title }</h2>
                        <p>{ this.props.book.author }</p>
                        <p>{ this.props.book.synopsis }</p>
                    </div>
                </div>
                : <div>No book chosen</div>
            }
            </div>
        )
    }
}

export default Book;