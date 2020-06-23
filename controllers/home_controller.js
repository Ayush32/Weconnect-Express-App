/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

//  Another controller which access by routes
module.exports.home = function(req,res){
   return res.render('home',{
       titleName: "Home",
   })
}
