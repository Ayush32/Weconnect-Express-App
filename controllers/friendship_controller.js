/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const Friend = require('../models/friendship.');

const User = require('../models/user');
const Post = require('../models/post');
const Friendship = require('../models/friendship.');


module.exports.toggleFriends = (req,res) => {
    let from_id =  req.params._id
    let to_id = req.params._id

    Friendship.findOne({$or:[
        {
        from_user: from_id,
        to_user: to_id,
        },
        {
        from_user: to_id,
        to_user: from_id

        }]},

        function(error,existingFriendship){
            console.log('Friendship Done',existingFriendship)
            if(error){
                console.log('Error in Making Friendship between the user',error)
            }

            if(existingFriendship){
                User.findById(from_id,{$pull:{friendships: existingFriendship._id}},function(error,data){
                    if(error){
                        console.log('error in making the friendships between the user',error)
                        return;
                    }
                    console.log(data);
                });
                User.findById(to_id,{$pull:{friendships:existingFriendship._id}},function(error,data){
                    if(error){
                        console.log('error in removing the friend',error)
                    }
                });

                Friendship.deleteOne({$or: [
                    {
                        from_user:from_id,
                        to_user: to_id
                    },
                    {
                        from_user: to_id,
                        to_user: from_id
                    }]},function(error){
                        if(error){
                            console.log('unable to remove friendship',error);
                            return;
                        }
                        console.log('Deleted Friendship!')

                    });
            }

            else{
                Friendship.create({from_user:from_id,to_user: to_id},function(error,new_Friendship){
                    if(error){
                        console.log('There was an error in creating a friendship!',error);
                    }
                    new_Friendship.save();

                    User.findByIdAndUpdate(from_id,{$push:{friendships:new_Friendship._id}},function(error,data){
                        if(error){
                            console.log('error in adding the friendships to the user database',error);
                            return;
                        }
                        console.log(data);

                    });

                    User.findByIdAndUpdate(to_id,{$push:{friendships:new_Friendship._id}},function(error,data){
                        if(error){
                            console.log('error in adding the friendships user to the database,',error);
                        }
                        console.log(data);
                    });
                });
                
            }
        })

        return res.redirect('back');
}
