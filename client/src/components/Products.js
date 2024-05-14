import React, { useEffect, useState, useCallback } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import PaginationButtons from "./PaginationButtons.js";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import defaultProfileImage from "../Assets/defaultPP.png";

axios.defaults.withCredentials = true;

const productCategories = {
    1: "Electronics",
    2: "Clothing",
    3: "Shoes",
    4: "Books",
    5: "Beauty",
    6: "Health",
    7: "Home",
    8: "Garden",
    9: "Toys",
    10: "Sports",
    11: "Outdoors",
    12: "Automotive",
    13: "Accessories",
    14: "Industrial",
    15: "Handmade",
    16: "Other",
};

const NoImage = () => {
    return (
        <div className="w-full h-full text-xs bg-slate-200 flex text-[#abb7c5] justify-center items-center rounded">
            n/a
        </div>
    );
};

const ProductRow = ({ product, index }) => {
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

    const renderStock = () => {
        if (product.stock) {
            return product.stock;
        }
        if (product.variation.length > 0) {
            const totalStock = product.variation.reduce(
                (total, v) => total + v.stock,
                0
            );

            return (
                <>
                    {product.variation.map((v) => (
                        <div key={v.name}>{`${v.name} (${v.stock})`}</div>
                    ))}
                    <div className="font-light">total: {totalStock}</div>
                </>
            );
        }
        return "error";
    };

    const renderVariationNames = () => {
        if (product.variation.length > 0) {
            return product.variation.map((v) => v.name).join(", ");
        }
        return "n/a";
    };

    return (
        <tr
            className={
                index % 2 === 0
                    ? "border-t text-xs"
                    : "border-t text-xs bg-slate-200"
            }
        >
            <td className="p-2">
                <input type="checkbox" />
            </td>
            <td className="w-12 h-12 flex items-center">{renderImage()}</td>
            <td>
                <div className="px-1">{product.name}</div>
            </td>
            <td
                className={
                    product.variation.length > 0 ? "p-1 flex-col" : "p-1"
                }
            >
                {renderStock()}
            </td>
            <td className="p-1">{product.variationClass || "n/a"}</td>
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
            <td className="p-1 text-center">
                <div>Edit</div>
                <div className="text-red-300">Delete</div>
            </td>
        </tr>
    );
};

const RangeInput = ({ label }) => (
    <div className="text-sm flex items-center mt-4 ml-6">
        <div>{label}</div>
        <input
            className="rounded-md border border-[#211C6A] px-2 py-1 mx-2 w-16 text-gray-500 appearance-none outline-none bg-transparent"
            placeholder="Input"
        />
        ~
        <input
            className="rounded-md border border-[#211C6A] px-2 py-1 w-16 ml-4 text-gray-500 appearance-none outline-none bg-transparent"
            placeholder="Input"
        />
    </div>
);

export default function Products() {
    const { user } = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(1);
    const [selectCategory, setselectCategory] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [productCount, setProductCount] = useState(0);
    const [minMaxStock, setMinMaxStock] = useState([0, 0]);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);
    const [minMaxSales, setMinMaxSales] = useState([0, 0]);

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    const fetchProducts = useCallback(async () => {
        try {
            console.log("user", user);

            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        page: currentPage,
                        createdBy: user._id,
                    },
                }
            );
            setProducts(data.products);
            console.log("HAHAf", data.products);
            setProductCount(data.productTotalCount);
            setMaxPageCount(Math.ceil(data.productTotalCount / 10));
        } catch (error) {
        } finally {
            toast.success("Products loaded successfully");
        }
    }, [currentPage, user, user._id]);

    const debounce = (func, delay) => {
        let timeoutId;

        return (...args) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, currentPage]);

    const [selectedButton, setSelectedButton] = useState(1); // Changed initial value to 1 for Dashboard

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    const handleCategoryChange = (e) => {
        console.log(e.target.value);
        setselectCategory(e.target.value);
    };

    useEffect(() => {
        random(1, 200);
        random2(1, 200);
    }, []);
    
    // what 

    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    
    const random2 = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <div className="flex mx-auto select-none items-center ">
            <div className="flex flex-col w-full">
                <div className="text-3xl pl-4 font-bold text-[#211C6A] w-full mb-4">
                    My Products
                </div>
                <ul className="flex border-b-2 border-gray-200 w-full px-4 text-gray-500">
                    <li
                        onClick={() => handleButtonClick(1)}
                        className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 1
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        All
                    </li>
                    <li
                        onClick={() => handleButtonClick(2)}
                        className={`p-4  mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 2
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Live
                    </li>
                    <li
                        onClick={() => handleButtonClick(3)}
                        className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 3
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Sold Out
                    </li>
                    <li
                        onClick={() => handleButtonClick(4)}
                        className={`p-4 mr-4  cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 4
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Suspended 1
                    </li>
                    <li
                        onClick={() => handleButtonClick(5)}
                        className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 5
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Unlisted
                    </li>
                </ul>

                <div className="flex flex-row w-full items-center justify-between">
                    <input
                        className=" appearance-none outline-none bg-transparent border border-[#211C6A] px-4 py-1 rounded-md w-[250px] mt-4 text-sm ml-6"
                        placeholder="Input Product Name"
                    />

                    <div className="text-sm flex items-center mt-4 ml-6">
                        <div className="flex items-center text-sm">
                            Category
                            <select
                                className="ml-4 border border-[#211C6A] w-[200px] rounded-md p-1 bg-transparent outline-none"
                                onChange={handleCategoryChange}
                            >
                                <option value="">All</option>
                                {Object.keys(productCategories).map((key) => (
                                    <option key={key} value={productCategories[key]}>
                                        {productCategories[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-full items-center justify-between">
                    <RangeInput label="Stock" />
                    <RangeInput label="Price" />
                    <RangeInput label="Sales" />
                </div>

                <div className="mt-6 ml-6 text-sm">
                    <button className="p-2 bg-[#211C6A] text-white rounded-md hover:bg-opacity-50 w-24 transition ease-in-out duration-300">
                        Search
                    </button>
                    <button className="p-2 bg-transparent text-[#211C6A] hover:bg-gray-300 border w-24  border-[#211C6A] rounded-md ml-4">
                        Reset
                    </button>
                </div>

                <div className="flex flex-col mt-10 ml-6">
                    <div className="flex  justify-between items-center">
                        <div className="text-xl font-semibold">
                            {productCount ? productCount : "..."} Products
                        </div>

                        <div className="flex justify-between items-center">
                            <div className="flex items-center justify-center bg-[#211C6A] text-white rounded-md mr-4 px-4 py-3 cursor-pointer hover:bg-opacity-50 transition ease-in-out duration-300">
                                <FaPlus className="mr-2" />
                                Add a New Product
                            </div>
                            <div className="flex items-center justify-center bg-red-600 text-white rounded-md px-4 py-3 cursor-pointer hover:bg-opacity-50 transition ease-in-out duration-300">
                                <FaTrash className="mr-2" />
                                Delete Product
                            </div>
                        </div>
                    </div>

                    <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
                        <thead>
                            <tr className="text-left bg-gray-300">
                                <th className="p-2">
                                    <input type="checkbox" />
                                </th>
                                {/* Moved the Select header here */}
                                <th className="p-2">img</th>
                                <th className="p-2">Product Name</th>
                                <th className="p-2">
                                    Stocks / variants' stock
                                </th>
                                <th className="p-2 text-center">
                                    Variation Class
                                </th>
                                <th className="p-2">Variation</th>
                                <th className="p-2">Category</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="">
                            {products.map((product, index) => (
                                <ProductRow
                                    key={product._id}
                                    index={index}
                                    product={product}
                                />
                            ))}
                        </tbody>
                    </table>

                    <PaginationButtons
                        pageCount={maxPageCount > 0 ? maxPageCount : 1}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}
