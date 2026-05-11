const { createUserService, loginService, getUserService, updatePasswordService } = require("../services/userService");

const handleForgotPassword = async (req, res) => {
    const { email, newPassword } = req.body;
    const data = await updatePasswordService(email, newPassword);
    return res.status(200).json(data);
}
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    const data = await createUserService(name, email, password);
    return res.status(200).json(data)
}
const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    return res.status(200).json(data)
}
const getUser = async (req, res) => {
    const data = await getUserService();
    return res.status(200).json(data)
}
const getAccount = async (req, res) => { return res.status(200).json(req.user) }

module.exports = { createUser, handleLogin, getUser, getAccount, handleForgotPassword }