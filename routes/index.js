/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

//  create router using express router
 const express = require('express');
 const router = express.Router();

 const homeController = require('../controllers/home_controller')

 console.log("Router loaded")

router.get('/', homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
// router.use('/chat',require('./chat'));

// for any further routes access from here 
// router.use(./)




 module.exports = router;