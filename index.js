/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const express = require('express')
const app = express();
const port = 8000;
// set layout 
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const Parser = require('cookie-parser');
const cookieParser = require('cookie-parser');

// used for session cooke and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo')(session);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// 
app.use(expressLayouts);

// extract style and scripts  from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views','./views');

// mongostore is use to store the session cookie in db
app.use(session({
    name: 'WeConnect',
    // todo change the secret before the deployment in production mode
    secret: 'bellaciao',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore(
        {
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
    function(err){
        console.log(err || 'connect-mongodb setup ok');
    }
    )

}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);
// use express router

app.use('/', require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log(`Error on running the server: ${err}`);
    }

    console.log(`Server is running successfully on port: ${port} `);
})