import { Product } from "../models/Product.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const getSingleProduct = asyncWrapper(async (req, res, next) => {
    const productId = req.params.id;
    console.log("productId", productId);
    // const product = await Product.findOne({
    //     _id: productId,
    // });

    const product = await Product.findOne({
        _id: productId,
    }).populate({
        path: "createdBy",
        select: "-password", // Exclude the 'password' field
    });

    // console.log("hehe", hehe);

    if (!product) {
        return next(
            createCustomError(`No product with id : ${productID}`, 404)
        );
    }

    res.status(StatusCodes.OK).json({ product });
});

const createProduct = asyncWrapper(async (req, res, next) => {
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
};

const getAllProducts = asyncWrapper(async (req, res, next) => {
    let products;

    const {
        featured,
        name,
        sort,
        fields,
        numericFilters,
        categories,
        createdBy,
        populatedFields,
    } = req.query;


    const queryObject = {};

    try {
        if (featured) {
            queryObject.featured = featured === "true" ? true : false;
        }

        if (name) {
            queryObject.name = { $regex: name, $options: "i" };
        }

        if (categories) {
            queryObject.category = { $in: categories.split(",") };
        }

        if (createdBy) {
            queryObject.createdBy = { $in: createdBy.split(",") };
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

            const options = ["price", "averageRating", "soldCount", "stock"];
            filters = filters.split(",").forEach((item) => {
                const [field, operator, value] = item.split("-");
                if (options.includes(field)) {
                    if (field === "price" || field === "stock") {
                        if (!queryObject.$or) {
                            queryObject.$or = [];
                        }

                        let primaryCondition;
                        let variationCondition;
                        const primaryField = field;
                        const variationField = `variation.${field}`;

                        for (const condition of queryObject.$or) {
                            if (condition[primaryField]) {
                                primaryCondition = condition;
                            }
                            if (condition[variationField]) {
                                variationCondition = condition;
                            }
                        }

                        if (primaryCondition) {
                            primaryCondition[primaryField][operator] =
                                Number(value);
                        }
                        if (variationCondition) {
                            variationCondition[variationField][operator] =
                                Number(value);
                        }
                        if (!primaryCondition) {
                            queryObject.$or.push({
                                [primaryField]: { [operator]: Number(value) },
                            });
                        }
                        if (!variationCondition) {
                            queryObject.$or.push({
                                [variationField]: { [operator]: Number(value) },
                            });
                        }
                    } else {
                        queryObject[field] = { [operator]: Number(value) };
                    }
                }
            });
        }

        // console.log("Query Object:", JSON.stringify(queryObject, null, 2));

        let result;
        if (populatedFields) {
            result = Product.find(queryObject).populate(
                populatedFields.split(",")
            );
        } else {
            result = Product.find(queryObject);
        }

        let countTotal = await Product.countDocuments(queryObject);
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
        const limit = Number(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        result = result.skip(skip).limit(limit);

        products = await result;

        // console.log("queryOBject", queryObject);

        res.status(StatusCodes.OK).json({
            products,
            count: countTotal,
            // count: products.length,
        });
    } catch (error) {
        console.error("Error processing query:", error);
        next(error);
    }
});


// const getAllProducts = asyncWrapper(async (req, res, next) => {
//     let products;

//     const {
//         featured,
//         name,
//         sort,
//         fields,
//         numericFilters,
//         categories,
//         createdBy,
//         populatedFields,
//     } = req.query;

//     const queryObject = {};
//     // console.log(JSON.stringify(queryOBject, null, 2));


//     if (featured) {
//         queryObject.featured = featured === "true" ? true : false;
//     }

//     if (name) {
//         queryObject.name = { $regex: name, $options: "i" };
//     }

//     if (categories) {
//         queryObject.category = { $in: categories.split(",") };
//     }

//     if (createdBy) {
//         queryObject.createdBy = { $in: createdBy.split(",") };
//     }

//     if (numericFilters) {
//         const operatorMap = {
//             ">": "$gt",
//             ">=": "$gte",
//             "=": "$eq",
//             "<": "$lt",
//             "<=": "$lte",
//         };

//         const regEx = /\b(<|>|>=|=|<|<=)\b/g;
//         let filters = numericFilters.replace(
//             regEx,
//             (match) => `-${operatorMap[match]}-`
//         );

//         const options = ["price", "averageRating"];
//         filters = filters.split(",").forEach((item) => {
//             const [field, operator, value] = item.split("-");
//             if (options.includes(field)) {
//                 if (field === "price") {
//                     if (!queryObject.$or) {
//                         queryObject.$or = [];
//                     }

//                     let priceCondition;
//                     let variationPriceCondition;

//                     for (const condition of queryObject.$or) {
//                         if (condition.price) {
//                             priceCondition = condition;
//                         }
//                         if (condition["variation.price"]) {
//                             variationPriceCondition = condition;
//                         }
//                     }

//                     if (priceCondition) {
//                         priceCondition.price[operator] = Number(value);
//                     }
//                     if (variationPriceCondition) {
//                         variationPriceCondition["variation.price"][operator] =
//                             Number(value);
//                     }
//                     if (!priceCondition) {
//                         queryObject.$or.push({
//                             price: { [operator]: Number(value) },
//                         });
//                     }
//                     if (!variationPriceCondition) {
//                         queryObject.$or.push({
//                             "variation.price": { [operator]: Number(value) },
//                         });
//                     }
//                 } else {
//                     queryObject[field] = { [operator]: Number(value) };
//                 }
//             }
//         });
//     }

//     // console.log("sort", sort);
//     let result;
//     if (populatedFields) {
//         result = Product.find(queryObject).populate(populatedFields.split(","));
//     } else {
//         result = Product.find(queryObject);
//     }

//     let countTotal = await Product.countDocuments({});
//     if (sort) {
//         result = result.sort(sort);
//     } else {
//         result = result.sort("createdAt");
//     }

//     if (fields) {
//         const fieldsList = fields.split(",").join(" ");
//         result = result.select(fieldsList);
//     }

//     const page = Number(req.query.page) || 1;
//     const limit = Number(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     result = result.skip(skip).limit(limit);

//     products = await result;
//     // console.dir(queryOBject, { depth: null });
    
//     res.status(StatusCodes.OK).json({
//         products,
//         productTotalCount: countTotal,
//         count: products.length,
//     });
// });

const deleteProduct = asyncWrapper(async (req, res, next) => {
    const { id: ProductID } = req.params;
    const product = await Product.findOneAndDelete({ _id: ProductID });

    if (!product) {
        return next(
            createCustomError(`No product with id : ${ProductID}`, 404)
        );
    }

    res.status(200).json({ product });
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
});

export {
    getSingleProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    tempProductRoute,
};
