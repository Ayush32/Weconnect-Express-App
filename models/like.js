/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const mongoose = require('mongoose');

 const likeSchema = new mongoose.Schema({
     user: {
         type: mongoose.Schema.ObjectId,
         ref: 'User',
     },
    //  this defines the object id of the liked object
     likable :{
         type: mongoose.Schema.Types.ObjectId,
         required: true,
         refPath: 'onModel'
     },
    //  this filed is used for defining the type of the linked object since this is a dynamic reference 
     onModel: 
     {
         type: String,
         required: true,
         enum: ['Post', 'Comment']
     }
 }, {
     timestamps: true
 });

 const Like = mongoose.model('Like', likeSchema);
 module.exports = Like;
