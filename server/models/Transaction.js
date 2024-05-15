import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"],
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: [true, "Cart is required"],
    },
    variation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ProductVariation",
    },
    quantity: {
        type: Number,
        required: [true, "Quantity is required"],
    },
    totalAmount: {
        type: Number,
        required: [true, "Total amount is required"],
    },
    shippingMethod: {
        type: String,
        required: [true, "Payment method is required"],
    },
    paymentMethod: {
        type: String,
        required: [true, "Payment method is required"],
    },
    shippingAddress: {
        type: String,
        required: [true, "Shipping address is required"],
    },
    orderStatus: {
        type: String,
        enum: ["To Pay", "To Ship", "To Recieve", "Completed", "Cancelled"],
        default: "To Pay",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Transaction = mongoose.model("Transaction", transactionSchema);
