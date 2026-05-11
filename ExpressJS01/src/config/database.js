// require('dotenv').config();
// const mongoose = require('mongoose');
//
// const dbState = [{ value: 0, label: "Disconnected" }, { value: 1, label: "Connected" }, { value: 2, label: "Connecting" }, { value: 3, label: "Disconnecting" }];
//
// const connection = async () => {
//     await mongoose.connect(process.env.MONGO_DB_URL);
//     const state = Number(mongoose.connection.readyState);
//     console.log(dbState.find(f => f.value === state).label, "to database");
// }
// module.exports = connection;

require('dotenv').config();
const { Sequelize } = require('sequelize');

// Khởi tạo kết nối tới MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false // Tắt log các câu lệnh SQL trên terminal cho đỡ rối
    }
);

const connection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to MySQL database successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

// Xuất ra cả hàm connection và biến sequelize để Model sử dụng
module.exports = { connection, sequelize };