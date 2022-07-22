
const fs = require('fs');
const path = require('path');
const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();
const PORT = process.env.PORT || 3000;

const { engine } = require('express-handlebars');
app.engine('handlebars', engine({ extname: '.hbs', defaultLayout: "main"}));
app.set('view engine', 'handlebars');


app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


app.post('/update', (req, res) => {
    let data = JSON.stringify(req.body, null, 2);

    // save the data to the data.json file
    if (!fs.existsSync(path.join(__dirname, 'public/data.json'))) {
        fs.closeSync(fs.openSync(path.join(__dirname, 'public/data.json'), 'w'));
    }

    fs.appendFile(path.join(__dirname, 'public/data.json'), data + ',\n', function (err){
        if (err) throw err;
        console.log('The data was appended.');
    });

    res.end();

});

app.post('/send', (req, res) => {

    let name = req.body['Name'];
    let email = req.body['Email'];

    // To send to me/owner of website
    const output = `
        <h4>Dear ${name},</h4>
        <p>Thanks for your feedback!</p>
        <br>
        <p>Best,</p>
        <p>Afton Lawver</p>
    `
    const myOAuth2Client = new OAuth2 (
        process.env.OAUTH_CLIENTID,
        process.env.OAUTH_CLIENT_SECRET,
        "https://developers.google.com/oauthplayground"
    );

    myOAuth2Client.setCredentials({
        refresh_token: process.env.OAUTH_REFRESH_TOKEN
    });

    const myAccessToken = myOAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
            clientId: process.env.OAUTH_CLIENTID,
            clientSecret: process.env.OAUTH_CLIENT_SECRET,
            refreshToken: process.env.OAUTH_REFRESH_TOKEN,
            access_token: myAccessToken
        }
    });

    let mailOptions = {
        from: 'lawverap25@gmail.com',
        to: email,
        subject: 'Thanks for visiting my website!',
        text: 'Dear ' + name + ',\n\nThanks for your feedback!',
        html: output
    };

    transporter.sendMail(mailOptions,function(err,result){
        if(err){
            console.log('Error with sending message.');
            res.send({
                message:err
            })
        }else{
            transporter.close();
            res.send({
                message:'Email has been sent: check your inbox!'
            })
            res.send('Message sent successfully.');

            res.send({
                message:'Email has been sent: check your inbox!'
            })
        }
        res.end();

    });
});


