/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const express = require('express');

 const router = express.Router();

 const userController = require('../controllers/users_controller');

 const passport = require('passport');
 const friendship_controller = require('../controllers/friendship_controller');



router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('./profile/:id/toggleFriends', friendship_controller.toggleFriends)
 router.post('/update/:id',passport.checkAuthentication, userController.update);

 router.get('/sign-up', userController.signUp);
 router.get('/sign-in', userController.signIn);

 router.post('/create', userController.create);

//  use passport as a middleware to authenticate
 router.post('/create-Session',passport.authenticate(
     'local',
     {failureRedirect: '/users/sign-in'},
 ), userController.createSession);

 router.get('/sign-out',userController.destroySession);

 router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));

 router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}),userController.createSession);

module.exports = router;