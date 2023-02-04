import mongoose from "mongoose";

const ConnectMongo = async () => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        console.log("Using current MongoDB connection");
        return;
    }
    // Use new db connection
    console.log("Using new MongoDB connection");
    mongoose.connect(process.env.MONGODB_URI!);
};

export default ConnectMongo;