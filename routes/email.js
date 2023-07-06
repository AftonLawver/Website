const express = require('express');
const router = express.Router();
const {MongoClient} = require("mongodb");
const nodemailer = require("nodemailer");
const dbURI = process.env.DATABASE;
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const OAuth2 = google.auth.OAuth2;
router.use(express.json());
router.use(bodyParser.json());

// deals with /email/send
router.post('/send', async (req, res) => {
    res.send("hi post /email/send");

    // let name = req.body["Name"];
    // let email = req.body["Email"];
    //
    // const output = `
    //         <h4>Dear ${name},</h4>
    //         <p>Thanks for your feedback on my website!</p>
    //         <p>Best,<br>Afton Lawver</p>
    //     `
    // const myOAuth2Client = new OAuth2(
    //     process.env.OAUTH_CLIENTID,
    //     process.env.OAUTH_CLIENT_SECRET,
    //     "https://developers.google.com/oauthplayground"
    // );
    //
    // myOAuth2Client.setCredentials({
    //     refresh_token: process.env.OAUTH_REFRESH_TOKEN
    // });
    //
    // const myAccessToken = myOAuth2Client.getAccessToken();
    //
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         type: 'OAuth2',
    //         user: process.env.MAIL_USERNAME,
    //         pass: process.env.MAIL_PASSWORD,
    //         clientId: process.env.OAUTH_CLIENTID,
    //         clientSecret: process.env.OAUTH_CLIENT_SECRET,
    //         refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    //         access_token: myAccessToken
    //     }
    // });
    //
    // let mailOptions = {
    //     from: 'lawverap25@gmail.com',
    //     to: email,
    //     subject: 'Thanks for visiting my website!',
    //     text: 'Dear ' + name + ',\nThanks for your feedback!',
    //     html: output
    // };
    //
    // transporter.sendMail(mailOptions, function (err, result) {
    //     if (err) {
    //         console.log('Error with sending message.');
    //         res.send({
    //             message: err
    //         })
    //     } else {
    //         transporter.close();
    //         const client = new MongoClient(dbURI);
    //         const database = client.db("website-info");
    //         const users = database.collection("users");
    //         const estimate = users.estimatedDocumentCount()
    //             .then((estimate) => {
    //                 // console.log('number of documents: ' + estimate);
    //                 const data = req.body;
    //
    //                 res.json({status: 200, documents: estimate });
    //             })
    //     }
    // });
});

module.exports = router;
