const sslRedirect = require('heroku-ssl-redirect').default;
const express = require("express");
const app = express();
require('dotenv').config();
const path = require("path");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 3000;
const dbURI = process.env.DATABASE;
// const emailRoute = require("routes/email");
const {MongoClient} = require("mongodb");
const User = require("./models/user");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const bodyParser = require("body-parser");
const OAuth2 = google.auth.OAuth2;
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use(sslRedirect());

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.DATABASE_PORT))
    .catch((error) => console.log(error));


// app.use("/email", emailRoute);

// handle all requests for the root
app.post('/', async (req, res) => {
  let data = req.body;
  console.log(data);
  let name = data["Name"];
  let email = data["Email"];
  let message = data["Message"];

  // Connect to the database and get the count of documents/users who have given feedback
  const client = new MongoClient(dbURI);
  const database = client.db("website-info");
  const users = database.collection("users");
  const estimate = users.estimatedDocumentCount();

  const user = new User({
    name: name,
    email: email,
    message: message
  });
  user.save()
    .then(() => {
      res.send({message: estimate});
    })
    .catch((err) => {
      console.log(err);
    });
});

// handle request for /send
app.post('/send', async (req, res) => {
  // res.send("hi post /send");

  let name = req.body["Name"];
  let email = req.body["Email"];

  const output = `
          <h4>Dear ${name},</h4>
          <p>Thanks for your feedback on my website!</p>
          <p>Best,<br>Afton Lawver</p>
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
    }
    else {
      transporter.close();
      const client = new MongoClient(dbURI);
      const database = client.db("website-info");
      const users = database.collection("users");
      const estimate = users.estimatedDocumentCount()
        .then((estimate) => {
          // console.log('number of documents: ' + estimate);
          const data = req.body;

          res.json({status: 200, documents: estimate});
        })
    }
  })
});
app.listen(PORT, err => {
  if (err) {
    return console.log("ERROR", err);
  }
  console.log(`Server started on port ${PORT}`)

});
