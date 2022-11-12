import { model, Schema } from "mongoose";

enum contentType {
    Article = 0,
    Image = 1,
    Video = 2,
}

enum contentColumn {
    Left = 0,
    Middle = 1,
    Right = 2,
}

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
        type: contentType,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    imageDescription: {
        type: String,
        default: "",
    },
    column: {
        type: contentColumn,
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

export interface IContent {
    _id?: string;
    userID: number;
    contentID: number;
    title: string;
    author: any;
    nodeType: contentType;
    content: string;
    imageDescription: string;
    column: contentColumn;
    dateCreated: Date;
    lastUpdated: Date;
}

export const Content = model<IContent>("Content", contentSchema);
