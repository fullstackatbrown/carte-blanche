const mongoose = require('mongoose');

enum userRole {
    Admin = 0,
    Writer = 1
};

const userSchema = new mongoose.Schema({
    userID: Number,
    name: String,
    email: String,
    profilePicture: String, // String -- maybe imgr
    role: userRole,
    submissions: Array<Number>
})