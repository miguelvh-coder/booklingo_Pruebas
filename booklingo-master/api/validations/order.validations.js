
const { param, body, query, checkExact } = require("express-validator");

const orderValidation = {
    "createOrder": [
        body("books")
            .exists().withMessage("an array is required.")
            .isArray({ min: 1 }).withMessage("An array of at least one element is required."),
        body("books.*")
            .isMongoId().withMessage("All element should be Mongo ids."),
        checkExact([], { message: 'Too many fields specified' })
    ],
    "orderId": [
        param("orderId")
            .isMongoId().withMessage("orderId is not a mongoId")
    ],
    "findOrder": [
        query("orderStatus")
            .optional({ nullable: true })
            .isString()
            .isIn(["IN PROGRESS", "COMPLETED", "CANCELLED"])
            .withMessage("orderStatus whould be IN PROGRESS, COMPLETED or CANCELLED"),
        query("startPubDate")
            .toDate().optional({ nullable: true }),
        query("endPubDate")
            .toDate().optional({ nullable: true }),
        query("userRol")
            .optional({ nullable: true })
            .isString()
            .isIn(["orderCreator", "orderReceiver"])
            .withMessage("orderStatus whould be orderCreator or orderReceiver")
    ],
    "updateOrder": [
        body("status")
            .exists()
            .withMessage("New status is required")
            .isString()
            .isIn(["IN PROGRESS", "COMPLETED", "CANCELLED"])
            .withMessage("orderStatus whould be IN PROGRESS, COMPLETED or CANCELLED"),
    ]
}

module.exports = orderValidation;