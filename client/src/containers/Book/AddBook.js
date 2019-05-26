import React from 'react';

// Components
import AddBookForm from './form/AddBookForm';

const AddBook = () => {
    return (
        <div>
            <h2>Add New Book</h2>
            <AddBookForm
                className='mt-2'
                operationText='Add Book'
            />
        </div>
    );
}

export default AddBook; 
