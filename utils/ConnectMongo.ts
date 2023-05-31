import mongoose from "mongoose";

const ConnectMongo = async () => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return;
    }
    // Use new db connection
    mongoose.connect(process.env.MONGODB_URI!);
};

export default ConnectMongo;
