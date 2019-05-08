import React, { Component } from 'react';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }
    handleDeleteBook(bookId) {
        console.log('BookId', bookId);
    }
    render() {
        const { id, name, index, onBookClick } = this.props;
        return (
            <div onClick={onBookClick} className="row-item list-group-item">
                <div className="bookName">
                    {name}
                </div>
                <div>
                    <button className="btn btn-secondary mx-2">Edit</button>
                    <button
                        type="button" 
                        className="btn btn-danger"
                        onClick={() => this.handleDeleteBook(id)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        );
    }
}

export default Book;
