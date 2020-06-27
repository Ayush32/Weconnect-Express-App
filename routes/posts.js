/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const express = require('express');
const router = express.Router();

const postController = require('../controllers/posts_controller');

router.post('/create',postController.create);

module.exports = router;