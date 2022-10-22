const mongoose = require('mongoose');

enum userRole {
    Admin = 0,
    Writer = 1,
    Reader = 2
};

enum contentType {
    Text = 0,
    Image = 1,
    Video = 2
};

enum contentColumn {
    Left = 0, 
    Middle = 1,
    Right = 2
};

const userSchema = new mongoose.Schema({
    userID: Number,
    name: String,
    email: String,
    profilePicture: String, // String -- maybe imgr
    role: userRole,
    submissions: Array<Number>
});

const contentSchema = new mongoose.Schema({
    userID: Number,
    contentID: Number,
    title: String,
    author: String,
    nodeType: contentType,
    textContent: String,
    imgContent: String, // imgr
    vidConent: String, //youtube?
    column: contentColumn,
    dateCreated: Date,
    lastUpdated: Date
});

export {userSchema, contentSchema}