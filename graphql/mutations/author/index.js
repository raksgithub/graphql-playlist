const {
    GraphQLString,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull
} = require('graphql');

// GraphQL Types
const { AuthorType } = require('../../types');

// MongoDB models
const Author = require('../../../models/author');

const addAuthor = () => ({
    type: AuthorType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        age: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    async resolve(parent, args, context) {
        if(!_get(context, 'userId')) {
            throw new Error('You are not a legitimate user to access this route');
        }
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
});

const updateAuthor = () => ({
    type: AuthorType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    async resolve(parent, args, context) {
        if(!_get(context, 'userId')) {
            throw new Error('You are not a legitimate user to access this route');
        }
        try {
            const updatedAuthor = await Author.findByIdAndUpdate(args.id, { name: args.name }, { new: true });
            console.log('Author has been updated', updatedAuthor);
            return updatedAuthor;
        }
        catch(err) {
            console.log('Error has occured', err);
        }
    }
});

const deleteAuthor = () => ({
    type: AuthorType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    async resolve(parent, args, context) {
        if(!_get(context, 'userId')) {
            throw new Error('You are not a legitimate user to access this route');
        }
        try {
            const deletedAuthor = await Author.findByIdAndDelete(args.id);
            console.log('Author has been deleted', deletedAuthor);
            return deletedAuthor;
        }
        catch(err) {
            console.log('Error has occured', err);
        }
    }
});

module.exports = {
    addAuthor,
    updateAuthor,
    deleteAuthor
};