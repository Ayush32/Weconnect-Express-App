/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const Comment = require('../models/comment');
const Post = require('../models/post');
const Post = require('../models/post');

 module.exports.create = function(req, res){
    Post.findById(req.body.post)
 }