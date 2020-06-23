/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
module.exports.profile = function (req, res) {
  return res.render('user_profile',{
    titleName: "Profile",
  })
};

// sign Up

module.exports.signUp = function(req,res){
  return res.render('user_sign_up', {
    titleName: "WeConnect | Sign Up",
  });
}

// Sign In

module.exports.signIn = function(req,res){
  return res.render('user_sign_in',{
    titleName: "WeConnect | Sign In",
  });
};

// get the sign up data 

module.exports.create = function(req,res){
  // later
}

// sign in and create the session 

module.exports.createSession = function(req,res){
  // later
}