/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const User = require('../models/user')
module.exports.profile = function (req, res) {
  return res.render('user_profile',{
    titleName: "Profile",
  })
};

// sign Up

module.exports.signUp = function(req,res){
  if (req.isAuthenticated()){
    return res.redirect('/users/profile');
  }
  return res.render('user_sign_up', {
    titleName: "WeConnect | Sign Up",
  });
}

// Sign In

module.exports.signIn = function(req,res){
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  return res.render('user_sign_in',{
    titleName: "WeConnect | Sign In",
  });
};

// get the sign up data 

module.exports.create = function(req,res){
  if(req.body.password != req.body.confirm_password){
    return res.redirect('back')
  }

  User.findOne({email: req.body.email}, function(err, user){
    if(err){
      console.log('Error in finding user in signing up');
      return;
    }
    if(!user){
      User.create(req.body, function(err,user){
        if(err){
      console.log('Error in creating user while in signing up');
      return;
      }
      return res.redirect('/users/sign-in');
    });
  }

  else{
    return res.redirect('back')
  }
});


}

// sign in and create the session 

module.exports.createSession = function(req,res){
  return res.redirect('/');
}

module.exports.destroySession = function(req,res){
  req.logout();
  return res.redirect('/')
}