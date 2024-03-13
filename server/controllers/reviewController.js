import Review from "../models/Review.js";
import Product from "../models/Product.js";
import { StatusCodes } from "http-status-codes";
import { createCustomError, CustomAPIError } from "../errors/index.js";
import { checkPermissions } from "../utils/index.js";
import asyncWrapper from "../middleware/async.js";

const createReview = asyncWrapper(async (req, res, next) => {
    const { product: productId } = req.body;

    const isValidProduct = await Product.findOne({ _id: productId });

    if (!isValidProduct) {
        return next(
            createCustomError(`No product with id : ${productId}`, 404)
        );
    }

    const alreadySubmitted = await Review.findOne({
        product: productId,
        user: req.user.userId,
    });

    console.log("user", req.user.userId);

    console.log("alreadySubmitted", alreadySubmitted);

    if (alreadySubmitted) {
        return next(
            createCustomError("Already submitted review for this product", 400)
        );
    }

    req.body.user = req.user.userId;
    const review = await Review.create(req.body);
    res.status(StatusCodes.CREATED).json({ review });
});

const deleteReview = asyncWrapper(async (req, res, next) => {
    const { id: ReviewId } = req.params;

    const review = await Review.findOne({ _id: ReviewId });

    if (!review) {
        return next(createCustomError(`No review with id ${ReviewId}`, 404));
    }

    checkPermissions(req.user, review.user);
    await review.deleteOne();

    res.status(StatusCodes.OK).json({
        review,
        msg: "Review deleted successfully",
    });
});

const getAllReviews = asyncWrapper(async (req, res) => {
    res.status(StatusCodes.OK).json({ msg: "getAllReviews works" });
});

const getSingleReview = asyncWrapper(async (req, res, next) => {
    const { id: reviewId } = req.params;

    const review = await Review.findOne({ _id: reviewId });

    if (!review) {
        return next(createCustomError(`No review with id ${reviewId}`, 404));
    }

    res.status(StatusCodes.OK).json({ review });
});

const updateReview = asyncWrapper(async (req, res, next) => {
    const { id: reviewId } = req.params;
    const review = await Review.findOne({ _id: reviewId });

    if (!review) {
        return next(createCustomError(`No review with id ${reviewId}`, 404));
    }

    checkPermissions(req.user, review.user, false);

    const { rating, title, comment } = req.body;

    if (rating) {
        review.rating = rating;
    }

    if (title) {
        review.title = title;
    }

    if (comment) {
        review.comment = comment;
    }

    await review.save();
    res.status(StatusCodes.OK).json({ review });
});

export {
    createReview,
    deleteReview,
    getAllReviews,
    getSingleReview,
    updateReview,
};
