import Product from "../models/Product.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError, CustomAPIError } from "../errors/custom-api.js";
import { StatusCodes } from "http-status-codes";

// FOR SELLER ONLY
const getSingleProduct = asyncWrapper(async (req, res, next) => {
    console.log("req.user", req.user);

    // res.status(StatusCodes.OK).json({ msg: "getSingleProduct works" });
    // return;

    const {
        user: { userId },
        params: { id: productID },
    } = req;
    const product = await Product.findOne({
        _id: productID,
        createdBy: userId,
    });

    // const product = await Product.findOne({ _id: productID });

    if (!product) {
        return next(
            createCustomError(`No product with id : ${productID}`, 404)
        );
    }

    // res.status(200).json({ product, amount: 1});
    res.status(StatusCodes.OK).json({ product });
    // res.status(200).json({ status: "success", data: { product } });
});

const createProduct = asyncWrapper(async (req, res, next) => {
    console.log("role", req.user.role);

    // if (req.user.role !== "seller") {
    //     return next(
    //         createCustomError(
    //             "You are not allowed to perform this action",
    //             StatusCodes.UNAUTHORIZED
    //         )
    //     );
    // }

    req.body.createdBy = req.user.userId;

    const product = await Product.create(req.body);
    // res.status(201).json({ product });
    res.status(StatusCodes.CREATED).json({ product });
    // res.status(201).json({ reqBody: req.user });
    // {product} === {product: product}
    // res.status(StatusCodes.CREATED);
});

const tempProductRoute = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({ product });
    } catch (error) {
        res.status(500).json({ msg: error });
    }

    // const product = await Product.create(req.body);
    // res.status(201).json({ product });
    // {product} === {product: product}
};

// FOR SELLER ONLY
const getAllProducts = asyncWrapper(async (req, res, next) => {
    const products = await Product.find({ createdBy: req.user.userId }).sort(
        "createdAt"
    );

    res.status(StatusCodes.OK).json({ products, count: products.length });

    // const products = await Product.find({});
    // res.status(200).json({ products });
});

const deleteProduct = asyncWrapper(async (req, res) => {
    const { id: ProductID } = req.params;
    const product = await Product.findOneAndDelete({ _id: ProductID });

    if (!product) {
        return next(
            createCustomError(`No product with id : ${ProductID}`, 404)
        );
    }

    res.status(200).json({ product });

    // other examples of response
    // res.status(200).send();
    // res.status(200).json({
    //     product: null,
    //     status: "Product deleted successfully",
    // });
});

const updateProduct = asyncWrapper(async (req, res, next) => {
    const { id: ProductID } = req.params;

    const product = await Product.findOneAndUpdate(
        { _id: ProductID },
        req.body,
        { new: true, runValidators: true }
    );

    if (!product) {
        return next(
            createCustomError(`No product with id : ${ProductID}`, 404)
        );
    }

    res.status(200).json({ product });
    // res.status(200).json({id:ProductID, data:req.body});
});


export {
    getSingleProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    tempProductRoute,
};
