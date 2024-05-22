
const status = require('http-status');

const AppError = require('../utils/AppError');
const bookService = require('../services/book.service');


const findBooks = async (req, res) => {
    // Extract author, editorial, genre, pubDate and title
    const { title, startPubDate, endPubDate, genre, editorial, author, user, showDeleted } = req.query;

    const books = await bookService.findBooks(
        title,
        startPubDate,
        endPubDate,
        genre,
        editorial,
        author,
        user,
        showDeleted
    );

    res.status(status.OK).send(books);
}

const findBookById = async (req, res) => {
    const { bookId } = req.params;
    const { showDeleted } = req.query;

    const book = await bookService.findBookById(bookId, showDeleted);

    if (book == null && !book?.isDeleted)
        throw new AppError(`Book with id '${bookId}' dosen't exists`, status.NOT_FOUND);

    res.status(status.OK).send(book);
}


const createBook = async (req, res) => {
    const { userId } = req.decodeToken;

    const book = await bookService.createBook(userId, req.body);

    res.status(status.CREATED).send(book);
}

const updateBook = async (req, res) => {
    const { userId } = req.decodeToken;
    const { bookId } = req.params;

    const book = await bookService.updateBook(bookId, userId, req.body);

    res.status(status.OK).send(book);
}

const deleteBook = async (req, res) => {
    const { userId } = req.decodeToken;
    const { bookId } = req.params;

    const book = await bookService.deleteBook(bookId, userId);

    res.status(status.OK).send(book);
}

module.exports = {
    findBooks,
    findBookById,
    createBook,
    updateBook,
    deleteBook
}