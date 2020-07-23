/*
 *   Copyright (c) 2020
 *   All rights reserved.
 */

 const fs = require('fs');
//  rfs-rotating-file-stream
const rfs = require('rotating-file-stream');
const path = require('path');


const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
  interval: '1d',
  path: logDirectory
})

const development = {
  name: "development",
  asset_path: "/assets",
  session_cookie_key: "bellaciao",
  db: "weconnect_development",
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "ayushg46342@gmail.com",
      pass: "Node@3100",
    },

  },
  google_client_id:
    "647658849431-ds2ckn8ith6na0qib1m621lg75rrabf3.apps.googleusercontent.com",
  google_client_secret: "mfRSjsXTQl_BpmtnNsjJ8Y3f",
  google_call_back_url: "http://localhost:8000/users/auth/google/callback",
  jwt_secret: "weconnect",
  morgan:{
    mode:'dev',
    options: {stream: accessLogStream}
  }
};

const production = {
  name: "production",
  asset_path: process.env.WECONNECT_ASSET_PATH,
  session_cookie_key: process.env.WECONNECT_SESSION_COOKIE_KEY,
  db: process.env.WECONNECT_DB,
  smtp: {
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.WECONNECT_GMAIL_USERNAME,
      pass: process.env.WECONNECT_GMAIL_PASSWORD,
    },
  },
  google_client_id: process.env.WECONNECT_GOOGLE_CLIENT_ID,
  google_client_secret: process.env.WECONNECT_GOOGLE_CLIENT_SECRET,
  google_call_back_url: process.env.WECONNECT_GOOGLE_CALLBACK_URL,
  jwt_secret: process.env.WECONNECT_JWT_SECRET,
  morgan: {
    mode: "combined",
    options: { stream: accessLogStream },
  },
};

module.exports = eval(process.env.WECONNECT_ENVIRONMENT) == undefined ? development : eval(process.env.WECONNECT_ENVIRONMENT);
