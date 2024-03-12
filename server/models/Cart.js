import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    sku: {
        type: String,
        default: '',
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
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
    _id: false
})

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    orderItems: [ProductSchema],
    total: {
        type: Number,
        default: 0,
    },
    status: {
        type: String,
        default: 'pending'
    }
})

CartSchema.pre('save', function(next) {
    let total = 0;
    this.orderItems.forEach(item => {
        total += item.price * item.quantity;
    });
    this.total = total;
    next();
});

export default mongoose.model("Cart", CartSchema);

/*
{

    "orderItems": [
        {
            "name": "Skirt",
            "sku":,
            "price": 39.99,
            "quantity": 1,
            "product": "65ee78d04cfbe7e546c10561",
        }
    ],
}
*/