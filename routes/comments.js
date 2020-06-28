/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const express = require("express");
const router = express.Router();
const passport = require("passport");

const commentsController = require("../controllers/comments_controller");

router.post("/create", passport.checkAuthentication, commentsController.create);

router.get("/destroy", passport.checkAuthentication, commentsController.destroy);

module.exports = router;