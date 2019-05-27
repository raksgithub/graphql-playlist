const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const cors = require('cors');
const path = require('path');

// MongoDB DB connection via mongoose ORM
require('./db/connection');

const app = express();

// Enabling cors to allow cross origin access
app.use(cors());

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true  
}));

app.use(express.static(path.join(__dirname, '/client/build/static')));

app.use('/', (req, res) => {
  console.log('Path of index.html file', path.join(__dirname, '/client/build/', 'index.html'));
  console.log('Path of static folder', path.join(__dirname, '/client/build/static'));
  res.sendFile(path.join(__dirname, '/client/build/', 'index.html'));
});

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});