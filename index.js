const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./graphql/schema');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const { verifyJWT } = require('./jwt');
const { get: _get } = require('lodash');

// MongoDB DB connection via mongoose ORM
require('./db/connection');

const app = express();

// Enabling cors to allow cross origin resource sharing access
app.use(cors());

app.use('/graphql', bodyParser.json(), verifyJWT, graphqlHTTP(req => ({
  schema,
  context: {
    userId: _get(req, 'userId')
  },
  graphiql: process.env.NODE_ENV === 'development' ? true : false
})));

app.use(express.static(path.join(__dirname, 'client/build')));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});