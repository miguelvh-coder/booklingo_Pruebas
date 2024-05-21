require('dotenv').config();

const mongoose = require('mongoose');
const status = require('http-status');

const AppError = require('../api/utils/AppError');

const connect = async () => {
    const uri = process.env.MONGO_URI;
    const db = process.env.MONGO_DB;
    // console.log(uri + "/" + db);

    await mongoose.connect(uri + "/" + db)
        .then(async () => {
            console.log('Mongo connection success');
        })
        .catch(error => {
            throw new AppError("Mongo connection fail");
        });
    return mongoose.connection;
}

module.exports = connect;