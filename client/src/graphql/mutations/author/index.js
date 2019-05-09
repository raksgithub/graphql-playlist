import { gql } from 'apollo-boost';

export const addAuthorMutation = gql`mutation($name: String!, $age: Int!) {
    addAuthor(name: $name, age: $age) {
        name
        id
    }
}`;

export const deleteAuthorMutation = gql`mutation($authorId: ID!) {
    deleteAuthor(id: $authorId) {
        name
        id
    }
}`;