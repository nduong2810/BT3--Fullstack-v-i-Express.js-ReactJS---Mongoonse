// const mongoose = require('mongoose');
//
// const userSchema = new mongoose.Schema ({
//     name: String,
//     email: String,
//     password: String,
//     role: String,
// });
//
// const User = mongoose.model('user', userSchema);
// module.exports = User;

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
    // MySQL dùng 'id' tự tăng làm khóa chính thay vì '_id' của Mongo
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users',
    timestamps: true // Tự động tạo cột createdAt và updatedAt
});

// Lệnh này giúp tự động tạo bảng 'users' trong MySQL nếu nó chưa tồn tại
User.sync();

module.exports = User;