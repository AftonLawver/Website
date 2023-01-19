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
    phone: {
        type: String
    },
    comments: {
        type: String
    }
}, { timestamps: true, versionKey: false });

userSchema.statics.isThisEmailInUse = async function(email) {
    if(!email) throw new Error('Invalid Email');
    try {
        const user = await this.findOne({email})
        if(user) return false

        return true;
    } catch (error) {
        console.log('error inside isThisEmailInUse method', error.message)
        return false
    }

};

const User = mongoose.model('User', userSchema);
// export the model so that we can use it elsewhere in the project.
module.exports = User;
