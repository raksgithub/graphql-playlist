const {
    GraphQLList,
    GraphQLID
} = require('graphql');
const { BookType } = require('../../types');
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
    async resolve() {
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