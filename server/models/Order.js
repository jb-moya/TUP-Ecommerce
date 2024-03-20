import mongoose from "mongoose";

const SingleProductSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    sku: {
        type: String,
        default: '',
    },
    option: {
        type: Object,
        default: {},
    },
    price: {
        type: Number,
        required: [true, "Price is required"],
    },
    quantity: {
        type: Number,
        required: true,
    },
    _id: false
});

const SingleSellerSchema = new mongoose.Schema(
    {
        seller: {
            type: mongoose.Schema.ObjectId,
            ref: "Seller",
            required: true,
        },
        products: [SingleProductSchema],
        total: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['pending', 'processing', 'completed', 'cancelled'],
            default: 'pending',
        },
        _id: false
    },
    { timestamps: true }
);

const OrderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.ObjectId,
            ref: "Customer",
            required: true,
        },
        orders: [SingleSellerSchema],
    },
    { timestamps: true }
);

OrderSchema.pre('save', function(next) {
    this.orders.forEach(order => {
        let total = 0;
        order.products.forEach(item => {
            total += item.price * item.quantity;
        });
        order.total = total;
    });
    next();
});

export default mongoose.model("Order", OrderSchema);