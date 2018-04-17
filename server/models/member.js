// Connected to MongoDB database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MemberSchema = new Schema({
    id_member: {
        type: Number,
        unique: true,
        index: true,
    },
    username: {
        type: String,
        minlength: 1,
        maxlength: 50,
        allowNull: false,
        unique: true,
        index: false,
    },
    first_name: {
        type: String,
        minlength: 1,
        maxlength: 50,
        unique: false,
        index: false,
    },
    last_name: {
        type: String,
        minlength: 1,
        maxlength: 50,
        unique: false,
        index: false,
    },
    email: {
        type: String,
        minlength: 1,
        maxlength: 50,
        lowercase: true,
        allowNull: false,
        index: false,
    },
    confirmed: {
        type: Boolean,
        default: false,
        index: false,
    },
    phone: {
        type: String,
        unique: false,
        minlength: 7,
        maxlength: 15,
        index: false,
    },
    hashed_password: {
        type: String,
        allowNull: false,
        index: false,
    },
// image should be a URL link to image
    image: {
        type: String,
        unique: false,
        default: "https://en.wikipedia.org/wiki/Smiley#/media/File:SNice.svg",
        index: false,
    },
    timestamp: {
        type: Date, 
        default: Date.now,
        index: false,
    },
});

module.exports = mongoose.model('Member', MemberSchema);
