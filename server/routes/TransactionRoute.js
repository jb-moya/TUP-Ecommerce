import express from "express";
const router = express.Router();
import { authenticateUser } from "../middleware/authentication.js";
import { authorizePermissions } from "../middleware/authorization.js";
import {
    getAllTransactions,
    createTransaction,
    getTotalRevenue,
    updateTransaction,
} from "../controllers/transactionController.js";

router
    .route("/")
    .get(
        authenticateUser,
        authorizePermissions("customer", "seller"),
        getAllTransactions
    )
    .post(authenticateUser, authorizePermissions("customer"), createTransaction)
    .patch(
        authenticateUser,
        authorizePermissions("customer", "seller"),
        updateTransaction
    );

router.route("/revenue").get(authenticateUser, getTotalRevenue);

export default router;
