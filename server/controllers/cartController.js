import Cart from "../models/Cart.js";
import { Product } from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { createCustomError, CustomAPIError } from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";
import asyncWrapper from "../middleware/async.js";
import mongoose from "mongoose";

const getCartPipeline = (userId) => [
    {
        $match: {
            user: mongoose.Types.ObjectId.createFromHexString(userId),
        },
    },
    { $unwind: "$orderItems" },

    {
        $lookup: {
            from: "products",
            localField: "orderItems.product",
            foreignField: "_id",
            as: "orderItems.productDetails",
        },
    },

    {
        $set: {
            "orderItems.productDetails": {
                $arrayElemAt: ["$orderItems.productDetails", 0],
            },
        },
    },

    // get only the variation in orderItems.variationDetails.variation array that matches the orderItems.variation
    {
        $set: {
            "orderItems.productDetails.variation": {
                $filter: {
                    input: "$orderItems.productDetails.variation",
                    as: "varDetail",
                    cond: {
                        $eq: ["$$varDetail._id", "$orderItems.variation"],
                    },
                },
            },
        },
    },
    {
        $group: {
            _id: "$_id",
            user: { $first: "$user" },
            orderItems: { $push: "$orderItems" },
        },
    },
];

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
        res.status(400).json({
            message: "A cart already exists for this user.",
        });
    }
});

const getSingleCart = asyncWrapper(async (req, res, next) => {
    const {
        params: { id: cartID },
    } = req;

    const cart = await Cart.findOne({
        _id: cartID,
    });

    if (!cart) {
        return next(createCustomError(`No cart with id : ${cartID}`, 404));
    }

    res.status(StatusCodes.OK).json({ cart });
});

const getUserCart = asyncWrapper(async (req, res, next) => {
    const cart = await Cart.aggregate(getCartPipeline(req.user.userId));

    console.log("cart NG HANEP", cart);
    console.dir(cart[0], { depth: null }); // Use console.dir for better object visualization

    res.status(200).json({ cart });
});

const hasCart = asyncWrapper(async (req, res) => {
    let cart = await Cart.findOne({ user: req.user.userId });
    // // console.log("cart", cart);
    res.status(200).json({ cart });
    // res.status(200).json({ hasCart: true });
});

const getAllCarts = asyncWrapper(async (req, res, next) => {
    const carts = await Cart.find();

    res.status(200).json({ carts });
});

const getAllCartItems = asyncWrapper(async (req, res, next) => {
    const { id: CartID } = req.params;
    const cart = await Cart.findById(CartID);

    if (!cart) {
        return next(createCustomError(`No cart with id : ${CartID}`, 404));
    }

    res.status(200).json({ cartItems: cart.orderItems });
});

const deleteCartItem = asyncWrapper(async (req, res, next) => {
    const cartId = req.params.cartId;
    const itemId = req.params.itemId;

    const cart = await Cart.findById(cartId);
    // const cart = await Cart.aggregate(getCartPipeline(req.user.userId));

    if (!cart) {
        return next(createCustomError(`No cart with id : ${cartId}`, 404));
    }

    const item = cart.orderItems.find((item) => item._id.toString() === itemId);

    if (!item) {
        return next(createCustomError(`No item with id : ${itemId}`, 404));
    }

    cart.orderItems = cart.orderItems.filter(
        (item) => item._id.toString() !== itemId
    );

    await cart.save();

    const newCart = await Cart.aggregate(getCartPipeline(req.user.userId));

    res.status(200).json({ cart: newCart[0] });
});

const addToCart = asyncWrapper(async (req, res, next) => {
    const { productID, quantity, variationID, cartID } = req.body;

    // console.log("body", req.body);

    if (cartID) {
        const cart = await Cart.findById(cartID);
        const product = await Product.findById(productID);

        if (!product) {
            return next(
                createCustomError(`Product with ID ${productID} not found`, 404)
            );
        }

        if (variationID) {
            const productVariation = product.variation.find(
                (variation) => variation._id.toString() === variationID
            );

            if (!productVariation) {
                return next(
                    createCustomError(`Product variation not found`, 404)
                );
            }

            const existingItem = cart.orderItems.find(
                (item) =>
                    item.product.toString() === productID &&
                    item.variation.toString() === variationID
            );
            if (existingItem) {
                // console.log("existingItem:", existingItem);
                existingItem.quantity += quantity;
            } else {
                cart.orderItems.push({
                    product: productID,
                    variation: variationID,
                    quantity,
                });
            }

            await cart.save();
            res.status(200).json({ cart });
        } else {
            const existingItem = cart.orderItems.find(
                (item) =>
                    item.product.toString() === productID &&
                    item.variation === null
            );

            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                cart.orderItems.push({
                    product: productID,
                    variation: null,
                    quantity,
                });
            }

            await cart.save();
            res.status(200).json({ cart });
        }
    } else {
        // create a new cart
        // console.log("HANEP HANEP HANEPHANEP");
        const cart = new Cart({
            user: req.user.userId,
            orderItems: [
                {
                    product: productID,
                    quantity: quantity,
                    variation: variationID ? variationID : null,
                },
            ],
        });

        await cart.save();
        res.status(200).json({ cart });
    }
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

        const existingItem = cart.orderItems.find(
            (item) => item.product.toString() === productId && item.sku === sku
        );

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
                        createCustomError(
                            `Product ${productId} has no SKU ${sku}`,
                            404
                        )
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
        return next(createCustomError(`No cart with id : ${CartID}`, 404));
    }

    res.status(200).json({ cart });
});

export {
    createCart,
    getSingleCart,
    addToCart,
    getUserCart,
    getAllCarts,
    hasCart,
    getAllCartItems,
    deleteCartItem,
    updateCart,
    deleteCart,
};
