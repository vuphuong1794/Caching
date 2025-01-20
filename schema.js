import mongoose from "mongoose";

export const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    photo: {
        type: String,
        required: [true, "Please enter photo"],
    },
    price: {
        type: Number,
        required: [true, "Please enter price"],
    },
    stock: {
        type: Number,
        required: [true, "Please enter stock"],
    },
    category: {
        type: String,
        required: [true, "Please enter category"],
        trim: true,
    },
}, { timestamps: true });