import express from "express";
const router = express.Router();

import {
    getAllUsers,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    getSingleUser,
} from "../controllers/userController.js";

import { authenticateUser } from "../middleware/authentication.js";
import { authorizePermissions } from "../middleware/authorization.js";

router
    .route("/")
    .get(authenticateUser, authorizePermissions("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);

export default router;
