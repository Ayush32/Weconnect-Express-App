/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const Comment = require('../models/comment');
const Post = require('../models/post');

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
         }
         if(req.xhr){
           console.log(comment);
           return res.status(200).json(
             {
             data:{
               comment_id: comment._id,
               user_name: comment.user.name,
               comment_content: comment.content,
               post_id: comment.post._id
             },
             message:'comment created!'
           }
           )
         }
         req.flash("success", "New Comments Posted!");
         res.redirect("/");
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