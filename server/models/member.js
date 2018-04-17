// Connected to MongoDB database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MemberSchema = new Schema({
    username: {
      type: String,
      minlength: 1,
      maxlength: 50,
      unique: true,
      allowNull: false,
    },
    first_name: {
      type: String,
      minlength: 1,
      maxlength: 50,
      unique: true,
      allowNull: false,
    },
    last_name: {
      type: String,
      minlength: 1,
      maxlength: 50,
      unique: true,
      allowNull: false,
    },
    email: {
        type: String,
        minlength: 1,
        maxlength: 50,
        lowercase: true,
        unique: true,
        allowNull: false,
    },
    confirmed: {
        type: Boolean,
        default: false,
    },
    id_member: {
        type: Number,
        unique: true,
    },
    phone: {
        type: String,
        minlength: 7,
        maxlength: 15,
    },
    hashed_password: {
        type: String,
        allowNull: false,
    },
// image should be a URL link to image
    image: {
        type: String,
        default: "https://en.wikipedia.org/wiki/Smiley#/media/File:SNice.svg",
    },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Member', MemberSchema);
