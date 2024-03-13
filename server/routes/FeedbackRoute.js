import express from "express";
const router = express.Router();
import { authorizePermissions } from "../middleware/authorization.js";
import { authenticateUser } from "../middleware/authentication.js";
import {
    createFeedback,
    getFeedback,
    getSingleFeedback,
    updateFeedback,
    deleteFeedback,
} from "../controllers/feedbackControll.er.js";

router
    .route("/")
    .post([authenticateUser, authorizePermissions("seller")], createFeedback);
router
    .route("/:feedbackId")
    .get(getFeedback)
    .get(getSingleFeedback)
    .patch([authenticateUser, authorizePermissions("seller")], updateFeedback)
    .delete([authenticateUser, authorizePermissions("seller")], deleteFeedback);

export default router;