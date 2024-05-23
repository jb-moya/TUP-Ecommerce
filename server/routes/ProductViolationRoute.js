import express from "express";
import { createProductViolation } from "../controllers/productViolationController.js";

const router = express.Router();

import { authorizePermissions } from "../middleware/authorization.js";
import { authenticateUser } from "../middleware/authentication.js";

router
    .route("/")
    .post(
        [authenticateUser, authorizePermissions("admin")],
        createProductViolation
    );

export default router;
