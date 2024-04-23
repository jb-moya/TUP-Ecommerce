import express from "express";
import {
    getSingleProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    createProduct,
    tempProductRoute,
} from "../controllers/productController.js";

const router = express.Router();

import { authorizePermissions } from "../middleware/authorization.js";
import { authenticateUser } from "../middleware/authentication.js";


// Example Express.js route handlers

// might move the authorizeSeller middleware to the productController.js file

// might combine the authorizeSeller and authenticateUser middleware into one middleware
router
    .route("/")
    .get([authenticateUser, authorizePermissions("admin")], getAllProducts)
    .post([authenticateUser, authorizePermissions("seller")], createProduct);
router
    .route("/:id")
    .get(authenticateUser, getSingleProduct)
    .patch([authenticateUser, authorizePermissions("seller")], updateProduct)
    .delete([authenticateUser, authorizePermissions("seller")], deleteProduct);

router.route("/temp/").post(tempProductRoute);

export default router;

