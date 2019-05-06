import React from 'react';
import { graphql } from 'react-apollo';
import Book from '../components/Book';
import { getBooksQuery } from '../graphql/queries/book';

const Books = props => {
    const { loading, books } = props.data;
    if(loading) return <div>Loading...</div>;
    return (
        <ul>
            { books.map((book, index) => (
                <Book key={book.id} name={book.name} index={index} />
            )) }
        </ul>
    );
}

export default graphql(getBooksQuery)(Books);
