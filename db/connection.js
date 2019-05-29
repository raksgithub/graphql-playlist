const mongoose = require('mongoose');

const mongo_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@aksmongocluster01-tolb7.mongodb.net/test?retryWrites=true`;

const connection = mongoose.connect(mongo_uri, {
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log('DB connection established.');
});

mongoose.connection.on('error', err => {
    console.log('Error has occured', err);
});

module.exports = connection;