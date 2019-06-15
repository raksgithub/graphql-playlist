const {
    GraphQLList,
    GraphQLID
} = require('graphql');

// GraphQL Types
const { AuthorType } = require('../../types');

// MongoDB Models
const Author = require('../../../models/author');

const getAuthorById = () => ({
    type: AuthorType,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(parent, args, context) {
        if(!_get(context, 'userId')) {
            throw new Error('You are not a legitimate user to access this route');
        }
        try {
            const author = await Author.findById(args.id);
            return author;
        }
        catch (err) {
            console.log('Error has occured', err);
        }
    }
});

const getAuthors = () => ({
    type: new GraphQLList(AuthorType),
    async resolve(_, args, context) {
        if(!_get(context, 'userId')) {
            throw new Error('You are not a legitimate user to access this route');
        }
        try {
            const authors = await Author.find();
            return authors;
        }
        catch (err) {
            console.log('Error has occured', err);
        }
    }
});

module.exports = { getAuthorById, getAuthors };