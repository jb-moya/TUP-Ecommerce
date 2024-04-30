import express from "express";
const router = express.Router();
import { register, login, logout } from "../controllers/registerController.js"
import { authenticateUser } from "../middleware/authentication.js";

import {
    getAllUsers,
    showCurrentUser,
    // updateUser,
    // updateUserPassword,
    getSingleUser,
} from "../controllers/userController.js";

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/getAccountDetails").get(authenticateUser, getSingleUser);

export default router;