import { model, Schema } from "mongoose";

enum userRole {
    Admin = 0,
    Writer = 1,
    Reader = 2,
}

const userSchema = new Schema({
    userID: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: true,
    },
    role: {
        type: userRole,
        default: userRole.Reader,
    },
    submissions: {
        type: Array<Schema.Types.ObjectId>,
        ref: "Content",
    },
});

export interface IUser {
    _id?: string;
    userID: number;
    name: string;
    email: string;
    profilePicture: string; // probably a link to profile pic provided by Google
    role?: userRole;
    submissions: any[];
}

export const User = model<IUser>("User", userSchema);
