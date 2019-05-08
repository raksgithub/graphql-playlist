import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { deleteBookMutation } from '../graphql/mutations/book';
import { getBooksQuery } from '../graphql/queries/book';
import { get as _get } from 'lodash';

// Components
import DeleteModal from './common/DeleteModal';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }
    async handleDeleteBook(bookId) {
        const { deleteBookMutation } = this.props;
        console.log('BookId', bookId);
        const response = await deleteBookMutation({
            variables: {
                bookId
            },
            refetchQueries: [{
                query: getBooksQuery
            }],
        });
        const deletedBook = _get(response, 'data.deletedBook', {});
        console.log('DeletedBook=>>>', deletedBook);
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
        const { id, name, index, onBookClick } = this.props;
        return (
            <div className="row-item list-group-item">
                <div onClick={onBookClick} className="bookName">
                    {name}
                </div>
                <div>
                    <button className="btn btn-secondary mx-2">Edit</button>
                    <button
                        type="button" 
                        className="btn btn-danger"
                        onClick={this.handleShow}
                    >
                        Delete
                    </button>
                    <DeleteModal
                        show={this.state.show}
                        title={name}
                        body={'Do you want to delete this book ?'}
                        deleteButtonDisplayText='Delete Book'
                        closeButtonDisplayText='Close'
                        handleDelete={() => this.handleDeleteBook(id)}
                        handleClose={this.handleHide}
                        size="lg"
                    />
                </div>
            </div>
        );
    }
}

export default compose(
    graphql(deleteBookMutation, { name: 'deleteBookMutation' })
)(Book);
