/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const Post = require('../models/post');
 module.exports.create = function(req, res){
     Post.create({
         content: req.body.content,
         user: req.user._id
     },function(err, posts){
         if(err){
            console.log('error in creating a post');
         return;
        }

            return res.redirect('back')
     });
 }