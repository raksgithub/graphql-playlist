import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { toIdValue } from 'apollo-utilities';

const cache = new InMemoryCache({
    cacheRedirects: {
        Query: {
            book: (_, args) => toIdValue(cache.config.dataIdFromObject({ __typename: 'Book', id: args.id })),
        },
    }
});

const client = new ApolloClient({
    // uri defaults to /graphql if we use the same domain
    uri: `http://localhost:${process.env.PORT || 5000}/graphql`,
    cache
});

export default client;