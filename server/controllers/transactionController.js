import { Transaction } from "../models/Transaction.js";
import { Product } from "../models/Product.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";

const getAllTransactions = asyncWrapper(async (req, res) => {
    const queryObject = {};

    const { sort, productName, orderStatus, populatedFields } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

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

    let transactions;
    if (req.user && req.user.role === "seller") {
        const sortObject = {};
        if (sort) {
            sort.forEach(([key, order]) => {
                sortObject[key] = order === "ascending" ? 1 : -1;
            });
        } else {
            sortObject.createdAt = 1;
        }

        transactions = Transaction.aggregate([
            {
                $lookup: {
                    from: "products",
                    localField: "product",
                    foreignField: "_id",
                    as: "product",
                },
            },
            {
                $unwind: "$product", // Deconstruct the product array
            },
            {
                $match: {
                    "product.createdBy":
                        mongoose.Types.ObjectId.createFromHexString(
                            req.user.userId
                        ),
                    ...queryObject,
                },
            },
            {
                $sort: sortObject,
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ]);
    }

    if (req.user && req.user.role === "customer") {
        console.log("req.user.userId", req.user.userId);
        queryObject.user = mongoose.Types.ObjectId.createFromHexString(
            req.user.userId
        );

        transactions = Transaction.find(queryObject).populate({
            path: "product",
            populate: {
                path: "createdBy",
                select: ["orgName", "image"],
            },
        });

        if (sort) {
            transactions = transactions.sort(sort);
        } else {
            transactions = transactions.sort("createdAt");
        }

        transactions = transactions.skip(skip).limit(limit);
    }

    let countTotal = await Transaction.countDocuments(queryObject);
    transactions = await transactions;
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
                orderStatus: "Completed",
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

    for (const item of items) {
        const product = await Product.findById(item.product);

        if (!product) {
            return next(
                createCustomError(
                    `Product with id ${item.product} not found`,
                    404
                )
            );
        }

        if (item.variation) {
            const variation = product.variation.find(
                (v) => v._id.toString() === item.variation
            );

            if (!variation) {
                return next(
                    createCustomError(
                        `Variation with id ${item.variation} not found`,
                        404
                    )
                );
            }

            if (variation.stock < item.quantity) {
                return next(
                    createCustomError(
                        `Product ${product.name} has insufficient stock`,
                        400
                    )
                );
            }

            variation.stock -= item.quantity;
            await product.save();
        } else {
            if (product.stock < item.quantity) {
                return next(
                    createCustomError(
                        `Product ${product.name} has insufficient stock`,
                        400
                    )
                );
            }

            product.stock -= item.quantity;
            await product.save();
        }
    }

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
