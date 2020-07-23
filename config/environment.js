/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const development = {
   name: "development",
   asset_path: "/assets",
   session_cookie_key: "bellaciao",
   db: 'weconnect_development',
   smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
        user: 'ayushg46342@gmail.com',
        pass: 'Node@3100'
    }},
    google_client_id:
    "647658849431-ds2ckn8ith6na0qib1m621lg75rrabf3.apps.googleusercontent.com",
    google_client_secret: "mfRSjsXTQl_BpmtnNsjJ8Y3f",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback"
  
 };

 const production = {
     name: 'production'
 }

 module.exports = development;