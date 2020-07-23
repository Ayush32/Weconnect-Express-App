/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { profile } = require('console');
const env = require('./environment')

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:env.google_client_id,
      clientSecret: env.google_client_secret,
      callbackURL: env.google_call_back_url
  
    }, 
    function (accessToken, refreshToken,profile, done) { 
        // find user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error in Google Strategy-passport, err');
                return;

            }
            console.log(refreshToken);
            console.log(accessToken);
            console.log(profile);

            if(user){
                // if found , set this user at req.user
                return done(null, user);
            }

            else{
                // if not found, create and set the user it as  req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function(err, user){
                        if (err){
                            console.log('Error in creating user google strategy-passport', err);
                            return;
                        }
                        return done(null, user);
                })
            }

        });
     }
  ));

  module.exports = passport