'use strict';
//zw5oc3kewy2nu4ec@ethereal.email
const nodemailer = require('nodemailer');

nodemailer.createTransport((err, account) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'zw5oc3kewy2nu4ec@ethereal.email', // generated ethereal user
            pass: 'mQa4QBD3hgd6ZgCRYk'  // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo 👻" <cezcardozo23@gmail.com>', // sender address
        to: 'elunawatkins@gmail.com, cezcardozo23@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
});

module.exports = {
    createTransport
}