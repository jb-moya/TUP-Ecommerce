import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { createCustomError, CustomAPIError } from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";
import asyncWrapper from "../middleware/async.js";

const addToCart = asyncWrapper(async (req, res, next) => {

    if (req.user.role !== 'customer') {
        return next(createCustomError("Only customers are allowed to add items to the cart", 403));
    }

    const { orderItems } = req.body;
    const { productId, sku, quantity } = orderItems[0];

    const product = await Product.findById(productId);

    if (!product) {
        return next(createCustomError(`Product with ID ${productId} not found`, 404));
    }

    let newItem;

    if(sku.length === 0) {
        newItem = {
            name: product.name,
            sku: '',
            option: {},
            price: product.price[0],
            quantity: quantity,
            product: product._id
        };
    } else {
        const skuSearch = product.variation.find(variation => variation.sku === sku);
        
        if (!skuSearch) {
            return next(createCustomError(`Product ${productId} has no SKU ${sku}`, 404));
        }

        const { option, price } = skuSearch;
        newItem = {
            name: product.name,
            sku: sku,
            option: option,
            price: price,
            quantity: quantity,
            product: product._id
        }
    }

    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
        cart = new Cart({
            user: req.user.userId,
            orderItems: [newItem],
            status: "unpaid",
            total: 0
        });
    } else {
        cart.orderItems.push(newItem);
    }

    await cart.save();
    res.status(200).json({ cart });
});

export {
    addToCart
};