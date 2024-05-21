
const status = require('http-status');

const userService = require('../services/user.service');
const authService = require('../services/auth.service');
const jwtService = require('../services/token.service');

const register = async (req, res) => {
    const { name, email, password } = req.body;

    const user = await userService.createUser({ name, email, password });
    const authToken = await jwtService.generateToken(user._id);

    return res.status(status.CREATED).send({ user, authToken });
}

const login = async (req, res) => {
    const { email, password } = req.body;

    const user = await authService.login(email, password);
    const authToken = await jwtService.generateToken(user._id);

    return res.status(status.OK).send({ user, authToken });
}

module.exports = { register, login, };