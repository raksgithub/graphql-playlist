import { gql } from 'apollo-boost';

export const getBooksQuery = gql`query {
    books {
        id
        name
        genre
        author {
            name
            age
        }
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