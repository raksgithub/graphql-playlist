import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`query {
    authors {
        name
        age
        id
    }
}`;

export const getAuthorQuery = gql`query($authorId: ID!) {
    author(id: $authorId) {
        id
        name
        age
        books {
            id
            name
            genre
        }
    }
}`;