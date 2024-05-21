require('dotenv').config();

const status = require('http-status');

const morgan = require("morgan");
const cors = require('cors');
const express = require("express");

const authRoute = require("./api/routes/auth.route");
const userRoute = require("./api/routes/user.route");
const bookRoute = require("./api/routes/book.route");
const ordersRoute = require("./api/routes/order.route");

const logger = require('./api/utils/logger');
const connect = require('./config/connect');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// cors 
app.use(cors());
app.options('*', cors());

// Enable morgan 
app.use(morgan((NODE_ENV == 'development') ? 'common' : 'dev'));

// 'Hello world' route
app.get("/", (req, res) => {
    res.json({ method: req.method, message: "Hello World", ...req.body });
});

// routes 
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/book', bookRoute);
app.use('/order', ordersRoute);


// Error handeling
app.use((error, req, res, next) => {
    if (error.status)
        logger.warn(`User error | ${error.message}`);
    else
        logger.error(`Server error | ${error.message} \n${error.stack}`);

    return res
        .status(error.status || status.INTERNAL_SERVER_ERROR)
        .send({ "Error": error.message })
});

app.listen(PORT, async () => {
    // Open mongo connection 
    const connection = await connect();

    const hyperLink = (text, link) => `\x1b]8;;${link}\x1b\\${text}\x1b[0m\x1b]8;;\x1b\\`;
    const serverURL = `http://localhost:${PORT}`;

    logger.info(`Server is running on \x1b[36m${hyperLink(serverURL, serverURL)}`);
});