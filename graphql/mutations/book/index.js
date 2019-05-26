const {
    GraphQLString,
    GraphQLID,
    GraphQLNonNull
} = require('graphql');

// GraphQL Types
const { BookType } = require('../../types');

// MongoDB models
const Book = require('../../../models/book');

const addBook = () => ({
    type: BookType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        genre: {
            type: new GraphQLNonNull(GraphQLString)
        },
        authorId: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(parent, args) {
        try {
            const newBook = await Book.create({
                name: args.name,
                genre: args.genre,
                authorId: args.authorId
            });
            console.log('New Book has been saved', newBook);
            return newBook;
        }
        catch (err) {
            console.log('Error has occured', err);
        }
    }
});

const updateBook = () => ({
    type: BookType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        genre: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args) {
        try {
            const updatedBook = await Book.findByIdAndUpdate(args.id, { genre: args.genre }, { new: true });
            console.log('Author has been updated', updatedBook);
            return updatedBook;
        }
        catch(err) {
            console.log('Error has occured', err);
        }
    }
});

const deleteBook = () => ({
    type: BookType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(parent, args) {
        try {
            const deletedBook = await Book.findByIdAndDelete(args.id);
            console.log('Book has been deleted', deletedBook);
            return deletedBook;
        }
        catch(err) {
            console.log('Error has occured', err);
        }
    }
});

module.exports = {
    addBook,
    updateBook,
    deleteBook
};