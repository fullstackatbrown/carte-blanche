import mongoose, { model, Schema } from "mongoose";
import IContent, { nodeTypes } from "../types/IContent";

const contentSchema = new Schema({
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
    caption: {
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

export default mongoose.models.Content ||
    model<IContent>("Content", contentSchema);
