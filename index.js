const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const cors = require('cors');

// MongoDB DB connection via mongoose ORM
require('./db/connection');

const app = express();

// Enabling cors to allow cross origin access
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  
}));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});