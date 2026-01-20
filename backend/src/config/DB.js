import mongoose from "mongoose";

const database = async () => {
    try {
        const connectionInstence = await mongoose.connect(process.env.MONGO_URI);
        // console.log(`\n MongoDB connected !! DB Host: ${connectionInstence.connection.host}`);
        // console.log(`db connected...`);
    } catch (error) {
        console.log(error);
        console.log("db connection faild")
    }
}

export default database

