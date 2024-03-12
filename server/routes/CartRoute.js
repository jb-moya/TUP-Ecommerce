import express from "express";
const router = express.Router();
import { authorizePermissions } from "../middleware/authorization.js";
import { authenticateUser } from "../middleware/authentication.js";

import {
    addToCart,
} from "../controllers/cartController.js";

router.route("/").post(authenticateUser, addToCart);

export default router;