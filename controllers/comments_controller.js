/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const Comment = require('../models/comment');
const Post = require('../models/post');
const queue = require("../config/kue");
const commentEmailWorker = require("../workers/comment_email_worker");
const commentsMailer = require('../mailers/comments_mailer');
const Like = require("../models/like");
const User = require('../models/user')



 module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post);

         if (post) {
           let comment = await Comment.create({
             content: req.body.content,
             post: req.body.post,
             user: req.user._id,
           });
             // handle error
            post.comments.push(comment);
           post.save();

          comment = await comment.populate('user', 'name email').execPopulate();
          //  commentsMailer.newComment(comment);
         let job =  queue.create('emails', comment).save(function(err){
            if(err){
              console.log('Error in creating a queue');
              return;
            }
            console.log('job enqueued', job.id);
          })

          if(req.xhr){
            console.log(comment);
            return res.status(200).json({
              data:{
                comment_id:comment._id,
                user_name:comment.user.name,
                comment_content:comment.content,
                post_id:comment.post._id,
              },
              message: 'Comment'
            })
          }

           req.flash('success', 'New Comments Added!')
           res.redirect("/");
         }
    }
    catch(err){
        req.flash('error',err)
        return res.redirect('back');

    }
 }

 module.exports.destroy = async function(req, res){

    try{
         let comment = await Comment.findById(req.params.id);

         if (comment.user == req.user.id) {
           let postId = comment.post;

           comment.remove();

           let post = Post.findByIdAndUpdate(
             postId,
             {
               $pull: { comments: req.params.id },
             })
            //  change:: destroy the associate likes for this comment 
            await Like.deleteMany({likable: comment._id, onModel:'Comment'})


            if(req.xhr){
              return res.status(200).json({
                data:{
                  comment_id:comment._id,
                }
              })
            }
             req.flash('success','Comment are deleted!')
               return res.redirect("back");
         } else {
           req.flash('error','Not Authorized to delete comments!!')
           return res.redirect("back");
         }

    }
    catch(err){
        req.flash('error',err)
        return res.redirect('back');
    }
    

 }