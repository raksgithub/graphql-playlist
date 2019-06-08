const mongoose = require('mongoose');
let mongo_uri = '';
if(process.env.NODE_ENV === 'development') {
    mongo_uri = `mongodb://${process.env.DB_USER_DEV}:${process.env.DB_PASSWORD_DEV}@ds135456.mlab.com:35456/aks-graphql-db`;
} else {
    mongo_uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@aksmongocluster01-tolb7.mongodb.net/test?retryWrites=true`;
}
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