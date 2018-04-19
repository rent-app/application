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
      index: false,
    },
    condition: {
      type: Number,
      min: 0,
      max: 5,
      default: 3,
      index: false,
    },
    price: {
      type: Number,
      min: 0,
      default: 0,
      index: false,
    },
    description: {
        type: String,
        index: false,
    },
    location: {
        type: String,
        index: false,
    },
    available: {
        type: Boolean,
        default: false,
        index: false,
    },
    id_posting: {
        type: Number,
        unique: true,
        index: true,
    },
    id_member: {
        type: Number,
        unique: false,
        index: false,
    },
// image should be a URL link to image
    image: {
        type: String,
        default: "https://emojipedia-us.s3.amazonaws.com/thumbs/160/apple/118/wrapped-present_1f381.png",
        index: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        index: false,
    },
});

module.exports = mongoose.model('Posting', PostingSchema);
