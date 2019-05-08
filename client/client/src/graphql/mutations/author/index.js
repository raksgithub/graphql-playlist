import { gql } from 'apollo-boost';

export const addAuthorMutation = gql`mutation {
    addAuthor(name: "", age: "") {
        name
        id
    }
}`;