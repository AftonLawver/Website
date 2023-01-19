const express = require("express");
const app = express();
require('dotenv').config();
const path = require("path");
const mongoose = require("mongoose");
const postsRoute = require('./routes/posts');

const PORT = process.env.PORT;
const dbURI = process.env.DATABASE;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
    .then((result) => app.listen(process.env.DATABASE_PORT))
    .catch((error) => console.log(error));

// Set a static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', postsRoute);
app.use('/send', postsRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
