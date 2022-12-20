const path = require('path');
const express = require("express");
const app = express();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
app.use(express.json());
const urlencodedParser = bodyParser.urlencoded({extended: false});
require('dotenv').config();
const PORT = process.env.PORT;
const User = require('./models/user');
const mongoose = require('mongoose');
const {MongoClient} = require('mongodb');


// connect to mongodb
const dbURI = process.env.DATABASE;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.DATABASE_PORT))
    .catch((error) => console.log(error));

app.set('view engine', 'handlebars');

app.use(bodyParser.json());
// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// app.get('/', async(req, res) => {
//     let data = req.body;
//     let email = data['Email'];
//
//     const client = new MongoClient(dbURI);
//     const database = client.db("website-info");
//     const users = database.collection("users");
//     const emailExists = users.findOne(
//         { email: email }
//     );
//     console.log(emailExists);
//     res.send({message: emailExists});
// });

// Saving the users data to the database.
app.post('/', async (req, res) => {

    let data = req.body;
    let name = data['Name'];
    let email = data['Email'];
    let address = data['Address'];
    let city = data['City'];
    let state = data['State'];
    let zipcode = data['Zipcode'];
    let phone = data['Phone'];
    let comments = data['Comments'];

    const client = new MongoClient(dbURI);
    const database = client.db("website-info");
    const users = database.collection("users");
    const estimate = users.estimatedDocumentCount();

    // save the data to the database
    const user = new User({
        name: name,
        email: email,
        address: address,
        city: city,
        state: state,
        zipcode: zipcode,
        phone: phone,
        comments: comments
    });
    user.save()
        .then(() => {
            res.send({message: estimate});
        })
        .catch((err) => {
            console.log(err);
        });
});

app.post('/send', async (req, res) => {

    let name = req.body['Name'];
    let email = req.body['Email'];

        const output = `
            <h4>Dear ${name},</h4>
            <p>Thanks for your feedback!</p>
            <p>Best,/nAfton Lawver</p>
        `
        const myOAuth2Client = new OAuth2(
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
            text: 'Dear ' + name + ',\nThanks for your feedback!',
            html: output
        };

        transporter.sendMail(mailOptions, function (err, result) {
            if (err) {
                console.log('Error with sending message.');
                res.send({
                    message: err
                })
            } else {
                transporter.close();
                const client = new MongoClient(dbURI);
                const database = client.db("website-info");
                const users = database.collection("users");
                const estimate = users.estimatedDocumentCount()
                    .then((estimate) => {
                        // console.log('number of documents: ' + estimate);
                        const data = req.body;

                        res.json({status: 200, documents: estimate });
                    })

            }
        });
});



