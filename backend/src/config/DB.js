import mongoose from "mongoose";

const database = async () => {
    try {
        const connectionInstance = await mongoose.connect(process.env.MONGO_URI);
        console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
        return true;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        return false;
    }
}

export const isDbConnected = () => mongoose.connection.readyState === 1;

export default database;

