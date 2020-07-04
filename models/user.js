/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const mongoose = require('mongoose');

  const multer = require("multer");
  const path = require('path');
  const AVATAR_PATH = path.join('/uploads/users/avatars');

 const userSchema = new mongoose.Schema({
     email: {
         type: String,
         required: true,
         unique: true
     },
     password: {
         type: String,
         required: true
     },
     name: {
         type: String,
         required: true
     },
     avatar:{
         type: String
     }
 }, {
     timestamps: true
 });


 let storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, path.join(__dirname, '..', AVATAR_PATH));
   },
   filename: function (req, file, cb) {
     cb(null, file.fieldname  + "-" + Date.now());
   },
   fileFilter: function(req, file, cb){
       if(file.mimetype !== "avatar/png" && file.mimetype !== "avatar/jpg" && file.mimetype !==  "avatar/jpeg"){
           
           cb(null, false);
       }
       else{
           cb(null, true);

       }
   },
    limits: function(req, file, cd){
    if (req.files.file.length > 1 * 1024 * 1024) {
      return false;
    }
  }
 });

//  static function/methods
userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');userSchema.statics.avatarPath = AVATAR_PATH;

 const User = mongoose.model('User', userSchema);

 module.exports = User;