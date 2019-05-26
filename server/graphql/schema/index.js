const { GraphQLSchema } = require('graphql');

// Root Query
const RootQuery = require('../queries');

// Root Mutation
const Mutation = require('../mutations');

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});