import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    total: {
        type: Number,
        required: [true, "Total is required"],
    },

});

export default mongoose.model("Order", orderSchema);