import { gql } from 'apollo-boost';

export const addBookMutation = gql`mutation($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
        name
        genre
        id
        author {
            id
            age
            name
        }
    }
}`;

export const deleteBookMutation = gql`mutation($bookId: ID!) {
    deleteBook(id: $bookId) {
        name
        id
        author {
            id
            name
            age
            books {
                name
            }
        }
    }
}`;