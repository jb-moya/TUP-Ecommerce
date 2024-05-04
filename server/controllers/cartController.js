import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { createCustomError, CustomAPIError } from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";
import asyncWrapper from "../middleware/async.js";

const createCart = asyncWrapper(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user.userId });

    if (!cart) {
        cart = new Cart({
            user: req.user.userId,
            orderItems: [],
        });

        await cart.save();
        res.status(200).json({ cart });
    } else {
        res.status(400).json({ message: "A cart already exists for this user." });
    }
});

const getSingleCart = asyncWrapper(async (req, res, next) => {
    const {
        params: { id: cartID },
    } = req;

    const cart = await Cart.findOne({
        _id: cartID
    });

    if (!cart) {
        return next(
            createCustomError(`No cart with id : ${cartID}`, 404)
        );
    }

    res.status(StatusCodes.OK).json({ cart });
});

const hasCart = asyncWrapper(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user.userId });

    res.status(200).json({ hasCart: !!cart });
});


const getAllCarts = asyncWrapper(async (req, res, next) => {
    const carts = await Cart.find();

    res.status(200).json({ carts });
});

const updateCart = asyncWrapper(async (req, res, next) => {
    const { id: CartID } = req.params;
    let cart = await Cart.findById(CartID);

    if (cart) {
        
        const { orderItems } = req.body;
        const { productId, sku, quantity } = orderItems[0];

        const product = await Product.findById(productId);

        if (!product) {
            return next(
                createCustomError(`Product with ID ${productId} not found`, 404)
            );
        }

        const existingItem = cart.orderItems.find(item => item.product.toString() === productId && item.sku === sku);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            let newItem;

            if (sku.length === 0) {
                newItem = {
                    name: product.name,
                    sku: "",
                    quantity: quantity,
                    product: product._id,
                };
            } else {
                const skuSearch = product.variation.find(
                    (variation) => variation.sku === sku
                );

                if (!skuSearch) {
                    return next(
                        createCustomError(`Product ${productId} has no SKU ${sku}`, 404)
                    );
                }

                const { option, price } = skuSearch;
                newItem = {
                    name: product.name,
                    sku: sku,
                    quantity: quantity,
                    product: product._id,
                };
            }

            cart.orderItems.push(newItem);
        }

        await cart.save();
        res.status(200).json({ cart });
    } else {
        res.status(400).json({ message: "No cart for this user" });
    }
});

const deleteCart = asyncWrapper(async (req, res, next) => {
    const { id: CartID } = req.params;
    const cart = await Cart.findOneAndDelete({ _id: CartID });

    if (!cart) {
        return next(
            createCustomError(`No cart with id : ${CartID}`, 404)
        );
    }

    res.status(200).json({ cart });
});

export { createCart,
        getSingleCart,
        getAllCarts,
        hasCart,
        updateCart,
        deleteCart };
