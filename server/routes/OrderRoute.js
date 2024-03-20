import express from "express";
const router = express.Router();
import { authorizePermissions } from "../middleware/authorization.js";
import { authenticateUser } from "../middleware/authentication.js";

import {
    createOrder,
    getSingleOrder,
    getAllOrders,
    updateOrder,
    deleteOrder,
} from "../controllers/orderController.js";
import { getAllCarts } from "../controllers/cartController.js";

router
    .route("/")
    .get(getAllOrders)
    .post([authenticateUser, authorizePermissions('customer')], createOrder);

router
    .route("/:id")
    .get(authenticateUser, getSingleOrder)
    .patch([authenticateUser, authorizePermissions('customer')], updateOrder)
    .delete([authenticateUser, authorizePermissions('customer')], deleteOrder);

export default router;