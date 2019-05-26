import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { getAuthorsQuery } from '../../graphql/queries/author';
import { addBookMutation } from '../../graphql/mutations/book';
import { getBooksQuery } from '../../graphql/queries/book';

// Components
import Loader from '../../components/common/Loader';
import AddBookForm from './form/AddBookForm';

class AddBook extends Component {
    handleFormSubmit = values => {
        const { bookName, bookGenre, author } = values;
        this.props.addBookMutation({
            variables: {
                name: bookName, 
                genre: bookGenre, 
                authorId: author
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        });
        this.props.history.push('/books');
    }

    render() {
        const { loading, authors } = this.props.getAuthorsQuery;
        if (loading) return (
            <div className='loader'>
                <Loader
                    type='CradleLoader'
                    color='#00BFFF'
                    widht='100'
                    height='100'
                />
            </div>
        );
        return (
            <div>
                <h2>Add New Book</h2>
                <AddBookForm
                    className='mt-2'
                    operationText='Add Book'
                    authors={authors}
                    handleFormSubmit={this.handleFormSubmit}
                />
            </div>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
    graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook); 
