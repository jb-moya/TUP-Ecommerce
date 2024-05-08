import { Product } from "../models/Product.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

// FOR SELLER ONLY
const getSingleProduct = asyncWrapper(async (req, res, next) => {
    // console.log("req.user", req.user);

    const productId = req.params.id; // Access the ID from req.params.id

    // console.log("Product ID:", productId);
    // console.log("Product params:", req.params);

    // const {
    //     user: { userId },
    //     params: { id: productID },
    // } = req;

    const product = await Product.findOne({
        _id: productId,
        // createdBy: userId,
    });

    if (!product) {
        return next(
            createCustomError(`No product with id : ${productID}`, 404)
        );
    }

    // res.status(StatusCodes.OK).json({});
    res.status(StatusCodes.OK).json({ product });
});

const createProduct = asyncWrapper(async (req, res, next) => {
    console.log("role", req.user.role);

    req.body.createdBy = req.user.userId;

    const product = await Product.create(req.body);

    res.status(StatusCodes.CREATED).json({ product });
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
    let products;

    console.log("req.query", req.query);

    const { featured, name, sort, fields, numericFilters } = req.query;
    const queryObject = {};

    if (req.user && req.user.role === "seller") {
        queryObject.createdBy = req.user.userId;
    }

    if (featured) {
        queryObject.featured = featured === "true" ? true : false;
    }

    if (name) {
        queryObject.name = { $regex: name, $options: "i" };
    }

    if (numericFilters) {
        const operatorMap = {
            ">": "$gt",
            ">=": "$gte",
            "=": "$eq",
            "<": "$lt",
            "<=": "$lte",
        };

        const regEx = /\b(<|>|>=|=|<|<=)\b/g;
        let filters = numericFilters.replace(
            regEx,
            (match) => `-${operatorMap[match]}-`
        );

        const options = ["price", "averageRating"];
        filters = filters.split(",").forEach((item) => {
            console.log("item", item);
            const [field, operator, value] = item.split("-");
            if (options.includes(field)) {
                if (field === "price") {
                    if (!queryObject.$or) {
                        queryObject.$or = [];
                    }
                    
                    let priceCondition;
                    let variationPriceCondition;

                    for (const condition of queryObject.$or) {
                        if (condition.price) {
                            priceCondition = condition;
                        }
                        if (condition['variation.price']) {
                            variationPriceCondition = condition;
                        }
                    }

                    if (priceCondition) {
                        priceCondition.price[operator] = Number(value);
                    }
                    if (variationPriceCondition) {
                        variationPriceCondition['variation.price'][operator] = Number(value);
                    }
                    if (!priceCondition) {
                        queryObject.$or.push({
                            price: { [operator]: Number(value) },
                        });
                    }
                    if (!variationPriceCondition) {
                        queryObject.$or.push({
                            'variation.price': { [operator]: Number(value) },
                        });
                    }
                } else {
                    queryObject[field] = { [operator]: Number(value) };
                }
            }
        });
    }
    
    console.log("sort", sort);
    let result = Product.find(queryObject);
    if (sort) {
        result = result.sort(sort);
    } else {
        result = result.sort("createdAt");
    }

    if (fields) {
        const fieldsList = fields.split(",").join(" ");
        result = result.select(fieldsList);
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    console.log("Query Object:", JSON.stringify(queryObject, null, 2));

    products = await result;

    res.status(StatusCodes.OK).json({ products, count: products.length });

    // const products = await Product.find({});
    // res.status(200).json({ products });
});

const deleteProduct = asyncWrapper(async (req, res, next) => {
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
