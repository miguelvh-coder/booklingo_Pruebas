const express = require('express');

const orderController = require('../controllers/order.controller');
const orderValidation = require('../validations/order.validations');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Get all order and filter (should i filter by created/recived??)
router.get(
    "/",
    [orderValidation.findOrder, validate, catchError(auth)],
    catchError(orderController.findOrder)
);

// Get order by Id 
router.get(
    "/:orderId",
    [orderValidation.orderId, validate, catchError(auth)],
    catchError(orderController.findOrderById)
)

// Create a order given a userId and list of BookId
router.post(
    "/",
    [orderValidation.createOrder, validate, catchError(auth)],
    catchError(orderController.createOrder)
)

// Update status 

router.patch(
    "/:orderId/",
    [orderValidation.orderId, orderValidation.updateOrder, validate, catchError(auth)],
    catchError(orderController.updateOrderStatus)
)

// Delete?

module.exports = router;