/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
module.exports.profile = function (req, res) {
  return res.render('user_profile',{
    titleName: "Profile",
  })
};