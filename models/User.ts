import mongoose, { model, Schema } from "mongoose";
import IUser from "../types/IUser";

export enum Role {
    Admin = 0,
    Writer = 1,
    Reader = 2,
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Role,
        default: Role.Reader,
    },
    submissions: {
        type: [Schema.Types.ObjectId],
        ref: "Content",
        default: [],
    },
});

// export const User = model<IUser>("users", UserSchema);
export default mongoose.models.User || model<IUser>("User", UserSchema);
