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
            enum: ['N/A', 'PROCESSING', 'COMPLETED', 'CANCELLED'],
            default: 'N/A',
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
        total: {
            type: Number,
            default: 0,
        },
        shippingMethod: {
            type: String,
            enum: ['N/A', 'Pick-up at TUP Manila', 'Deliver at specified shipping address'],
            default: 'N/A',
        },
        shippingAddress: {
            street: {
                type: String,
            },
            barangay: {
                type: String,
            },
            city: {
                type: String,
            },
            province: {
                type: String,
            },
            zip: {
                type: String,
            },
            country: {
                type: String,
            },
        },
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

OrderSchema.pre('save', function(next) {
    let total = 0;
    this.orders.forEach(order => {
        total += order.total;
    });
    this.total = total;
    next();
});

OrderSchema.pre('save', async function(next) {
    if (this.shippingMethod === 'Pick-up at TUP Manila') {
        this.shippingAddress = {
            street: 'Ayala Blvd., corner San Marcelino St.',
            barangay: 'Ermita',
            city: 'Manila',
            zip: '1000',
            country: 'Philippines'
        };
    } 
    next();
});

export default mongoose.model("Order", OrderSchema);