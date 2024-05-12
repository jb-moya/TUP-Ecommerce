import { Transaction } from "../models/Transaction.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const getAllTransactions = asyncWrapper(async (req, res) => {
    const queryObject = {};

    let transactions = Transaction.find(queryObject);
    if (req.user && req.user.role === "seller") {
        // queryObject["product.createdBy"] = req.user.userId;
        transactions = Transaction.find(queryObject).populate({
            path: "product",
            match: { createdBy: req.user.userId },
        });
    }

    let countTotal = await Transaction.countDocuments({}); // !! ilter to only seller

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    transactions = transactions.skip(skip).limit(limit);

    // console.log("transactions", transactions);
    transactions = await transactions;
    res.status(StatusCodes.OK).json({
        transactions,
        transactionTotalCount: countTotal,
        count: transactions.length,
    });
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

export { getAllTransactions, createTransaction, getTotalRevenue };
