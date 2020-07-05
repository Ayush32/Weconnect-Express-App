/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


passport.use(new googleStrategy{
    
})