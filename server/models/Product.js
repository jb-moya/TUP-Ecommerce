import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        maxlength: [40, "Name cannot be more than 40 characters"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],

    },
    description: {
        type: String,
        required: [true, "Description is required"],
        maxlength: [200, "Description cannot be more than 200 characters"],
    },
});

export default mongoose.model("Product", productSchema);
