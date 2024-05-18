import express from "express";
const router = express.Router();

import {
    getAllUsers,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    getSingleUser,
    getAllOrganization,
    updateStatusOrganization,
    getSingleOrganization,
} from "../controllers/userController.js";

import { authenticateUser } from "../middleware/authentication.js";
import { authorizePermissions } from "../middleware/authorization.js";

router
    .route("/")
    .get(authenticateUser, authorizePermissions("admin"), getAllUsers);
router.route("/organizations").get(getAllOrganization);
router.route("/singleOrganization").get(getSingleOrganization);
router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/getAccountDetails").get(authenticateUser, getSingleUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);
router
    .route("/updateStatusOrganization")
    .patch(
        [authenticateUser, authorizePermissions("admin")],
        updateStatusOrganization
    );

// router.route("/:id").get(authenticateUser, getSingleUser);

export default router;
