/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const express = require('express')
const app = express();
const port = 8000;
// set layout 
const expressLayouts = require('express-ejs-layouts');

// 
app.use(expressLayouts);;

// use express router

app.use('/', require('./routes'));

app.set('view engine','ejs');
app.set('views','./views');


app.listen(port,function(err){
    if(err){
        console.log(`Error on running the server: ${err}`);
    }

    console.log(`Server is running successfully on port: ${port} `);
})