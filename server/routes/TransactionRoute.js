import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/authentication.js";
import { authorizePermissions } from "../middleware/authorization.js";
import {
    getAllTransactions,
    createTransaction,
    getTotalRevenue,
} from "../controllers/transactionController.js";

router
    .route("/")
    .get(
        authenticateUser,
        authorizePermissions("customer", "seller"),
        getAllTransactions
    )
    .post(
        authenticateUser,
        authorizePermissions("customer"),
        createTransaction
    );

router.route("/revenue").get(authenticateUser, getTotalRevenue);

export default router;
