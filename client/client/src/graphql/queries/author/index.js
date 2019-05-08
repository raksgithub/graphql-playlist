import { gql } from 'apollo-boost';

export const getAuthorsQuery = gql`query {
    authors {
        name
        id
    }
}`;

// export const getAuthorQuery = gql`query {
//     author() {
//         name
//         id
//     }
// }`;