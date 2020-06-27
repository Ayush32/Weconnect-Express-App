/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const Post = require('../models/post');
const { populate } = require('../models/post');

//  Another controller which access by routes
module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25)

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         titleName: 'WeConnect | Home',
    //         posts: posts

    //     });
    // });


    // populate the suer of each post
    Post.find({}).populate('user').exec(function(err, posts){
        return res.render('home',{
            titleName: 'WeConnect | Home',
            posts: posts

    });
})

}
