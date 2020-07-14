/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

 const nodeMailer = require('../config/nodemailer')

 exports.newPost = (post) => {
     let htmlString = nodeMailer.renderTemplate({post:post}, './posts/new_post.ejs');
     console.log('inside new post mailer');

     nodeMailer.transporter.sendMail({
         from: '721ayush@gmail.com',
         to: post.user.email,
         subject: "New Post Added",
         html: htmlString
     },(err,info) =>{
         if(err){
             console.log('Error in sending Email', err)
             return;
         }

         console.log('Message Sent', info);
         return;
     })
 }