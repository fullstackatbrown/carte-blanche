import { model, Schema, models } from "mongoose";

// export enum userRole {
//     // Admin = 0,
//     // Writer = 1,
//     // Reader = 2,
//     Admin = "Admin",
//     Writer = "Writer",
//     Reader = "Reader",
//     // values = [0, 1, 2],
//     // message: 'User '
// }

export const userSchema = new Schema({
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
        // type: userRole,
        type: String,
        // default: userRole.Reader,
        default: "Reader",
        // enum: Object.values(userRole),
        enum: ["Admin", "Writer", "Reader"],
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
    // role?: userRole;
    role: "Admin" | "Writer" | "Reader";
    submissions: any[];
}

export const User = model<IUser>("User", userSchema);
// export default User;
// export const User = models.User || model<IUser>("User", userSchema);
// const User = (models.User as IUser) || model<IUser>("User", userSchema);
// export { User };
