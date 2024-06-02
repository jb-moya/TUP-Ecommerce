import React, { useEffect, useMemo, useState, useCallback } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import PaginationButtons from "./PaginationButtons.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import defaultProfileImage from "../Assets/defaultPP.png";
import handleMinMaxInput from "./utils/handleMinMaxInput.js";
import debounce from "./utils/debounce.js";
import {
    buildQueryParam,
    buildQueryArrayParam,
} from "./utils/buildQueryParams.js";
import { useLocation, useNavigate, Link } from "react-router-dom";
import ConfirmationModal from "./Confirmation.js";

const NoImage = () => {
    return (
        <div className="w-full h-full text-xs bg-slate-200 flex text-[#abb7c5] justify-center items-center rounded">
            n/a
        </div>
    );
};

const ProductRow = ({ product, index, deleteProduct }) => {
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

    /* <th className="p-2">img</th>
    <th className="p-2">Product Name</th>
    <th className="p-2 text-center">Variation Class</th>
    <th className="p-2">Variation</th>
    <th className="p-2">Violation Type</th>
    <th className="p-2">Violation Reason</th>
    <th className="p-2">Suggestion</th>
    <th className="p-2">Category</th>
    <th className="p-2">Actions</th> */

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
        // console.log("Product Deleted");
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
            {/* <td className="p-2">
                <input type="checkbox" />
            </td> */}
            <td className="w-12 h-12 flex items-center">{renderImage()}</td>
            <td>
                <div className="px-1">{product.name}</div>
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
            {/* <th className="p-2">Violation Type</th>
            <th className="p-2">Violation Reason</th>
            <th className="p-2">Suggestion</th> */}
            <td className="p-1">{product.category}</td>

            <td className="">
                {/* <td className="text-center"> */}
                <button
                    type="button"
                    className="hover:scale-[1.15] hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] w-full cursor-pointer"
                >
                    <Link
                        to={`/seller/addeditProduct/${product._id}`}
                        className="button-link"
                    >
                        Edit
                    </Link>
                </button>
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

const ProductViolation = () => {
    const location = useLocation();
    const { user } = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);
    const [productCount, setProductCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(1);
    const [searchName, setSearchName] = useState("");
    // const [selectedProducts, setSelectedProducts] = useState([]);
    // const [areAllProductsSelected, setAreAllProductsSelected] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.has("keyword")) {
            setSearchName(searchParams.get("keyword"));
        }

        if (searchParams.has("page")) {
            setCurrentPage(parseInt(searchParams.get("page")));
        }
    }, [location.search]);

    const fetchProducts = useCallback(async () => {
        try {
            // console.log("user", user);

            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        page: currentPage,
                        createdBy: user._id,
                        hasViolation: true,
                        populatedFields: "violation",
                        // numericFilters: numericFilters,
                        // categories: selectCategory ? selectCategory : "",
                        name: `${searchName ? searchName : ""}`,
                    },
                }
            );
            // console.log("HAHAf", data.products);
            setProducts(data.products);
            setProductCount(data.count);
            setMaxPageCount(Math.ceil(data.count / 10));
        } catch (error) {
        } finally {
            // toast.success("Products loaded successfully");
        }
    }, [currentPage, user, searchName]);

    useEffect(() => {
        fetchProducts();

        const params = [
            buildQueryParam("page", currentPage),
            buildQueryParam("keyword", searchName),
            // buildQueryParam("category", selectCategory),
            // buildQueryParam("minPrice", minPrice),
        ].filter(Boolean);

        const newUrl = `${location.pathname}?${params.join("&")}`;
        window.history.replaceState({ path: newUrl }, "", newUrl);
    }, [currentPage, fetchProducts, location.pathname]);

    const delayedHandleSearchName = debounce((e) => {
        setSearchName(e.target.value);
    }, 1000);

    return (
        <div>
            <div className="flex flex-col w-full">
                <div className="text-3xl pl-4 font-bold text-[#211C6A] w-full mb-4">
                    Product Violations
                </div>
                <input
                    className=" appearance-none outline-none bg-transparent border border-[#211C6A] px-4 py-1 rounded-xl w-[250px] mt-4 text-sm ml-6"
                    placeholder="Input Product Name"
                    onChange={delayedHandleSearchName}
                />
                <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
                    <thead>
                        <tr className="text-left bg-gray-300">
                            {/* <th className="p-2">
                            <input type="checkbox" />
                        </th> */}
                            <th className="p-2">img</th>
                            <th className="p-2">Product Name</th>
                            <th className="p-2 text-center">Variation Class</th>
                            <th className="p-2">Variation</th>
                            <th className="p-2">Violation Type</th>
                            <th className="p-2">Violation Reason</th>
                            <th className="p-2">Suggestion</th>
                            <th className="p-2">Category</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {/* {products.map((product, index) => (
                        <ProductRow
                            key={product._id}
                            index={index}
                            product={product}
                            deleteProduct={() =>
                                handleDeleteProduct(product._id)
                            }
                        />
                    ))} */}
                    </tbody>
                </table>
                <PaginationButtons
                    currentPage={currentPage}
                    maxPageCount={maxPageCount}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ProductViolation;
