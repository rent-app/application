// Connected to MongoDB database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MailListSchema = new Schema({
    email: {
        type: String,
        minlength: 1,
        maxlength: 50,
        lowercase: true,
        unique: true,
    },
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MailList', MailListSchema);
