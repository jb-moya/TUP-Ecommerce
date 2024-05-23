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


router
    .route("/")
    .get(getAllProducts)
    .post([authenticateUser, authorizePermissions("seller")], createProduct);
router
    .route("/:id")
    .get(getSingleProduct)
    .patch([authenticateUser, authorizePermissions("seller", "admin")], updateProduct)
    .delete([authenticateUser, authorizePermissions("seller", "admin")], deleteProduct);

router.route("/temp/").post(tempProductRoute);

export default router;