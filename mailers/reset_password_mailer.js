/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

const nodemailer = require('../config/nodemailer');

exports.reset_pass = (token) => {
    let htmlStr = nodemailer.renderTemplate({token: token}, './reset_password/reset_password_mail.ejs')
    console.log('reset password')
    nodemailer.transporter.sendMail({
        from:'721ayush@gmail.com',
        to:token.user.email,
        subject: 'WeConnect Express | Link to reset password',
        html: htmlStr
    },
    (err, info) =>{
        if(err){
            console.log('Error in sending Email', err)
            return;
        }

        console.log('Mail delivered!', info);
        return;
    })
 }