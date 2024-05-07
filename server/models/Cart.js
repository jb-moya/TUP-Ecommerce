import mongoose from "mongoose";

const CartItemSchema = mongoose.Schema({
    variation: {
        type: mongoose.Schema.ObjectId,
        ref: "ProductVariation",
        required: false,
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true,
    },
    },
    { timestamps: true }
)

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "Customer",
        required: true,
    },
    orderItems: [CartItemSchema],
    },
    { timestamps: true }
)

export default mongoose.model("Cart", CartSchema);