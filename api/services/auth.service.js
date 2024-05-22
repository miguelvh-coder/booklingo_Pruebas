const bcrypt = require('bcrypt');

const AppError = require('../utils/AppError');
const status = require('http-status');
const userService = require('./user.service');

const login = async (email, password) => {
    const user = await userService.findUserbyEmail(email);

    if (!user) {
        throw new AppError(`User with email '${email}' dosen't exists`, status.NOT_FOUND);
    }

    if (bcrypt.compareSync(password, user.password)) {
        return user;
    } else {
        throw new AppError(`Wrong password`, status.UNAUTHORIZED);
    }
}


module.exports = {
    login
};