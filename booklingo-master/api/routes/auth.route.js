const express = require('express');

const authController = require('../controllers/auth.controller');
const authValidations = require('../validations/auth.validation');

const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Create a new user
router.post(
    '/register',
    [authValidations.register, validate],
    catchError(authController.register)
);

// Login a user
router.post(
    '/login',
    [authValidations.login, validate],
    catchError(authController.login)
);


module.exports = router;