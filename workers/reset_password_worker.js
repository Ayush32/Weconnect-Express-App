/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */
const queue = require("../config/kue");
const resetMailer = require('../mailers/reset_password_mailer');

queue.process('reset_password_mail', function(job, done){
    resetMailer.reset_pass(job.data);
    done();
})