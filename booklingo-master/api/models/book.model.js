const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
    },
    editorial: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        requied: true
    },
    pubDate: {
        type: Date,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('Book', bookSchema);