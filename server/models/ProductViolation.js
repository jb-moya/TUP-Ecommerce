import mongoose from "mongoose";

const productViolationSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Organization",
        required: true,
    },
    violationType: {
        type: String,
        required: true,
    },
    violationReason: {
        type: String,
        required: true,
    },
    suggestion: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const ProductViolation = mongoose.model(
    "ProductViolation",
    productViolationSchema
);
