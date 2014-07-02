/**
 * Created by Samuel Castro on 7/2/14.
 */

var server = (process.env.DB_URI || '127.0.0.1'),
    dbname = process.env.NODE_ENV == 'test' ? 'jankenpon_test' : 'jankenpon_dev',
    mongoose = require('mongoose'),
    connection = mongoose.connect(server, dbname);

/**
 * Connection is connected
 */
mongoose.connection.once('connected', function() {
    console.log("Using mongodb at " + server);
    console.log("Connected to database " + dbname);
});

/**
 * If the connection throws an error
 */
mongoose.connection.on('error',function (err) {
    console.log('Mongoose default connection error: ' + err);
});

/**
 * When the connection is disconnected
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

/**
 * Exporting connection
 */
module.exports = connection;


