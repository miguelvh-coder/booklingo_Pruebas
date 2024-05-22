const express = require('express');

const bookController = require('../controllers/book.controller');
const bookValidation = require('../validations/book.validation');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Get all users. Optional filters: genre, pubDate (range), editorial, author adn title 
router.get(
    "/",
    [bookValidation.showDeleted, bookValidation.findBook, validate],
    catchError(bookController.findBooks)
);

// Get one book by id 
router.get(
    "/:bookId",
    [bookValidation.showDeleted, bookValidation.bookId, validate],
    catchError(bookController.findBookById)
);

// Create a book (auth required)
router.post(
    "/",
    [bookValidation.createBook, validate, catchError(auth)],
    catchError(bookController.createBook)
);

// Update one book by id (auth required)
router.patch(
    "/:bookId",
    [bookValidation.bookId, bookValidation.updateBook, validate, catchError(auth)],
    catchError(bookController.updateBook)
);

// Delete one book by id (auth required)
router.delete(
    "/:bookId",
    [bookValidation.bookId, validate, catchError(auth)],
    catchError(bookController.deleteBook)
);


module.exports = router;

