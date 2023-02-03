import { model, Schema } from "mongoose";
import IContent from "../types/IContent";

// enum contentType {
//     Text = 0,
//     Image = 1,
//     Video = 2,
// }

// enum contentColumn {
//     Left = 0,
//     Middle = 1,
//     Right = 2,
// }

const contentSchema = new Schema({
    userID: {
        type: Number,
        required: true,
    },
    contentID: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    nodeType: {
        // type: contentType,
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    column: {
        // type: contentColumn,
        type: String,
        required: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now,
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});

export const Content = model<IContent>("Content", contentSchema);
