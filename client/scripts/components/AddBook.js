import React from 'react';
import ReactFilestack from 'filestack-react';

class AddBook extends React.Component {
    constructor() {
        super();
        this.state = {
            title: '',
            author: '',
            synopsis: '',
            coverUrl:'',
            buttonText: 'Upload Poster'
        }
        this.addBook = this.addBook.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onUploadSuccess = this.onUploadSuccess.bind(this);
    }

    addBook(e) {
        e.preventDefault();
        const book = this.state;
        delete book.buttonText;
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
            coverUrl: url,
            buttonText: 'Uploaded!'
        });
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <form>
                    <div className="mt-3">Title <br/>
                        <input 
                            name="title" 
                            type="text" 
                            placeholder="Title" 
                            value={ this.state.title } 
                            onChange={ (e) => this.handleChange(e.target.name, e.target.value) } />
                    </div>
                    <div className="mt-3">Author <br/>
                        <input 
                            name="author" 
                            type="text" 
                            placeholder="Author" 
                            value={ this.state.author } 
                            onChange={ (e) => this.handleChange(e.target.name, e.target.value) } />
                    </div>
                    <div className="mt-3 mb-3">Recommendation <br/>
                        <input 
                            name="synopsis" 
                            type="textarea" 
                            placeholder="Why should we read this book?" 
                            value={ this.state.synopsis } 
                            onChange={ (e) => this.handleChange(e.target.name, e.target.value) } />
                    </div>
                    <div>
                        <ReactFilestack
                            className="btn btn-primary"
                            apikey={"AwT9gpp4PQvqDYZ9Vm6Voz"}
                            buttonText={this.state.buttonText}
                            onSuccess={ this.onUploadSuccess }
                        />
                    </div>
                    <button 
                        className="btn btn-outline-primary mt-3"
                        onClick={ this.addBook }>Add Book</button>
                </form>
            </div>
        )
    }
}

export default AddBook;