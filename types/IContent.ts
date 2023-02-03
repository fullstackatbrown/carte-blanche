export default interface IContent {
    _id?: string;
    userID: number;
    contentID: number;
    title: string;
    author: any;
    nodeType: string;
    content: string;
    column: string;
    dateCreated: Date;
    lastUpdated: Date;
}
