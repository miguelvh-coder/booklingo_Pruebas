
const { param, body, query, checkExact } = require("express-validator");

const bookValidation = {
    "showDeleted": [
        query("showDeleted").default(false).toBoolean()
    ],
    "bookId": [
        param("bookId")
            .isMongoId()
            .withMessage("bookId is not a valid ID")
    ],
    "findBook": [
        query("title")
            .isString().optional({ nullable: true }),
        query("startPubDate")
            .toDate().optional({ nullable: true }),
        query("endPubDate")
            .toDate().optional({ nullable: true }),
        query("genre")
            .isString().optional({ nullable: true }),
        query("editorial")
            .isString().optional({ nullable: true }),
        query("author")
            .isString().optional({ nullable: true }),
        query("user")
            .isMongoId().optional({ nullable: true }),
        checkExact([], { message: 'Too many fields specified' })
    ],
    "createBook": [
        body("title")
            .isString()
            .exists().withMessage("Title is required"),
        body("pubDate")
            .isString()
            .exists().withMessage("pubDate is required"),
        body("genre")
            .isString()
            .exists().withMessage("genre is required"),
        body("editorial")
            .isString()
            .exists().withMessage("editorial is required"),
        body("author")
            .isString()
            .exists().withMessage("author is required"),
        checkExact([], { message: 'Too many fields specified' })
    ],
    "updateBook": [
        body("title")
            .isString()
            .optional({ nullable: true }),
        body("pubDate")
            .isString()
            .optional({ nullable: true }),
        body("genre")
            .isString()
            .optional({ nullable: true }),
        body("editorial")
            .isString()
            .optional({ nullable: true }),
        body("author")
            .isString()
            .optional({ nullable: true }),
        checkExact([], { message: 'Too many fields specified' })
    ]
}

module.exports = bookValidation;