import express from "express";
const router = express.Router();
import { authorizePermissions } from "../middleware/authorization.js";
import { authenticateUser } from "../middleware/authentication.js";

import {
    createOrder,
    getSingleOrder,
    getAllSellerOrders,
    updateOrder,
    deleteOrder,
} from "../controllers/orderController.js";

router
    .route("/")
    .get([authenticateUser, authorizePermissions('seller')], getAllSellerOrders)
    .post([authenticateUser, authorizePermissions('customer')], createOrder);

router
    .route("/:id")
    .get(authenticateUser, getSingleOrder)
    .patch([authenticateUser, authorizePermissions('customer')], updateOrder)
    .delete([authenticateUser, authorizePermissions('customer')], deleteOrder);

export default router;