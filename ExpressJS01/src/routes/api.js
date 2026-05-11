const express = require('express');
const { createUser, handleLogin, getUser, getAccount, handleForgotPassword } = require('../controllers/userController');
const auth = require('../middleware/auth');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

// Bỏ cặp dấu nháy kép "", sử dụng trực tiếp RegExp /.*/
routerAPI.all(/.*/, auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);
routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);
routerAPI.post("/forgot-password", handleForgotPassword);

module.exports = routerAPI;