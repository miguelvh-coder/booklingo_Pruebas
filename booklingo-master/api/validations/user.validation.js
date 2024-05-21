
const { param, body, query, checkExact } = require("express-validator");

const userValidation = {
    "showDeleted": [
        query("showDeleted").default(false).toBoolean()
    ],
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
    ],
    "tooMany": [
        checkExact([], { message: 'Too many fields specified' })
    ]
};

module.exports = userValidation;