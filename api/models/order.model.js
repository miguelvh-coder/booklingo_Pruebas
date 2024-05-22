const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    orderCreator: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    orderReceiver: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        enum: ['IN PROGRESS', 'CANCELED', 'COMPLETED'],
        default: 'IN PROGRESS'
    },
    books: [{
        type: mongoose.Types.ObjectId,
        ref: "Book"
    }]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
