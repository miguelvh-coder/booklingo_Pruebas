// Create the secret fot jwt

const crypto = require("crypto");

console.log(crypto.randomBytes(32).toString("hex"));