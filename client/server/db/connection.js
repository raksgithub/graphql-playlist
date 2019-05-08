const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb://guest01:Aksguest01@ds135456.mlab.com:35456/aks-graphql-db', {
    useNewUrlParser: true
});

mongoose.connection.once('open', () => {
    console.log('DB connection established.');
});

module.exports = connection;