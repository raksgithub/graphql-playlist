const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');
// const { find: _find, filter: _filter } = require('lodash');
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

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
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
        },
        books: {
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
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLID
                }
            },
            async resolve(parent, args) {
                try {
                    const author = await Author.findById(args.id);
                    return author;
                }
                catch (err) {
                    console.log('Error has occured', err);
                }
            }
        },
        authors: {
            type: new GraphQLList(AuthorType),
            async resolve() {
                try {
                    const authors = await Author.find();
                    return authors;
                }
                catch (err) {
                    console.log('Error has occured', err);
                }
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                },
                age: {
                    type: new GraphQLNonNull(GraphQLInt)
                }
            },
            async resolve(parent, args) {
                try {
                    const newAuthor = await Author.create({
                        name: args.name,
                        age: args.age
                    });
                    console.log('New Author has been saved', newAuthor);
                    return newAuthor;
                }
                catch (err) {
                    console.log('Error has occured', err);
                }
            }
        },
        updateAuthor: {
            type: AuthorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                },
                name: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(parent, args) {
                try {
                    const updatedAuthor = await Author.findByIdAndUpdate(args.id, { name: args.name }, { new: true });
                    console.log('Author has been updated', updatedAuthor);
                    return updatedAuthor;
                }
                catch(err) {
                    console.log('Error has occured', err);
                }
            }
        },
        deleteAuthor: {
            type: AuthorType,
            args: {
                id: {
                    type: new GraphQLNonNull(GraphQLID)
                }
            },
            async resolve(parent, args) {
                try {
                    const deletedAuthor = await Author.findByIdAndDelete(args.id);
                    console.log('Author has been deleted', deletedAuthor);
                    return deletedAuthor;
                }
                catch(err) {
                    console.log('Error has occured', err);
                }
            }
        },
        addBook: {
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
        },
        updateBook: {
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
        },
        deleteBook: {
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
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});