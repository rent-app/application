// TP added connection to mongoDB for mailling list
const mongoose = require('mongoose');
var dev_db_url = "mongodb://tgp22:account1@ds161493.mlab.com:61493/tp-todo-hmwk";
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const MailListSchema = new Schema({
    email: { type: String},
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MailList', MailListSchema);
