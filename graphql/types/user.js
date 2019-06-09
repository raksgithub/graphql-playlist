const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID
} = require('graphql');

// MongoDB User model
//const User = require('../../models/user');

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        username: {
            type: GraphQLString
        },
        email: {
            type: GraphQLString
        },
        password: {
            type: GraphQLString
        }
    })
});

const LoginResponseType = new GraphQLObjectType({
    name: 'LoginResponse',
    fields: () => ({
        token: {
            type: GraphQLString
        },
        status: {
            type: GraphQLString
        },
        message: {
            type: GraphQLString
        }
    })
});

module.exports = { UserType, LoginResponseType };