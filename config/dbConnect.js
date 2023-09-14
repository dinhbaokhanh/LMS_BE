import mongoose from "mongoose";

const dbConnect = () => {
    try {
        const connection = mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected");
    } catch (error) {
        console.error(error);
    }
}

export default dbConnect;