import { gql } from 'apollo-boost';

export const getBooksQuery = gql`query {
    books {
        name
        genre
        id
    }
}`;

export const getBookQuery = gql`query($bookId: ID!) {
    book(id: $bookId) {
        id
        name
        genre
        author {
            id
            name
            age
            books {
                id
                name
            }
        }
    }
}`;