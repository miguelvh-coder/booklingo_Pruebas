const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        validate(value) {
            return validator.isEmail(value);
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128,
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);