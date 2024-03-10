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
    "Industrial",
    "Handmade",
    "Other",
];

const productVariationSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: [true, "SKU is required"],
    },
    option: {
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
            type: [Number],
            required: [true, "Price is required"],
        },
        featured: {
            type: Boolean,
            default: false,
        },
        // has_variation: {
        //     type: Boolean,
        //     default: false,
        // },
        description: {
            type: String,
            required: [true, "Please provide product description"],
            maxlength: [200, "Description cannot be more than 200 characters"],
        },
        variation: [productVariationSchema],

        // createdAt: {
        //     type: Date,
        //     default: Date.now(),
        // },

        // category: {
        //     type: String,
        //     required: [true, "Please select a category"],
        //     enum: {
        //         values: productCategories,
        //         message: "{VALUE} is not valid category",
        //     },
        // },
        
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Product", productSchema);
