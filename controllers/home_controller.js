/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

//  Another controller which access by routes
module.exports.home = function(req,res){
    console.log(req.cookies);
    res.cookie('user_id',25)
   return res.render('home',{
       titleName: "Home Page",
   })
}
