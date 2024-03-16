import express from "express";
const router = express.Router();
import { authorizePermissions } from "../middleware/authorization.js";
import { authenticateUser } from "../middleware/authentication.js";

import {
    createCart,
    getSingleCart,
    getAllCarts,
    updateCart,
    deleteCart,
} from "../controllers/cartController.js";

router
    .route("/")
    .get(getAllCarts)
    .post([authenticateUser, authorizePermissions('customer')], createCart);

router
    .route("/:id")
    .get(authenticateUser, getSingleCart)
    .patch([authenticateUser, authorizePermissions('customer')], updateCart)
    .delete([authenticateUser, authorizePermissions('customer')], deleteCart);

export default router;