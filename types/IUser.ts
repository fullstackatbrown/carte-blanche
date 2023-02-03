export default interface IUser {
    _id?: string;
    name: string;
    email: string;
    image: string; // probably a link to profile pic provided by Google
    // role?: userRole;
    role?: string;
    submissions: any[];
}
