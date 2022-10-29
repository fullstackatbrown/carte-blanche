import { model, Schema } from 'mongoose';

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

const userSchema = new Schema({
    userID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        required: true
    },
    role: {
        type: userRole,
        default: userRole.Reader
    },
    submissions: {
        type: Array<Schema.Types.ObjectId>,
        ref: "Content"
    }
});

const contentSchema = new Schema({
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

export const User = model("User", userSchema);
export const Content = model("Content", contentSchema);