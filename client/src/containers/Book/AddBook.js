import React from 'react';
import { Mutation } from 'react-apollo';
import { addBookMutation } from '../../graphql/mutations/book';
import { getBooksQuery } from '../../graphql/queries/book';

// Components
import AddBookForm from './form/AddBookForm';

const AddBook = props => {
    const handleFormSubmit = async (values, addBook) => {
        const { bookName, bookGenre, author: { value } } = values;
        const response = await addBook({
            variables: {
                name: bookName,
                genre: bookGenre,
                authorId: value
            }
        });
        console.log('Response', response);
        props.history.push('/books');
    }

    const handleBookUpdate = (cache, { data: { addBook } }) => {
        const { books } = cache.readQuery({ query: getBooksQuery });
        cache.writeQuery({
            query: getBooksQuery,
            data: { books: books.concat([addBook]) }
        });
    }

    return (
        <div>
            <h2>Add New Book</h2>
            <Mutation
                mutation={addBookMutation}
                update={handleBookUpdate}
            >
                {
                    addBook => (
                        <AddBookForm
                            className='mt-2'
                            operationText='Add Book'
                            handleFormSubmit={values => handleFormSubmit(values, addBook)}
                        />
                    )
                }
            </Mutation>
        </div>
    );
}

export default AddBook; 
