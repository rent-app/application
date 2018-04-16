// TP added connection to mongoDB for mailling list

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MailListSchema = new Schema({
    email: { type: String},
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MailList', MailListSchema);
