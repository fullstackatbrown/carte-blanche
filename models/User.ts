import { Model, model, Schema, connect, PopulatedDoc } from "mongoose";
import * as mongoose from "mongoose";
import { IContent } from "./Content";
import createModel from "./createModel";

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

export interface IUser {
    _id?: string;
    userID: number;
    name: string;
    email: string;
    profilePicture: string; // probably a link to profile pic provided by Google
    // role?: userRole;
    role: "Admin" | "Writer" | "Reader";
    submissions: PopulatedDoc<IContent>[];
}

// interface IUserMethods {
//     getRole(): "Admin" | "Writer" | "Reader";
// }

// type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser>({
    userID: {
        type: Number,
        required: false,
    },
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        required: false,
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

// userSchema.method("getRole", function getRole() {
//     return this.role;
// })

// export const User = model<IUser>("User", userSchema);
// export default User;
console.log("get here 1");
// if (models.User === undefined) {
//     console.log("MODEL USER UNDEFIEND")
// }
// if (model<IUser>("User", userSchema) === undefined) {
//     console.log("user Schema sus")
// }
const User = mongoose.models.User || model<IUser>("User", userSchema);
// module.exports = mongoose.models.User || model<IUser>("User", userSchema);
// export default createModel<IUser, UserModel>("User", userSchema);
console.log("get here 2");
console.log("USER" + User);
export default User;
// const User = (models.User as IUser) || model<IUser>("User", userSchema);
// export { User };
