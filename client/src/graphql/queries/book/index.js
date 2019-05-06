import { gql } from 'apollo-boost';

export const getBooksQuery = gql`query {
    books {
        name
        id
    }
}`;

// export const getBookQuery = gql` query{
//     book() {

//     }
// }`;