const fs = require('fs')
require('dotenv').config();
const nodemailer = require("nodemailer")

exports.send = async function(email, name, req, res) {
    // configuring
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // gmail account
            pass: process.env.PASSWORD // gmail password
        }
    });

    // composing email
    body = `<p>Hi ${name},<br>You\'ve received a plasma request.<br><br>
    Requester Name: ${req.body.reqName}<br>
    Requester email: ${req.body.reqEmail}<br>
    Requester Phone number: ${req.body.phone}<br>
    Patient Blood Group: ${req.body.reqBlood}<br>`
    if(req.body.message) {
        body = body + `Custom Message: ${req.body.message}<br>`
    }
    body = body + `<br>Please connect with this person soon.<br>
                    Have a nice day!</p>`


    let mailOptions = {
        from: process.env.EMAIL, // email sender
        to: `${email}`, // email receiver
        subject: 'Plasma SOS',
        html: body
    };

    // Sending email
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send("Email sent!");
    });
}