import mongoose from "mongoose";

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
    "Automotive",
    "Accessories",
    "Industrial",
    "Handmade",
    "Other",
];

const productVariationSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: [true, "SKU is required"],
    },
    name: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, "Option is required"],
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    stock: {
        type: Number,
        required: [true, "Stock is required"],
    }
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
        },
        featured: {
            type: Boolean,
            default: false,
        },
        variationClass: {
            type: [String],
            default: [],
        },
        description: {
            type: String,
            required: [true, "Please provide product description"],
            maxlength: [200, "Description cannot be more than 200 characters"],
        },
        variation: {
            type: [productVariationSchema],
            default: [],
        },
        createdAt: {
            type: Date,
            default: Date.now(),
        },
        category: {
            type: String,
            required: [true, "Please select a category"],
            enum: {
                values: productCategories,
                message: "{VALUE} is not valid category",
            },
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
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
        // Question:
        // What is the way of access of Seller (organization) in this ecommerce.
        // Can they be able to have multiple accounts, with each account having different roles?
        // How can we implement this?

        // Or each organization can only have one account, and that account can have multiple roles?
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
