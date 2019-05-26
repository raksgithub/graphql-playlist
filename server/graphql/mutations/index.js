const { GraphQLObjectType } = require('graphql');

// GraphQL Mutations
const { addAuthor, updateAuthor, deleteAuthor } = require('../mutations/author');
const { addBook, updateBook, deleteBook } = require('../mutations/book');

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: addAuthor(),
        updateAuthor: updateAuthor(),
        deleteAuthor: deleteAuthor(),
        addBook: addBook(),
        updateBook: updateBook(),
        deleteBook: deleteBook(),
    }
});

module.exports = Mutation;