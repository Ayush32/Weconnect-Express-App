/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const Post = require('../models/post');
const { populate } = require('../models/post');
const User = require('../models/user');
const { post } = require('../routes/users');


//  Another controller which access by routes
module.exports.home = async function(req,res){
    

    try{
         // populate the suer of each post
         let posts = await Post.find({})
         .sort('-createdAt')
           .populate("user")
           .populate({
             path: "comments",
             populate: {
               path: "user",
             },
             populate:{
               path: 'likes'
             }
           }).populate('likes')

              let users = await User.find({});
              return res.render("home", {
                titleName: "WeConnect | Home",
                posts: posts,
                all_users: users,
              });
       } 
       catch(err){

       console.log('Error',err);
       return;

    }



   

     
       
}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();
// posts.then();

// without async and awaited
// let users =  User.find({}, function(err, users){
//         return res.render('home',{
//             titleName: 'WeConnect | Home',
//             posts: posts,
//             all_users: users
//         });
