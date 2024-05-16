import { Transaction } from "../models/Transaction.js";
import { Product } from "../models/Product.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const getAllTransactions = asyncWrapper(async (req, res) => {
    const queryObject = {};

    const { sort, productName, orderStatus } = req.query;

    console.log("productName", productName)

    if (productName) {
        queryObject["product"] = {
            $in: await Product.find({
                name: { $regex: productName, $options: "i" },
            }).select("_id"),
        };
    }

    if (orderStatus) {
        queryObject.orderStatus = orderStatus;
    }

    console.log("queryObject", queryObject.product)

    let transactions;
    if (req.user && req.user.role === "seller") {
        // queryObject["product.createdBy"] = req.user.userId;
        transactions = Transaction.find(queryObject).populate({
            path: "product",
            match: { createdBy: req.user.userId },
        });
    }
    
    if (req.user && req.user.role === "customer") {
        queryObject.user = mongoose.Types.ObjectId.createFromHexString(
            req.user.userId
        );

        transactions = Transaction.find(queryObject)
            .populate({
                path: "product",
            });
    }

    if (sort) {
        transactions = transactions.sort(sort);
    } else {
        transactions = transactions.sort("createdAt");
    }

    let countTotal = await Transaction.countDocuments(queryObject); // !! ilter to only seller

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    transactions = transactions.skip(skip).limit(limit);

    transactions = await transactions;
    // console.log("transactions eeee", transactions);
    // console.log("queryobject", queryObject);
    res.status(StatusCodes.OK).json({
        transactions,
        count: countTotal,
    });
});

const updateTransaction = asyncWrapper(async (req, res, next) => {
    const { orders, orderStatus } = req.body;

    if (!orderStatus) {
        return next(createCustomError("Please provide order status", 400));
    }

    const transactions = await Transaction.updateMany(
        { _id: { $in: orders } },
        { orderStatus },
        { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ transactions });
});

const getTotalRevenue = asyncWrapper(async (req, res) => {
    const result = await Transaction.aggregate([
        {
            $lookup: {
                from: "products",
                localField: "product",
                foreignField: "_id",
                as: "productInfo",
            },
        },
        {
            $match: {
                "productInfo.createdBy":
                    mongoose.Types.ObjectId.createFromHexString(
                        req.user.userId
                    ),
                "orderStatus": "Completed",
            },
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalQuantity: { $sum: "$quantity" },
            },
        },
    ]);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
    const totalQuantity = result.length > 0 ? result[0].totalQuantity : 0;
    res.status(StatusCodes.OK).json({ totalRevenue, totalQuantity });
});

const createTransaction = asyncWrapper(async (req, res) => {
    const user = req.user.userId;

    if (!req.body.cartItems) {
        return next(createCustomError("Please provide transactions", 400));
    }

    const items = req.body.cartItems;
    items.map((item) => {
        item.user = user;
    });

    console.log("items hehe", items);
    const transaction = await Transaction.insertMany(items);
    // res.status(StatusCodes.CREATED).json({ msg: "Transaction created"});
    res.status(StatusCodes.CREATED).json({ transaction });
});

export {
    getAllTransactions,
    createTransaction,
    getTotalRevenue,
    updateTransaction,
};
