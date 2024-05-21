const status = require('http-status');

const AppError = require('../utils/AppError');
const orderService = require('../services/order.service');

const createOrder = async (req, res) => {
    const { userId } = req.decodeToken;
    const { books: booksId } = req.body;

    const order = await orderService.createOrder(userId, booksId);

    res.status(status.CREATED).send(order);
}

const findOrderById = async (req, res) => {
    const { orderId } = req.params;
    const { userId } = req.decodeToken;

    const order = await orderService.findOrderById(orderId, userId);

    res.status(status.OK).send(order);
}

const findOrder = async (req, res) => {
    const {
        orderStatus,
        startcreatedDate,
        endcreatedDate,
        userRol
    } = req.query;

    const { userId } = req.decodeToken;

    const orders = await orderService.findOrder(
        userId,
        orderStatus,
        startcreatedDate,
        endcreatedDate,
        userRol
    );

    res.status(status.OK).send(orders);
}


const updateOrderStatus = async (req, res) => {
    const { userId } = req.decodeToken;
    const { orderId } = req.params;
    const { status: orderStatus } = req.body;

    const order = await orderService.updateOrderStatus(orderId, userId, orderStatus);
    res.status(status.OK).send(order);
}

module.exports = {
    createOrder,
    findOrderById,
    findOrder,
    updateOrderStatus
}