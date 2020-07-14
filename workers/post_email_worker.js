/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */
const queue = require("../config/kue");

const postsMailer = require("../mailers/posts_mailer");

queue.process("emails", function (job, done) {
  console.log("Emails worker is processing a job", job.data);

  postsMailer.newPost(job.data);
  done();
});
