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
    hasCart,
} from "../controllers/cartController.js";

router
    .route("/")
    .get([authenticateUser, authorizePermissions("admin")], getAllCarts)
    .post([authenticateUser, authorizePermissions("customer")], createCart);

router
    .route("/:id")
    .get([authenticateUser, authorizePermissions("admin")], getSingleCart)
    .patch([authenticateUser, authorizePermissions("customer")], updateCart)
    .delete([authenticateUser, authorizePermissions("customer")], deleteCart);

router
    .route("/hasCart")
    .get([authenticateUser, authorizePermissions("customer")], hasCart);

export default router;
