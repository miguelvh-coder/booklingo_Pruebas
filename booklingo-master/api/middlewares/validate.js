
const { validationResult } = require("express-validator");
const status = require('http-status');

const validate = async (req, res, next) => {
    const errors = validationResult(req, { strictParams: true });

    if (!errors.isEmpty()) {
        return res.status(status.UNPROCESSABLE_ENTITY).json(errors)
    }

    next();
}

module.exports = validate;