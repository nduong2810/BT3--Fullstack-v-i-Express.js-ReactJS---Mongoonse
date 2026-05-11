import axios from './axios.customize.js';

const createUserApi = (name, email, password) => { return axios.post("/v1/api/register", { name, email, password }); }
const loginApi = (email, password) => { return axios.post("/v1/api/login", { email, password }); }
const getUserApi = () => { return axios.get("/v1/api/user"); }
const forgotPasswordApi = (email, newPassword) => {
    const URL_API = "/v1/api/forgot-password";
    const data = { email, newPassword };
    return axios.post(URL_API, data);
}

export { createUserApi, loginApi, getUserApi, forgotPasswordApi }
