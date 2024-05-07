import express from "express";
const router = express.Router();
import { authorizePermissions } from "../middleware/authorization.js";
import { authenticateUser } from "../middleware/authentication.js";

import {
    createCart,
    getSingleCart,
    getAllCarts,
    updateCart,
    addToCart,
    getUserCart,
    getAllCartItems,
    deleteCart,
    deleteCartItem,
    hasCart,
} from "../controllers/cartController.js";

router
    .route("/")
    .get([authenticateUser], getUserCart)
    // .get([authenticateUser], hasCart)
    .get([authenticateUser, authorizePermissions("admin")], getAllCarts)
    .post([authenticateUser, authorizePermissions("customer")], createCart);

router
    .route("/:id")
    .get(authenticateUser, getSingleCart)
    .get([authenticateUser, authorizePermissions("customer")], getAllCartItems)
    .patch([authenticateUser, authorizePermissions("customer")], updateCart)
    .delete([authenticateUser, authorizePermissions("customer")], deleteCart);

router
    .route("/add")
    .post([authenticateUser, authorizePermissions("customer")], addToCart);

router.route("/hascart").post(authenticateUser, hasCart);

router.route("/deleteItem/:cartId/:itemId").delete(authenticateUser, deleteCartItem);


export default router;
