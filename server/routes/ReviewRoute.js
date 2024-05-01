import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/authentication.js";

import {
    createReview,
    getAllReviews,
    getSingleReview,
    getReviewTotals,
    updateReview,
    deleteReview,
} from "../controllers/reviewController.js";

router.route("/").post(authenticateUser, createReview).get(getAllReviews);

router.route("/product/:id").get(getAllReviews);
router.route("/product/:id/total").get(getReviewTotals);

router
    .route("/:id")
    .get(getSingleReview)
    .patch(authenticateUser, updateReview)
    .delete(authenticateUser, deleteReview);

export default router;
