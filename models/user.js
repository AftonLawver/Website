const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema defines the structure of the document going into the database
const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zipcode: {
        type: String
    },
    telephone: {
        type: String
    },
    comments: {
        type: String
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
// export the model so that we can use it elsewhere in the project.
module.exports = User;
