export const nodeTypes: string[] = ["text", "image"];

export type NodeType = "text" | "image" | "pdf" | "audio" | "video";

export default interface IContent {
    _id?: string;
    // userID: number;
    // contentID: number;
    title: string;
    author: string;
    // email: string;
    nodeType: string;
    content: string;
    // column: string;
    dateCreated: Date;
    lastUpdated: Date;
}
