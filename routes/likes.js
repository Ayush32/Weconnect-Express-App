/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
 const express = require("express");
 const router = express.Router();
 const likesController = require('../controllers/likes_controller');

 router.get('/toggle', likesController.toggleLike)


 module.exports = router;