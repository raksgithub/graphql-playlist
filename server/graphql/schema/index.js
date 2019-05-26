const {
    GraphQLObjectType,
    GraphQLSchema,
} = require('graphql');

// GraphQL Queries
const { getBooks, getBookById } = require('../queries/book');
const { getAuthors, getAuthorById } = require('../queries/author');

// GraphQL Mutations
const { addAuthor, updateAuthor, deleteAuthor } = require('../mutations/author');
const { addBook, updateBook, deleteBook } = require('../mutations/book');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: getBookById(),
        books: getBooks(),
        author: getAuthorById(),
        authors: getAuthors(),
    }
});

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

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});