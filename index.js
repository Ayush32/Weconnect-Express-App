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
const flash = require('connect-flash');

// used for session cooke and authentication
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const  passportGoogle = require('./config/passport-google-oauth2-strategy');
const MongoStore = require('connect-mongo')(session);

const sassMiddleware = require('node-sass-middleware');


// flash Middleware
const customMware = require('./config/middleware');
app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css',
}))
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));
// 
app.use(expressLayouts);
// make the uploads available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

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
app.use(flash());
app.use(customMware.setFlash);
// use express router


app.use('/', require('./routes'));



app.listen(port,function(err){
    if(err){
        console.log(`Error on running the server: ${err}`);
    }

    console.log(`Server is running successfully on port: ${port} `);
})