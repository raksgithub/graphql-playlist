import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { deleteBookMutation } from '../../graphql/mutations/book';
import { getBooksQuery } from '../../graphql/queries/book';
import { get as _get } from 'lodash';

// Components
import DeleteModal from '../common/DeleteModal';
import BookTable from './BookTable';
import { Tab, Table } from 'react-bootstrap';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            bookId: null,
            lastDeletedBook: {}
        };
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleHide = this.handleHide.bind(this);
    }

    async handleDeleteBook(deleteBook) {
        const { bookId } = this.state;
        const response = await deleteBook({
            variables: {
                bookId
            },
            refetchQueries: [{
                query: getBooksQuery
            }],
        });
        this.props.onBookClick(_get(response, 'data.deleteBook.id', 0));
        this.handleHide();
    }

    handleShow(bookId) {
        this.setState({ show: true, bookId });
    }

    handleEditShow() {
        this.setState({ show: true });
    }

    handleHide() {
        this.setState({ show: false });
    }

    render() {
        const { id, tableData } = this.props;
        return (
            <Mutation mutation={deleteBookMutation}>
                {
                    (deleteBook, { data }) => (
                        <div>
                            <BookTable
                                data={tableData}
                                handleShow={this.handleShow}
                                handleEditShow={this.handleEditShow} 
                            />
                            <DeleteModal
                                show={this.state.show}
                                title={'Default Title'}
                                body={'Do you want to delete this book ?'}
                                deleteButtonDisplayText='Delete Book'
                                closeButtonDisplayText='Close'
                                handleDelete={() => this.handleDeleteBook(deleteBook)}
                                handleClose={this.handleHide}
                                size="lg"
                            />
                        </div>
                    )
                }
            </Mutation>
        );
    }
}

export default Book;
