const fs = require('fs')
require('dotenv').config();
const nodemailer = require("nodemailer")

exports.send = async (req, res) => {

    let email = req.body.email
  
    const nodemailer = require('nodemailer');
    const log = console.log;
  
    // Step 1
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // gmail account
            pass: process.env.PASSWORD // gmail password
        }
    });
  
    // Step 2
    let mailOptions = {
        from: process.env.EMAIL, // email sender
        to: `${email}`, // email receiver
        subject: 'Plasma SOS',
        text: 'You\'hv received a plasma request.'
    };
  
    // Step 3
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            return res.status(400).send(err);
        }
        return res.status(200).send("Email sent!");
    });
  }