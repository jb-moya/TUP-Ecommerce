import Cart from "../models/Cart.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { createCustomError, CustomAPIError } from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";
import asyncWrapper from "../middleware/async.js";
import mongoose from "mongoose";

const createOrder = asyncWrapper(async (req, res, next) => {

    let order = new Order({
            user: req.user.userId,
            orders: [],
            total: 0,
            status: 'N/A',
            shippingMethod: 'N/A',
            shippingAddress: {
                street: '',
                barangay: '',
                city: '',
                province: '',
                zip: '',
                country: '',
            }
        });

    await order.save();
    res.status(200).json({ order });

});

const getSingleOrder = asyncWrapper(async (req, res, next) => {
    const {
        params: { id: OrderID },
    } = req;

    const order = await Order.findOne({
        _id: OrderID
    });

    if (!order) {
        return next(
            createCustomError(`No order with id : ${OrderID}`, 404)
        );
    }

    res.status(StatusCodes.OK).json({ order });
});

const getSellerOrders = asyncWrapper(async (req, res) => {

    const sellerId = req.user.userId;
    const { status } = req.body;

    let matchCondition = {};
    if (status && status !== "N/A") {
        matchCondition = { "orders.status": status };
    }

    const orders = await Order.aggregate([
        { $unwind: "$orders" },
        {
            $match: { 
                $expr: { 
                    $eq: [ { $toString: "$orders.seller" }, sellerId ]
                }
            }
        },
        { $match: matchCondition },
        {
            $project: {
                order_id: "$orders._id",
                user_id: "$user",
                products: "$orders.products",
                total: "$orders.total",
                status: "$orders.status",
                shippingMethod: 1,
                shippingAddress: 1
            }
        }
    ]);

    const response = { seller: sellerId, orders };

    res.status(200).json(response);

});

const updateOrder = asyncWrapper(async (req, res, next) => {
    let cart = await Cart.findOne({ user: req.user.userId });

    if (cart) {

        const { id: orderID } = req.params;
        let order = await Order.findById(orderID);

        const { shippingMethod, shippingAddress } = req.body;

        if (order) {

            order.shippingMethod = shippingMethod;
            order.shippingAddress = shippingAddress;
            
            for (const item of cart.orderItems) {

                const product = await Product.findById(item.product);
                
                if (product) {
                    const existingSellerIndex = order.orders.findIndex(order => order.seller && order.seller.toString() === product.createdBy.toString());
                    
                    let x, y;

                    if (item.sku.length === 0) {
                        x = product.price[0];
                    } else {
                        const skuSearch = product.variation.find(
                            (variation) => variation.sku === item.sku
                        );
        
                        const { option, price } = skuSearch;
                        x = price;
                        y = option;
                    }

                    if (existingSellerIndex !== -1) {
                        order.orders[existingSellerIndex].products.push({
                            product: product._id,
                            name: product.name,
                            sku: item.sku,
                            option: y,
                            price: x,
                            quantity: item.quantity
                        });
                    } else {
                        order.orders.push({
                            seller: product.createdBy,
                            products: [{
                                product: product._id,
                                name: product.name,
                                sku: item.sku,
                                option: y,
                                price: x,
                                quantity: item.quantity
                            }]
                        });
                    }
                } else {
                    res.status(400).json({ message: "Such product does not exist." });
                }
            }
            
            order.orders.forEach(orderItem => {
                orderItem.status = 'PROCESSING';
            });

            await order.save();
    
            res.status(200).json({ order });
        } else {
            res.status(400).json({ message: "An order does not exist for this user." });
        }

        await Cart.deleteOne({ user: req.user.userId });
        
    } else {
        res.status(400).json({ message: "A cart does not exist for this user." });
    }

});

const deleteOrder = asyncWrapper(async (req, res, next) => {
    const { id: OrderID } = req.params;
    const order = await Order.findOneAndDelete({ _id: OrderID });

    if (!order) {
        return next(
            createCustomError(`No cart with id : ${OrderID}`, 404)
        );
    }

    res.status(200).json({ order });
});

export { createOrder,
        getSingleOrder,
        getSellerOrders,
        updateOrder,
        deleteOrder,
         };


/// FOR SAFEKEEPING

//     getAllSellerOrders
//     const sellerId = req.user.userId;
//     const orders = await Order.find().cursor();

//     let x = { seller: sellerId, orders: [] };

//     for await (const doc1 of orders) {
//         for await (const doc2 of doc1.orders) {
//             if (doc2.seller.toString() === sellerId) {
//                 x.orders.push({
//                     order_id: doc1._id,
//                     user_id: doc1.user,
//                     products: doc2.products,
//                     total: doc2.total,
//                     status: doc2.status,
//                     shippingMethod: doc1.shippingMethod,
//                     shippingAddress: doc1.shippingAddress,
//                 });
//             }
//         }
//     }

//     res.status(200).json({ x });