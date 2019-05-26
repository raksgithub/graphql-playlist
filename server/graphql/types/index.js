const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
} = require('graphql');

// MongoDB Models
const Book = require('../../models/book');
const Author = require('../../models/author');

const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        genre: {
            type: GraphQLString
        },
        author: {
            type: AuthorType,
            async resolve(parent, args) {
                try {
                    const books = await Author.findById(parent.authorId);
                    return books;
                }
                catch (err) {
                    console.log('Error has occured', err);
                }
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        age: {
            type: GraphQLInt
        },
        books: {
            type: new GraphQLList(BookType),
            async resolve(parent, args) {
                try {
                    const author = await Book.find({ authorId: parent.id });
                    return author;
                }
                catch (err) {
                    console.log('Error has occured', err);
                }
            }
        }
    })
});

module.exports = { AuthorType, BookType };