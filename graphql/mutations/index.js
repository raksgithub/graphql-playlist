const { GraphQLObjectType } = require('graphql');

// GraphQL Mutations
const { addAuthor, updateAuthor, deleteAuthor } = require('./author');
const { addBook, updateBook, deleteBook } = require('./book');
const { registerUser, signInUser } = require('./user');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        // User Fields
        registerUser: registerUser(),
        signInUser: signInUser(),
        // Author Fields
        addAuthor: addAuthor(),
        updateAuthor: updateAuthor(),
        deleteAuthor: deleteAuthor(),

        // Book Fields
        addBook: addBook(),
        updateBook: updateBook(),
        deleteBook: deleteBook(),
    }
});

module.exports = Mutation;