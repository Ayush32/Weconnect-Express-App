/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const express = require('express');

 const router = express.Router();

 const userController = require('../controllers/users_controller');

 router.get('/profile',userController.profile);

module.exports = router;