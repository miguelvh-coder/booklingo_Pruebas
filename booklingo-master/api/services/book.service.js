const Book = require('../models/book.model');

const userService = require('../services/user.service');

const AppError = require('../utils/AppError');
const status = require('http-status');


const findBooks = async (
    title,
    startPubDate,
    endPubDate,
    genre,
    editorial,
    author,
    user,
    showDeleted = false
) => {


    const filter = {};

    if (!showDeleted) filter.isDeleted = false;

    if (startPubDate && endPubDate) {
        filter.pubDate = {
            $gte: startPubDate,
            $lte: endPubDate
        };
    } else if (startPubDate) {
        filter.pubDate = { $gte: startPubDate };
    } else if (endPubDate) {
        filter.pubDate = { $lte: endPubDate };
    }

    if (title) filter.title = { $regex: new RegExp(title, "i") };

    if (genre) filter.genre = { $regex: new RegExp(genre, "i") };;

    if (editorial) filter.editorial = { $regex: new RegExp(editorial, "i") };

    if (author) filter.author = { $regex: new RegExp(author, "i") };

    if (user) filter.user = { $eq: user };

    const books = await Book.find(filter);

    return books;
};

const findBookById = async (bookId, showDeleted = false) => {
    const book = await Book.findById(bookId);

    if (book != null && (showDeleted || !book?.isDeleted)) return book;
};

const createBook = async (userId, bookData) => {
    const user = await userService.findUserbyId(userId);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    const book = await Book.create({
        user, ...bookData
    });

    return book;
}

const updateBook = async (bookId, userId, bookData) => {
    const book = await Book.findById(bookId);
    const user = await userService.findUserbyId(userId);

    if (book == null && !book?.isDeleted)
        throw new AppError(`Book with id '${bookId}' dosen't exists`, status.NOT_FOUND);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    if (!user._id.equals(book.user))
        throw new AppError(`You are not userId = '${book.user}'. Get out!`, status.FORBIDDEN);

    return await Book.findByIdAndUpdate(bookId, bookData);
}

const deleteBook = async (bookId, userId) => {
    const book = await Book.findById(bookId);
    const user = await userService.findUserbyId(userId);

    if (book == null && !book?.isDeleted)
        throw new AppError(`Book with id '${bookId}' dosen't exists`, status.NOT_FOUND);

    if (user == null && !user?.isDeleted)
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    if (!user._id.equals(book.user))
        throw new AppError(`You are not userId = '${book.user}'. Get out!`, status.FORBIDDEN);

    return await Book.findByIdAndUpdate(bookId, { "isDeleted": true });
}

module.exports = {
    findBooks,
    findBookById,
    createBook,
    updateBook,
    deleteBook
}