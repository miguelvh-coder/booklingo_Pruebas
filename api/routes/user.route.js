const express = require('express');

const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');

const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const catchError = require('../utils/catchError');

const router = express.Router();

// Get all users 
router.get(
    "/",
    [userValidation.showDeleted, validate],
    catchError(userController.getAllUsers)
);

// Get one user by id
router.get(
    '/:userId',
    [userValidation.userId, userValidation.showDeleted, userValidation.tooMany, validate],
    catchError(userController.findUserbyId)
);

// Update one user by id (auth required)
router.patch(
    '/',
    [userValidation.update, userValidation.tooMany, validate, catchError(auth)],
    catchError(userController.updateUser)
);

// Delete one user by id (auth required)
router.delete(
    '/',
    [userValidation.tooMany, validate, catchError(auth)],
    catchError(userController.deleteUser)
);

module.exports = router;