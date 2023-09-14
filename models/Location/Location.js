import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    id: String,
    locationCode: {
        type: String,
        required: true
    },
    locationName: {
        type: String,
        required: true,
    },
    locationDetail: {
        type: String,
        required: true
    },
    hotline: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
})

const Location = mongoose.model("Location", locationSchema);
export default Location;