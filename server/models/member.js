// Connected to MongoDB database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MemberSchema = new Schema({
    name: {
        type: String,
        minlength: 1,
        maxlength: 50,
        allowNull: false,
        unique: false,
        index: false,
    },
    email: {
        type: String,
        minlength: 1,
        maxlength: 50,
        lowercase: true,
        allowNull: false,
        index: true,
    },
    image_url: {
        type: String,
        minlength: 1,
        maxlength: 5000,
        allowNull: true,
        unique: false,
        index: false,
        default: 'https://orig00.deviantart.net/10e3/f/2013/114/8/4/facebook_default_profile_picture___clone_trooper_by_captaintom-d62v2dr.jpg'
    },
    hashed_password: {
        type: String,
        allowNull: false,
        index: false,
    },
    timestamp: {
        type: Date, 
        default: Date.now,
        index: false,
    },
});

module.exports = mongoose.model('Member', MemberSchema);
