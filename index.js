/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const express = require('express');
const env = require('./config/environment');
const logger  = require('morgan')
const rfs = require('rotating-file-stream');
const app = express();
require("./config/view-helpers")(app);
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

// setup the chat server to be used the socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
// for running the chat server
console.log('chat server is listening on port: 5000');

const path  = require('path');


// flash Middleware
const customMware = require('./config/middleware');

if(env.name == 'development'){
    app.use(
      sassMiddleware({
        src: path.join(__dirname, env.asset_path, "scss"),
        dest: path.join(__dirname, env.asset_path, "css"),
        debug: true,
        outputStyle: "extended",
        prefix: "/css",
      })
    );

}

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());

app.use(express.static(env.asset_path));
// 
app.use(expressLayouts);
// make the uploads available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use(logger(env.morgan.mode, env.morgan.options))

// extract style and scripts  from sub pages into the layout
app.set('layout extractStyles', false);
app.set('layout extractScripts', true);


app.set('view engine','ejs');
app.set('views','./views');

// mongostore is use to store the session cookie in db
app.use(session({
    name: 'WeConnect',
    // todo change the secret before the deployment in production mode
    secret: env.session_cookie_key,
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