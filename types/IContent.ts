export const nodeTypes: string[] = ["text", "image"];

export type NodeType = "text" | "image" | "pdf" | "audio" | "video";

export default interface IContent {
    _id?: string;
    title: string;
    author: string;
    nodeType: string;
    imageContent: string;
    caption: string;
    textContent: string;
    dateCreated: Date;
    lastUpdated: Date;
}
