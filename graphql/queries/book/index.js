const {
    GraphQLList,
    GraphQLID
} = require('graphql');
const { get: _get } = require('lodash');

// GraphQL Types
const { BookType } = require('../../types');

// MongoDB Models
const Book = require('../../../models/book');

const getBookById = () => ({
    type: BookType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(parent, args) {
        try {
            const book = await Book.findById(args.id);
            return book;
        }
        catch (err) {
            console.log('Error has occured', err);
        }
    }
});

const getBooks = () => ({
    type: new GraphQLList(BookType),
    async resolve(_, args, context) {
        if(!_get(context, 'userId')) {
            throw new Error('You are not a legitimate user to access this route');
        }
        try {
            const books = await Book.find();
            return books;
        }
        catch (err) {
            console.log('Error has occured', err);
        }
    }
});

module.exports = { getBooks, getBookById };