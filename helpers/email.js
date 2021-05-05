const fs = require('fs')
require('dotenv').config();
const nodemailer = require("nodemailer")
const EmailUpdater = require('./updateEmailCount')

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
    <strong>Requester Name:</strong> ${msg.req_name}<br>
    <strong>Requester email:</strong> ${msg.req_email}<br>
    <strong>Requester Phone number:</strong> ${msg.req_phone}<br>
    <strong>Patient Blood Group:</strong> ${msg.req_blood_group}<br>
    <strong>Patient admitted in:</strong> ${msg.req_hospital}<br>`
    if(msg.req_message) {
        body = body + `<strong>Custom Message:</strong> ${msg.req_message}<br>`
    }
    acceptLink = `${process.env.WEBSITE}`+'/status/'+`${msg.id}`+'/accepted'
    rejectLink = `${process.env.WEBSITE}`+'/status/'+`${msg.id}`+'/rejected'
    body = body + `<br>Please connect with this person soon.<br><br>
                    You could also choose one of the below options.<br>
                    <strong>*NOTE:</strong> choosing to accept will send your contact details(the one you mentioned during sign up) to the requester<br><br>
                    <a href='${acceptLink}' style="margin-right: 1rem">ACCEPT</a>
                    <a href='${rejectLink}' style="margin-left: 1rem">REJECT</a><br><br>
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
        EmailUpdater.updateCount(email)
        return res.status(200).send("Email sent!");
    });
}

exports.sendStatus = async function(email, user, req, res, status) {
    // configuring
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, // gmail account
            pass: process.env.PASSWORD // gmail password
        }
    });
    
    var body
    // composing email
    if(status == "accepted") {
        body = `<p>Hi,<br>You\'ve received a communication from the Donor you requested.<br>
        These is the information of the Donor for you to contact<br><br>
        <strong>Donor Name:</strong> ${user.name}<br>
        <strong>Donor email:</strong> ${user.email}<br>
        <strong>Donor Phone number:</strong> ${user.phone}<br>`
        if(user.social_link) {
            body = body + `<strong>Donor ${user.social_type}:</strong> ${user.social_link}<br>`
        }
        body = body + `<strong>Donor Blood Group:</strong> ${user.blood_group}<br>
        <strong>Donor State:</strong> ${user.state}<br>
        <strong>Donor District:</strong> ${user.district}<br>
        <strong>Donor Pincode:</strong> ${user.pin_code}<br>
        <strong>Donor Recovered / Vaccinated on:</strong> ${user.recovered_on}<br>
        <br>Please connect with this person soon.<br><br>
        Have a nice day!</p>`
    } else {
        body = `<p>Hi,<br>
        We are terribly sorry to inform you that Donor ${user.name} has rejected your plasma request status.<br>
        You could visit our side ${process.env.WEBSITE} to search for more donors<br>
        Sit tight!</p>`
    }


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