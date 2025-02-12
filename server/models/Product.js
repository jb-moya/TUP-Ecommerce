import mongoose from "mongoose";
import { ProductViolation } from "./ProductViolation.js";

const productCategories = [
    "Electronics",
    "Clothing",
    "Shoes",
    "Books",
    "Beauty",
    "Health",
    "Home",
    "Garden",
    "Toys",
    "Sports",
    "Outdoors",
    "Groceries",
    "Accessories",
    "Gaming",
    "Handmade",
    "Other",
];

const productVariationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Option is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
    },
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
            maxlength: [40, "Name cannot be more than 40 characters"],
        },
        price: {
            type: Number,
            default: -1,
        },
        stock: {
            type: Number,
        },
        variationClass: {
            type: String,
            default: "",
        },
        featured: {
            type: Boolean,
            default: false,
        },
        description: {
            type: String,
            required: [true, "Please provide product description"],
            maxlength: [
                10000,
                "Description cannot be more than 400 characters",
            ],
        },
        variation: {
            type: [productVariationSchema],
            default: [],
        },
        category: {
            type: String,
            required: [true, "Please select a category"],
            enum: {
                values: productCategories,
                message: "{VALUE} is not valid category",
            },
        },
        soldCount: {
            type: Number,
            default: 0,
        },
        averageRating: {
            type: Number,
            default: 0,
        },
        numOfReviews: {
            type: Number,
            default: 0,
        },
        image: {
            type: [String],
            default: [],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        productStatus: {
            type: String,
            enum: ["enabled", "disabled", "pending"],
            default: "pending",
        },
        hasViolation: {
            type: Boolean,
            default: false,
        },
        violation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductViolation",
            default: null,
        },
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
export const ProductVariation = mongoose.model(
    "ProductVariation",
    productVariationSchema
);
// Question:
// What is the way of access of Seller (organization) in this ecommerce.
// Can they be able to have multiple accounts, with each account having different roles?
// How can we implement this?

// Or each organization can only have one account, and that account can have multiple roles?
