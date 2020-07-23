/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const mongoose = require('mongoose');
const env = require('./environment');
// connect to the database
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', function(){
    console.log('Connected to the database :: Mongodb');
})

module.exports = db;