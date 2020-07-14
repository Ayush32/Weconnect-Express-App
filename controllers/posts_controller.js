/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const Post = require('../models/post');
const Comment = require('../models/comment');
const queue = require('../config/kue')
const postMailer = require('../mailers/posts_mailer');
const postEmailWorker = require('../workers/post_email_worker');


 module.exports.create = async function(req, res){
     try{
         let new_post = await Post.create({
           content: req.body.content,
           user: req.user._id,
         });
         new_post = await new_post.populate('user','name email').execPopulate();

         let job = queue.create('emails', new_post).save(function(err){
           if (err) {
             console.log("Error in creating a queue");
             return;
           }
           console.log('job queued', job.id)
         })
         req.flash('success','New Post Published!')
         return res.redirect("back");

     }

     catch(err){
          req.flash('error', err);
          return res.redirect('back');
     }
    
 }

 module.exports.destroy = async function(req,res){

    try{
        let post = await Post.findById(req.params.id);
        if (post.user == req.user.id) {
          post.remove();

          await Comment.deleteMany({ post: req.params.id });
          

          if(req.xhr){
            return res.status(200).json({
              data:{
                post_id: req.params.id
              },
              message: "Post Delete Successfully!"
            })
          }
          req.flash("success", "Post deleted! Successfully");
          return res.redirect("back");
        } else {
          req.flash("error", "You cannot delete this post");
          return res.redirect("back");
        }
    }

    catch(err){
        req.flash("error", err);
        return res.redirect('back')
    }
     
 }