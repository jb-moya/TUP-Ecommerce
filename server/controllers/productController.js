import Product from "../models/Product.js";


const getSingleProduct = async (req, res) => {
    const { id } = req.params;

    // res.json(req.params.id);
    res.json({ id: req.params.id });
};

const createProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json({product});
};

const getAllProducts = async (req, res) => {
    const { id } = req.params;

    // res.status(200).json({ message: "OK ALL PRODUCT" });
    res.send("GET /products - Retrieve all products!");
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({ message: "OK DELETE PRODUCT" });
};

const updateProduct = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({ message: "OK UPDATE PRODUCT" });
};

export {
    getSingleProduct,
    getAllProducts,
    deleteProduct,
    updateProduct,
    createProduct,
};
