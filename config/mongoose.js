const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/habitTracker');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to db'));

db.once('open', function(){
    console.log('Connected to db:: MongoDB');
});

exports = db;