import React from 'react';
import ReactFilestack from 'filestack-react';

class AddBook extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            synopsis: '',
            coverUrl:''
        }
        this.addBook = this.addBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
    }

    addBook(e) {
        e.preventDefault();
        const book = this.state;
        // book.clubID = ;
        fetch(`/api/books`, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(json => {
                this.props.history.push('/library');
            })
            .catch(err => console.log(err));
    }

    handleChange(key, value) {
       this.setState({
            [key]: value 
       });
    }

    onUploadSuccess(success) {
        const url = success.filesUploaded[0].url;
        this.setState({
            coverUrl: url
        });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <form>
                    <div>Title: 
                        <input 
                            name="title" 
                            type="text" 
                            placeholder="Title" 
                            value={ this.state.title } 
                            onChange={ (e) => this.handleChange(e.target.name, e.target.value) } />
                    </div>
                    <div>Author: 
                        <input 
                            name="author" 
                            type="text" 
                            placeholder="Title" 
                            value={ this.state.author } 
                            onChange={ (e) => this.handleChange(e.target.name, e.target.value) } />
                    </div>
                    <div>Synopsis: 
                        <input 
                            name="synopsis" 
                            type="textarea" 
                            placeholder="Title" 
                            value={ this.state.synopsis } 
                            onChange={ (e) => this.handleChange(e.target.name, e.target.value) } />
                    </div>
                    <ReactFilestack
                        apikey={"AwT9gpp4PQvqDYZ9Vm6Voz"}
                        buttonText="Upload Poster"
                        onSuccess={ this.onUploadSuccess }
                    />
                    <button 
                        className="btn btn-outline-primary btn-block"
                        onClick={ this.addBook }>Add Book</button>
                </form>
            </div>
        )
    }
}

export default AddBook;