import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import defaultProfileImage from "../Assets/defaultPP.png";
import { Link } from "react-router-dom";
import ConfirmationModal from "../components/Confirmation.js";
import { NavBar } from "../components/NavBar.js";
import Footer from "../components/Footer.js";

axios.defaults.withCredentials = true;

const NoImage = () => {
    return (
        <div className="w-full h-full text-xs bg-slate-200 flex text-[#abb7c5] justify-center items-center rounded">
            n/a
        </div>
    );
};

const ProductRow = ({ product, index, selectedButton, deleteProduct }) => {
    const renderImage = () => {
        if (product.image.length) {
            return (
                <img
                    src={product.image[0] || defaultProfileImage}
                    className="w-12 h-12 rounded"
                    alt=""
                />
            );
        }
        return <NoImage />;
    };

    const renderPrice = () => {
        if (product.price !== -1) {
            return product.price;
        }

        if (product.variation.length > 0) {
            return (
                <>
                    {product.variation.map((v, index) => (
                        <div
                            key={`${v.name}${index}`}
                            className="border border-1 border-gray-300 rounded-xl p-[2px] font-light m-[1px]"
                        >{`${v.name} (${v.price})`}</div>
                    ))}
                </>
            );
        }
        return product.price;
    };

    const renderStock = () => {
        console.log(
            "product HANEP NA YAN stockkkk",
            product.name,
            product.stock
        );
        if (product.variation.length > 0) {
            const totalStock = product.variation.reduce(
                (total, v) => total + v.stock,
                0
            );

            return (
                <>
                    {product.variation.map((v) => (
                        <div
                            className="border border-1 border-gray-300 rounded-xl p-[2px] font-light m-[1px]"
                            key={v.name}
                        >{`${v.name} (${v.stock})`}</div>
                    ))}
                    <div className="font-light">total: {totalStock}</div>
                </>
            );
        } else if (product.stock && product.stock !== -1) {
            return product.stock;
        } else if (product.stock === 0) {
            return <div className="text-red-400">SOLD OUT</div>;
        } else {
            return "error";
        }
    };

    const renderVariationNames = () => {
        if (product.variation.length > 0) {
            return (
                <>
                    {product.variation.map((v) => (
                        <div
                            key={v.name}
                            className="border border-1 border-gray-300 rounded-xl p-[2px] font-light m-[1px]"
                        >
                            {v.name}
                        </div>
                    ))}
                </>
            );
        }
        return "n/a";
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmDelete = () => {
        console.log("Product Deleted");
        deleteProduct();
        setIsModalOpen(false);
    };

    return (
        <tr
            className={
                index % 2 === 0
                    ? "border-t text-xs"
                    : "border-t text-xs bg-slate-200"
            }
        >
            <td className="w-12 h-12 flex items-center">{renderImage()}</td>
            <td>
                <div className="px-1">{product.name}</div>
            </td>
            <td className={product.price === -1 ? "p-1 flex-col" : "p-1"}>
                {renderPrice()}
            </td>
            <td className="p-1">{product.soldCount}</td>
            <td
                className={
                    product.variation.length > 0 ? "p-1 flex-col" : "p-1"
                }
            >
                {renderStock()}
            </td>
            <td
                className={
                    product.variationClass
                        ? "p-1"
                        : "p-1 font-light text-gray-400"
                }
            >
                {product.variationClass || "n/a"}
            </td>
            <td
                className={`p-1 text-left ${
                    product.variation.length === 0
                        ? "text-gray-400 font-light"
                        : ""
                }`}
            >
                {renderVariationNames()}
            </td>
            <td className="p-1">{product.category}</td>
            <td className="p-1">{product.productStatus}</td>
            <td className="">
                {product.productStatus === "enabled" && (
                    <button
                        type="button"
                        className="hover:scale-[1.15] hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] w-full cursor-pointer"
                    >
                        <Link
                            to={`/admin/addProductViolation/${product._id}`}
                            className="button-link"
                        >
                            Add Violation
                        </Link>
                    </button>
                )}
                {product.productStatus === "pending" && (
                    <button
                        type="button"
                        className="hover:scale-[1.15] hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] w-full cursor-pointer"
                    >
                        <Link
                            to={`/admin/product-review-form/${product._id}`}
                            className="button-link text-blue-500 hover:text-blue-700"
                        >
                            Review
                        </Link>
                    </button>
                )}
                <>
                    <button
                        type="button"
                        className="hover:scale-[1.15] hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] hover:text-red-500 text-red-300 cursor-pointer w-full"
                        onClick={handleOpenModal}
                    >
                        Delete
                    </button>
                    {isModalOpen && (
                        <ConfirmationModal
                            className="transition-none ease-out duration-300"
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            onConfirm={handleConfirmDelete}
                        />
                    )}
                </>
            </td>
        </tr>
    );
};

const productStatus = {
    0: "",
    1: "pending",
    2: "enabled",
    3: "disabled",
};

export const ManageProducts = () => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [products, setProducts] = useState([]);
    const [pendingProductCount, setPendingProductCount] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(1);

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    const fetchPendingProduct = useCallback(async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        page: currentPage,
                        productStatus: productStatus[selectedButton],
                    },
                }
            );

            console.log(`violated product`, data);
            setProducts(data.products);
            setPendingProductCount(data.products.length);
            setMaxPageCount(Math.ceil(data.count / 10));
        } catch (error) {
            console.error(error);
        } finally {
            toast.success("Products loaded successfully");
        }
    }, [currentPage, selectedButton]);

    const handleDeleteProduct = (productID) => {
        try {
            axios.delete(`http://localhost:5000/api/v1/products/${productID}`);
            setProducts(
                products.filter((product) => product._id !== productID)
            );
            toast.success("Product deleted successfully");
        } catch (error) {
            toast.error("Error deleting product");
        }
    };

    useEffect(() => {
        fetchPendingProduct();
    }, [fetchPendingProduct]);

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
            <ul className="flex border-b-2 border-gray-200 w-full px-4 text-gray-500">
                <li
                    onClick={() => handleButtonClick(0)}
                    className={`p-4 cursor-pointer hover:border-b-2 mr-4 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 0
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    All
                </li>
                <li
                    onClick={() => handleButtonClick(1)}
                    className={`p-4 cursor-pointer hover:border-b-2  mr-4  hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 1
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Pending Products
                </li>
                <li
                    onClick={() => handleButtonClick(2)}
                    className={`p-4 cursor-pointer hover:border-b-2  mr-4  hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 2
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Approved Products
                </li>
            </ul>

            <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
                <thead>
                    <tr className="text-left bg-gray-300">
                        <th className="p-2">img</th>
                        <th className="p-2">Product Name</th>
                        <th className="p-2">Price</th>
                        <th className="p-2">Sold Count</th>
                        <th className="p-2">Stocks / variants' stock</th>
                        <th className="p-2 text-center">Variation Class</th>
                        <th className="p-2">Variation</th>
                        <th className="p-2">Category</th>
                        <th className="p-2">Status</th>
                        <th className="p-2">Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {products.map((product, index) => (
                        <ProductRow
                            key={product._id}
                            index={index}
                            product={product}
                            selectedButton={selectedButton}
                            deleteProduct={() =>
                                handleDeleteProduct(product._id)
                            }
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
