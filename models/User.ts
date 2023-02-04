import mongoose, { model, Schema } from "mongoose";
import IUser from "../types/IUser";

export enum Role {
    admin = 0,
    writer = 1,
    reader = 2,
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

// import Adapters from "next-auth/adapters";

// // Extend the built-in models using class inheritance
// export default class User extends Adapters.TypeORM.Models.User.model {
//     // You can extend the options in a model but you should not remove the base
//     // properties or change the order of the built-in options on the constructor
//     constructor(name, email, image, emailVerified) {
//         super(name, email, image, emailVerified);
//     }
// }

// export const UserSchema = {
//     name: "User",
//     target: User,
//     columns: {
//         ...Adapters.TypeORM.Models.User.schema.columns,
//         // Adds a phoneNumber to the User schema
//         phoneNumber: {
//             type: "varchar",
//             nullable: true,
//         },
//     },
// };
