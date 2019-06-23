import { gql } from 'apollo-boost';

export const loginMutation = gql`mutation($username: String!, $password: String!) {
    signInUser(username: $username, password: $password) {
        status,
        message,
        token
    }
}`;