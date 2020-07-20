/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const Post = require('../models/post');
const { populate } = require('../models/post');
const User = require('../models/user');
const { post } = require('../routes/users');
const Friendship = require('../models/friendship');


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

           let friends = new Array();
           if(req.user)
           {
             let all_friendships =  await Friendship.find({$or:[{from_user:req.user._id},{to_user:req.user._id}]})
             .populate('from_user').populate('to_user')
             for (let f of all_friendships){
               if(f.from_user._id.toString() == req.user._id.toString())
               {
                 friends.push({
                   friend_name: f.to_user.name,
                   friend_id: f.to_user._id,
                   friend_avatar: f.to_user.avatar,

                 })
               }
              else if(f.to_user._id.toString() == req.user._id.toString())
               {
                 friends.push({
                   friend_name: f.from_user.name,
                   friend_id: f.from_user._id,
                   friend_avatar: f.form_user.avatar,

                 });
               }
             }
           }

              let users = await User.find({});
              return res.render("home", {
                titleName: "WeConnect | Home",
                posts: posts,
                all_users: users,
                friends: friends
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
