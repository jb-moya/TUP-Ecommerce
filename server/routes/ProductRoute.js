import express from "express";
import {
    getSingleProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    createProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Example Express.js route handlers

router.route("/").get(getAllProducts).post(createProduct);
router
    .route("/:id")
    .get(getSingleProduct)
    .patch(updateProduct)
    .delete(deleteProduct);

// stop at 48:33 https://youtu.be/qwfE7fSVaZM?t=2913

// GET /products - Retrieve all products
// router.route("/").get(getAllProducts);

// GET /products/:id - Retrieve a specific product by ID
// router.get("/:id", (req, res) => {
// Logic to fetch a product by its ID from the database
// });

// POST /products - Create a new product
// router.post("/", (req, res) => {
// Logic to create a new product using the data in req.body
// });

// PUT /products/:id - Update an existing product
// router.put("/:id", (req, res) => {
// Logic to update an existing product by its ID using the data in req.body
// });

// DELETE /products/:id - Delete an existing product
// router.delete("/:id", (req, res) => {
// Logic to delete a product by its ID from the database
// });

export default router;
