
const { param, body, query, checkExact } = require("express-validator");

const commonValitations = {
    "showDeleted": [
        query("showDeleted").default(false).toBoolean()
    ]
}

const authValidations = {
    "register": [
        body("name")
            .isString().optional({ nullable: true }),
        body("email")
            .exists().withMessage("Email is required")
            .isEmail().withMessage("Provide valid email"),
        body("password")
            .exists().withMessage("Password is required")
            .isString().withMessage("Password should be string")
            .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
        checkExact([], { message: 'Too many fields specified' })
    ],
    "login": [
        body("email")
            .exists().withMessage("Email is required")
            .isEmail().withMessage("Provide valid email"),
        body("password")
            .exists().withMessage("Password is required")
            .isString().withMessage("Password should be string")
            .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
        checkExact([], { message: 'Too many fields specified' })
    ]
}

const userValidation = {
    "userId": [
        param("userId").isMongoId().withMessage("userID is not a valid ID")
    ],
    "update": [
        body("name")
            .isString().optional({ nullable: true }),
        body("email")
            .optional({ nullable: true })
            .isEmail().withMessage("Provide valid email"),
        body("password")
            .optional({ nullable: true })
            .isString().withMessage("Password should be string")
            .isLength({ min: 7 }).withMessage("Password should be at least 7 characters"),
        checkExact([], { message: 'Too many fields specified' })
    ]
};

const bookValidation = {
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

const orderValidation = {
    "createOrder": [
        body("books")
            .exists().withMessage("an array is required.")
            .isArray({ min: 1 }).withMessage("An array of at least one element is required."),
        body("books.*")
            .isMongoId().withMessage("All element should be Mongo ids.")
    ],
    "orderId": [
        param("orderId")
            .isMongoId().withMessage("orderId is not a mongoId")
    ],
    "findOrder": [
    ]
}

module.exports = {
    commonValitations,
    authValidations,
    userValidation,
    bookValidation,
    orderValidation,
}