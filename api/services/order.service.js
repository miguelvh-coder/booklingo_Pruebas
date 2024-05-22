const Order = require('../models/order.model');

const AppError = require('../utils/AppError');
const status = require('http-status');

const userSerive = require('./user.service');
const bookService = require('./book.service');

const createOrder = async (userId, booksId) => {
    const orderCreator = await userSerive.findUserbyId(userId);

    if (orderCreator == null)
        throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);


    const books = [];
    let orderReceiver = null;

    for (let bookId of booksId) {
        const book = await bookService.findBookById(bookId);

        if (book == null)
            throw new AppError(`Book with bookId '${bookId}' not found`, status.NOT_FOUND);

        if (orderReceiver == null) {
            orderReceiver = await userSerive.findUserbyId(book.user);
            console.log(orderReceiver);
            if (orderReceiver == null)
                throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);
        } else if (!book.user.equals(orderReceiver._id)) {
            throw new AppError(`All book owner should be the same.`, status.UNPROCESSABLE_ENTITY);
        }

        books.push(book);
    }

    return await Order.create({ orderCreator, orderReceiver, books });
}

const findOrderById = async (orderId, userId) => {
    const user = await userSerive.findUserbyId(userId);

    if (user == null)
        throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);

    const order = await Order.findById(orderId);

    if (order == null)
        throw new AppError(`Order with userId '${orderId}' dosen't exists`, status.NOT_FOUND);

    if (!(user._id.equals(order.orderCreator) || user._id.equals(order.orderReceiver)))
        throw new AppError(`Who you are and why are you looking for a order it's not yours? '${userId}'`, status.FORBIDDEN);

    return order;
}

const findOrder = async (
    userId,
    orderStatus = null,
    startcreatedDate = null,
    endcreatedDate = null,
    userRol = null,
) => {

    const user = await userSerive.findUserbyId(userId);
    // User not found
    if (user == null)
        throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);

    const filter = {};

    if (orderStatus)
        filter.status = orderStatus;

    if (startcreatedDate && endcreatedDate) {
        console.log(startcreatedDate, endcreatedDate);

        filter.createdAt = {
            $gte: startcreatedDate,
            $lte: endcreatedDate
        };
    } else if (startcreatedDate) {
        console.log(startcreatedDate);

        filter.createdAt = { $gte: startcreatedDate };
    } else if (endcreatedDate) {
        console.log(endcreatedDate);

        filter.createdAt = { $lte: endcreatedDate };
    }

    if (userRol)
        filter[userRol] = userId;
    else
        filter.$or = [{ orderCreator: userId }, { orderReceiver: userId }];

    return await Order.find(filter);
}

const updateOrderStatus = async (orderId, userId, orderStatus) => {
    const user = await userSerive.findUserbyId(userId);
    const order = await Order.findById(orderId);

    // User not found
    if (user == null)
        throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);

    // Order not found
    if (order == null)
        throw new AppError(`Order with orderId '${orderId}' dosen't exists`, status.NOT_FOUND);

    if (order.status == "COMPLETED" || order.status == "CANCELED")
        throw new AppError(`Order with orderId '${orderId}' is already cancelled or completed. Can't modify`, status.UNPROCESSABLE_ENTITY);

    // The user should be either the order creator or the order reciver 
    if (!(user._id.equals(order.orderCreator) || user._id.equals(order.orderReceiver)))
        throw new AppError(`Who you are and why are you looking for a order it's not yours? '${userId}'`, status.FORBIDDEN);

    if (orderStatus == "COMPLETED") {
        if (user._id.equals(order.orderCreator)) {
            // If the user is the order creator
            // They only have permision to change the status to CANCELED

            throw new AppError(`You have no permisions for completing the order '${userId}'`, status.FORBIDDEN);

        } else if (user._id.equals(order.orderReceiver)) {

            if (order.status == "COMPLETED")
                throw new AppError(`Order ${orderId} is already COMPLETED`, status.BAD_REQUEST);

            // If the user is the order reciver and want to change the status to "COMPLETED"
            // All books should be marke as deleted 

            // However, we must to check this books still existing
            // The owner may have deleted them
            // Or sell them 
            const books = await Promise.all(order.books.map(async (bookId) => {
                const book = await bookService.findBookById(bookId);
                if (book == null)
                    throw new AppError(`Book '${bookId}' dosen't exists or has been eliminated`, status.NOT_FOUND);

                return book;
            }));

            // After confirmirn all books exists
            // Let's mark tem a deleted 
            await Promise.all(books.map(async (book) => await bookService.deleteBook(book._id, user._id)));
        }
    }
    return await Order.findByIdAndUpdate(orderId, { status: orderStatus });
}

module.exports = {
    createOrder,
    findOrderById,
    findOrder,
    updateOrderStatus
}