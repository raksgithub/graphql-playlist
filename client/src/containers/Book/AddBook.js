import React from 'react';
import { graphql, compose } from 'react-apollo';
import { addBookMutation } from '../../graphql/mutations/book';
import { getBooksQuery } from '../../graphql/queries/book';

// Components
import AddBookForm from './form/AddBookForm';

const AddBook = props => {
    const handleFormSubmit = values => {
        const { bookName, bookGenre, author } = values;
        props.addBookMutation({
            variables: {
                name: bookName, 
                genre: bookGenre, 
                authorId: author
            },
            refetchQueries: [{
                query: getBooksQuery
            }]
        });
        props.history.push('/books');
    }
    return (
        <div>
            <h2>Add New Book</h2>
            <AddBookForm
                className='mt-2'
                operationText='Add Book'
                handleFormSubmit={handleFormSubmit}
            />
        </div>
    );
}

export default compose(
    graphql(addBookMutation, { name: 'addBookMutation' }),
)(AddBook); 
