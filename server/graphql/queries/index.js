const { GraphQLObjectType } = require('graphql');

// GraphQL Queries
const { getBooks, getBookById } = require('./book');
const { getAuthors, getAuthorById } = require('./author');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: getBookById(),
        books: getBooks(),
        author: getAuthorById(),
        authors: getAuthors(),
    }
});

module.exports = RootQuery;