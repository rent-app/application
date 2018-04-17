// Connected to MongoDB database

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostingSchema = new Schema({
    title: {
      type: String,
      minlength: 1,
      maxlength: 50,
      allowNull: false,
    },
    condition: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
    },
    description: {
        type: String,
    },
    location: {
        type: String,
    },
    available: {
        type: Boolean,
        default: false,
    },
    id_posting: {
        type: Number,
        unique: true,
    },
    id_member: {
        type: Number,
        unique: true,
    },
// image should be a URL link to image
    image: {
        type: String,
        default: "https://emojipedia-us.s3.amazonaws.com/thumbs/160/apple/118/wrapped-present_1f381.png",
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('', PostingSchema);
