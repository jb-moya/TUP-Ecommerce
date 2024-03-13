import Feedback from "../models/Feedback.js";
import asyncWrapper from "../middleware/async.js";
import { createCustomError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";

const createFeedback = asyncWrapper(async (req, res, next) => {
    console.log("role", req.user.role);

    req.body.createdBy = req.user.userId;

    const feedback = await Feedback.create(req.body);
    res.status(StatusCodes.CREATED).json({ feedback });
});

const getFeedback = asyncWrapper(async (req, res, next) => {
    const { feedbackId } = req.params;

    const feedback = await Feedback.find({
        _id: feedbackId,
    });

    res.status(StatusCodes.OK).json({ feedback });
});

const getAllFeedback = asyncWrapper(async (req, res, next) => {
    const feedback = await Feedback.find({});

    res.status(StatusCodes.OK).json({ feedback });
});

const getSingleFeedback = asyncWrapper(async (req, res, next) => {
    const { feedbackId } = req.params;

    const feedback = await Feedback.findOne({
        _id: feedbackId,
    });

    if (!feedback) {
        return next(
            createCustomError(`No feedback with id : ${feedbackId}`, 404)
        );
    }

    res.status(StatusCodes.OK).json({ feedback });
});

const deleteFeedback = asyncWrapper(async (req, res, next) => {
    const { feedbackId } = req.params;

    const feedback = await Feedback.findOneAndDelete({
        _id: feedbackId,
    });

    if (!feedback) {
        return next(
            createCustomError(`No feedback with id : ${feedbackId}`, 404)
        );
    }

    res.status(StatusCodes.OK).json({ feedback });
});

const updateFeedback = asyncWrapper(async (req, res, next) => {
    const { feedbackId } = req.params;

    const feedback = await Feedback.findOneAndUpdate(
        { _id: feedbackId },
        req.body,
        { new: true, runValidators: true }
    );

    if (!feedback) {
        return next(
            createCustomError(`No feedback with id : ${feedbackId}`, 404)
        );
    }

    res.status(StatusCodes.OK).json({ feedback });
});

export {
    createFeedback,
    getFeedback,
    getAllFeedback,
    getSingleFeedback,
    deleteFeedback,
    updateFeedback,
};
