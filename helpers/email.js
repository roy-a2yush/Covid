const fs = require('fs')
require('dotenv').config();
const nodemailer = require("nodemailer")

exports.sendRequest = async function(email, name, req, res) {
    // configuring
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // gmail account
            pass: process.env.PASSWORD // gmail password
        }
    });

    var msg = req.body.event.data.new
    
    // composing email
    body = `<p>Hi ${name},<br>You\'ve received a plasma request.<br><br>
    Requester Name: ${msg.req_name}<br>
    Requester email: ${msg.req_email}<br>
    Requester Phone number: ${msg.req_phone}<br>
    Patient Blood Group: ${msg.req_blood_group}<br>
    Patient admitted in: ${msg.req_hospital}<br>`
    if(msg.req_message) {
        body = body + `Custom Message: ${msg.req_message}<br>`
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

exports.sendStatus = async function(email, name, req, res) {
    // configuring
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // gmail account
            pass: process.env.PASSWORD // gmail password
        }
    });

    var msg = req.body.event.data.new
    
    // composing email
    body = `<p>Hi ${name},<br>You\'ve received a plasma request.<br><br>
    Requester Name: ${msg.req_name}<br>
    Requester email: ${msg.req_email}<br>
    Requester Phone number: ${msg.req_phone}<br>
    Patient Blood Group: ${msg.req_blood_group}<br>
    Patient admitted in: ${msg.req_hospital}<br>`
    if(msg.req_message) {
        body = body + `Custom Message: ${msg.req_message}<br>`
    }
    body = body + `<br>Please connect with this person soon.<br>
                    Have a nice day!</p>`


    let mailOptions = {
        from: process.env.EMAIL, // email sender
        to: `${email}`, // email receiver
        subject: 'SOS: Plasma Donor Reply',
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