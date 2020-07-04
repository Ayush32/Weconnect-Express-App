/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const express = require("express");
const router = express.Router();
const postApi = require("../../../controllers/api/v1/post_api");

router.get('/', postApi.index);

module.exports = router;