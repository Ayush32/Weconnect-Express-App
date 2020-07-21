/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const User = require('../models/user');
const { findByIdAndUpdate } = require('../models/user');
const { use } = require('passport');
const Friendship = require('../models/friendship');
const fs = require('fs');
const path = require('path');


// lets keep it same as before
module.exports.profile = (req, res) => {
  User.findById(req.params.id, function (error, user) {
    if (error) {
      console.log("error in finding the user profile!");
      return;
    }

    let are_friends = false;

    Friendship.findOne(
      {
        $or: [
          { from_user: req.user._id, to_user: req.params.id },
          { from_user: req.params.id, to_user: req.user._id },
        ],
      },
      function (error, friendship) {
        if (error) {
          console.log("There was an error in finding the friendship", error);
          return;
        }
        if (friendship) {
          are_friends = true;
        }
        /* console.log(req.user);
            console.log(req.user._id, '********', req.params.id, '*******') */
        var options = {
          user_name: "ayush gupta",
          titleName: "WeConnect Express",
          profile_user: user /* it is the user whose profile i am currently browsing */,
          are_friends: are_friends,
        };
        return res.render("user_profile", options);
      }
    );
  });
};
//  profile update

module.exports.update = async function(req, res){
  // if(req.user.id == req.params.id){
  //   User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
  //     return res.redirect('back')
  //   });
  // }
  // else{
  //   // send the status sever when someone who has not authorized
  //   return res.status(401).send('Unauthorized');
  // }

  if(req.user.id == req.params.id){

    try{
      let user  = await User.findById(req.params.id);
      User.uploadedAvatar(req, res, function(err){
        if(err){
          console.log('*****Multer Error: ', err)
        }
        use.name = req.body.name;
        user.email = req.body.email;
        // console.log(req.file);
        if(req.file){

          if(user.avatar ){
            fs.unlinkSync(path.join(__dirname, '..', user.avatar))

          }
          // saving the path of the upload file into the avatar in the user
          user.avatar = User.avatarPath + '/' + req.file.filename
        }
        user.save();
        req.flash("success", "Profile Picture Uploaded!");
        return res.redirect('back');
      })

    }
    catch(err){
      req.flash('error','Error in Uploading the profile Picture');
      return res.redirect('back');

    }
  }
  else{
      res.flash('error', 'Unauthorized')
       return res.status(401).send("Unauthorized");
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