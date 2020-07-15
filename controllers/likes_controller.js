/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const Like = require('../models/like');
const Post = require('../models/post')
const Comment = require('../models/comment');

module.exports.toggleLike = async function(req, res){
    try {
        let likable;
        let deleted = false;

        if(req.query.type == 'Post'){
            likable = await Post.findById(req.query.id).populate('likes');
        }

        else{
            likable = await Comment.findById(req.query.id).populate('likes');
          }
        //   check if a like already exists
        let existingLike = await Like.findOne({
            likableLike: req.query.id,
            noModel: req.query.type,
            user: req.user._id,
        })

        // if like is already exists then deleted it 
        if(existingLike){
            likable.likes.pull(existingLike._id);
            likable.save();
        }

        else{
            let newLike = await Like.create({
                user: req.user.id,
                likable:req.query.id,
                onModel: req.query.type
            })

            likable.likes.push(like._id);
            likable.save();
        }

        return res.json(200,{
            message: "Request successfully",
            data:{
                deleted: deleted
            }
        })
    }

    catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error"
        })
    }
}