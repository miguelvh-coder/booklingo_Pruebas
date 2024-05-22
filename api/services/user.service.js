const User = require('../models/user.model');

const AppError = require('../utils/AppError');
const status = require('http-status');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const createUser = async (userData) => {
    const user = await findUserbyEmail(userData.email);

    if (user != null)
        throw new AppError(`User with email '${userData.email}' already exists`, status.CONFLICT);

    userData.password = bcrypt.hashSync(userData.password, SALT_ROUNDS);
    return await User.create(userData);
}

const findAllUser = async (showDeleted = false) => {
    if (showDeleted) return await User.find();
    else return await User.find({ isDeleted: false });
}

const findUserbyEmail = async (email) => {
    const user = await User.findOne({ email, isDeleted: false });

    if (user != null) return user;
}

const findUserbyId = async (userId, showDeleted = false) => {
    const user = await User.findById(userId);

    if (user != null && (showDeleted || !user?.isDeleted)) return user;
}

const updateUser = async (userId, userData) => {

    if (await findUserbyId(userId) == null) // Check if user exist 
        throw new AppError(`User with id '${userId}' dosen't exists`, status.NOT_FOUND);

    if ("email" in userData) { // check if email will change and if email is avilable
        const user = await findUserbyEmail(userData.email);
        if (user != null && user._id != userId)
            throw new AppError(`User with email '${userData.email}' already exists`, status.CONFLICT);
    }

    if ('password' in userData) // check if passwords will change and hash it 
        userData.password = bcrypt.hashSync(userData.password, SALT_ROUNDS);

    return await User.findByIdAndUpdate(userId, userData);
}

const deleteUser = async (userId) => {

    if (await findUserbyId(userId) == null) // Check if user exist 
        throw new AppError(`User with userId '${userId}' dosen't exists`, status.NOT_FOUND);

    return await User.findByIdAndUpdate(userId, { "isDeleted": true });
}

module.exports = {
    findAllUser,
    findUserbyId,
    findUserbyEmail,
    createUser,
    updateUser,
    deleteUser,
};
