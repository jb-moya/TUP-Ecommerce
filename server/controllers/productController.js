const getSingleProduct = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({ message: "OK SINGLE PRODUCT" });
};

const getAllProducts = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({ message: "OK ALL PRODUCT" });
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({ message: "OK DELETE PRODUCT" });
};

const updateProduct = async (req, res) => {
    const { id } = req.params;

    res.status(200).json({ message: "OK UPDATE PRODUCT" });
}

export { 
    getSingleProduct, 
    getAllProducts, 
    deleteProduct,
    updateProduct,
};
