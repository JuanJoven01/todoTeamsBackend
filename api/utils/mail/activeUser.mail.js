"use strict";
const nodemailer = require("nodemailer");
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: 587,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_KEY
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function sendUserMail(mail, subject, text ) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.SMTP_MAIL, // sender address
    to: mail, // list of receivers
    subject: subject, // Subject line
    text: text, // plain text body
  });

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

module.exports = sendUserMail;