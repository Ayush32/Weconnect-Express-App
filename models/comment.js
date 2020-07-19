/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const mongoose = require('mongoose');
const Post = require('./post');

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    // comment below to the user
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Like",
      }
    ],
  },
  {
    timestamps: true,
  });

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment