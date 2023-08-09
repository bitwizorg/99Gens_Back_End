const mongoose = require('mongoose');
// Requiring Mongoose into the app

// Connected to Mongolab sandbox server


const dbURI = "mongodb+srv://bitwiz0108:7RMPoVYHaKRaXQv2@cluster0.wi0d3ok.mongodb.net/?retryWrites=true&w=majority";

// Create the database connection
mongoose.Promise = global.Promise;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// CONNECTION EVENTS

// When successfully connected
mongoose.connection.on('connected', () => {
  /* eslint no-console: 0 */
  console.log(`Mongoose default connection open to ${dbURI}`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
// process.on('SIGINT', function() {
//   mongoose.connection.close(function () {
//     console.log('Mongoose default connection disconnected through app termination');
//     process.exit(0);
//   });
// });
