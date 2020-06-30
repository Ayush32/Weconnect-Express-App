/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const User = require('../models/user');
const { findByIdAndUpdate } = require('../models/user');


// lets keep it same as before
module.exports.profile = function (req, res) {
  User.findById(req.params.id, function(err,user){
  return res.render("user_profile", {
    titleName: "Profile",
    profile_user: user
  });
  })
};

//  profile update

module.exports.update = function(req, res){
  if(req.user.id == req.params.id){
    User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
      return res.redirect('back')
    });
  }
  else{
    // send the status sever when someone who has not authorized
    return res.status(401).send('Unauthorized');
  }
}

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
  req.flash('success', 'Logged in Successfully');
  return res.redirect('/');
}

module.exports.destroySession = function(req,res){
  req.logout();
   req.flash("success", "Logged Out  Successfully");
  return res.redirect('/')
}