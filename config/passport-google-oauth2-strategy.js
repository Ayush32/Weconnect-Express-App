/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');
const { profile } = require('console');

// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID:
      "647658849431-ds2ckn8ith6na0qib1m621lg75rrabf3.apps.googleusercontent.com",
      clientSecret: "mfRSjsXTQl_BpmtnNsjJ8Y3f",
      callbackURL: "http://localhost:8000/users/auth/google/callback"
  
    }, 
    function (accessToken, refreshToken, done) { 
        // find user
        User.findOne({email: profile.emails[0].value}).exec(function(err, user){
            if(err){
                console.log('Error in Google Strategy-passport, err');
                return;

            }

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