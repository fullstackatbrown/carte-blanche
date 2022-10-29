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
    userID: {
        type: Number,
        required: true
    },
    contentID: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    nodeType: {
        type: contentType,
        required: true
    },
    textContent: {
        type: String,
        required: false
    },
    imgContent: {
        type: String,
        required: false
    },
    vidContent: {
        type: String,
        required: false
    },
    column: {
        type: contentColumn,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

export const User = model("User", userSchema);
export const Content = model("Content", contentSchema);