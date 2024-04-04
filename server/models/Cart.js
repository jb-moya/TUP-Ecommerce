import mongoose from "mongoose";

const CartItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    sku: {
        type: String,
        default: '',
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
    checked: {
        type: Boolean,
        default: false,
    },
    _id: false
    },
    { timestamps: true }
)

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [CartItemSchema],
    },
    { timestamps: true }
)

export default mongoose.model("Cart", CartSchema);