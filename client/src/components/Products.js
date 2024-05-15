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
                            className="border border-1 border-gray-300 rounded-md p-[2px] font-light m-[1px]"
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
                            className="border border-1 border-gray-300 rounded-md p-[2px] font-light m-[1px]"
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
                            className="border border-1 border-gray-300 rounded-md p-[2px] font-light m-[1px]"
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
            {/* <td className="p-2">
                <input type="checkbox" />
            </td> */}
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

const RangeInput = ({ label, min = 0, handleOnChange }) => (
    <div className="text-sm flex items-center mt-4">
        <div>{label}</div>
        <input
            className="rounded-md border text-xs border-[#211C6A] px-2 py-1 mx-2 w-16 text-gray-500 appearance-none outline-none bg-transparent"
            placeholder="Input"
            type="number"
            min={min}
            name="min"
            onChange={handleOnChange}
        />
        ~
        <input
            className="rounded-md border text-xs border-[#211C6A] px-2 py-1 mx-2 w-16 text-gray-500 appearance-none outline-none bg-transparent"
            placeholder="Input"
            type="number"
            name="max"
            onChange={handleOnChange}
        />
    </div>
);

const Products = () => {
    let location = useLocation();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(1);
    const [selectCategory, setselectCategory] = useState("");
    const [searchName, setSearchName] = useState("");
    const [productCount, setProductCount] = useState(0);
    const [minMaxStock, setMinMaxStock] = useState([0, 0]);
    const [outOfStock, setOutOfStock] = useState(false);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);
    const [minMaxSales, setMinMaxSales] = useState([0, 0]);
    const [selectedButton, setSelectedButton] = useState(1); // Changed initial value to 1 for Dashboard

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.has("keyword")) {
            setSearchName(searchParams.get("keyword"));
        }

        if (searchParams.has("minPrice") && searchParams.has("maxPrice")) {
            setMinMaxPrice([
                parseInt(searchParams.get("minPrice"), 10),
                parseInt(searchParams.get("maxPrice"), 10),
            ]);
        }

        if (searchParams.has("minPrice") && !searchParams.has("maxPrice")) {
            setMinMaxPrice([parseInt(searchParams.get("minPrice"), 10), 0]);
        }

        if (searchParams.has("maxPrice") && !searchParams.has("minPrice")) {
            // toast.info(`getting ${searchParams.get("maxPrice")}`);
            setMinMaxPrice([0, parseInt(searchParams.get("maxPrice"), 10)]);
        }
        if (searchParams.has("outOfStock")) {
            setOutOfStock(true);
        }
        if (searchParams.has("minStock") && !searchParams.has("maxStock")) {
            setMinMaxStock([parseInt(searchParams.get("minStock"), 10), 0]);
        }
        if (searchParams.has("maxStock") && !searchParams.has("minStock")) {
            setMinMaxStock([0, parseInt(searchParams.get("maxStock"), 10)]);
        }
        if (searchParams.has("minStock") && searchParams.has("maxStock")) {
            setMinMaxStock([
                parseInt(searchParams.get("minStock"), 10),
                parseInt(searchParams.get("maxStock"), 10),
            ]);
        }
        if (searchParams.has("minSales") && !searchParams.has("maxSales")) {
            setMinMaxSales([parseInt(searchParams.get("minSales"), 10), 0]);
        }
        if (searchParams.has("maxSales") && !searchParams.has("minSales")) {
            setMinMaxSales([0, parseInt(searchParams.get("maxSales"), 10)]);
        }
        if (searchParams.has("minSales") && searchParams.has("maxSales")) {
            setMinMaxSales([
                parseInt(searchParams.get("minSales"), 10),
                parseInt(searchParams.get("maxSales"), 10),
            ]);
        }
        if (searchParams.has("categories")) {
            // toast.info(`getting HAHA ${searchParams.get("categories")}`);
            setselectCategory(searchParams.get("categories"));
        }

        if (searchParams.has("page")) {
            // toast.info(`getting ${searchParams.get("page")}`);
            setCurrentPage(parseInt(searchParams.get("page"), 10));
        }
    }, [location.search]);

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    const delayedHandleSearchName = debounce((e) => {
        setSearchName(e.target.value);
    }, 1000);

    const delayedHandleMinMaxPrice = debounce((e) => {
        // handleMinMaxPrice(e);
        handleMinMaxInput(e, setMinMaxPrice);
    }, 1000);

    const delayedHandleMinMaxStock = debounce((e) => {
        // handleMinMaxStock(e);
        handleMinMaxInput(e, setMinMaxStock);
    }, 1000);

    const delayedHandleMinMaxSales = debounce((e) => {
        // handleMinMaxSales(e);
        handleMinMaxInput(e, setMinMaxSales);
    }, 1000);

    const numericFilters = useMemo(() => {
        const numericFiltersArray = [];

        console.log("minMaxSales :--", minMaxSales);

        if (minMaxPrice[0] > 0) {
            numericFiltersArray.push(`price>=${minMaxPrice[0]}`);
        }
        if (minMaxPrice[1] > 0) {
            numericFiltersArray.push(`price<=${minMaxPrice[1]}`);
        }
        if (outOfStock) {
            numericFiltersArray.push(`stock=0`);
        }
        if (minMaxStock[0] > 0) {
            numericFiltersArray.push(`stock>=${minMaxStock[0]}`);
        }
        if (minMaxStock[1] > 0) {
            numericFiltersArray.push(`stock<=${minMaxStock[1]}`);
        }
        if (minMaxSales[0] > 0) {
            numericFiltersArray.push(`soldCount>=${minMaxSales[0]}`);
        }
        if (minMaxSales[1] > 0) {
            numericFiltersArray.push(`soldCount<=${minMaxSales[1]}`);
        }

        return numericFiltersArray.join(",");
    }, [minMaxPrice, minMaxStock, minMaxSales, outOfStock]);

    const fetchProducts = useCallback(async () => {
        try {
            console.log("user", user);

            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        page: currentPage,
                        createdBy: user._id,
                        numericFilters: numericFilters,
                        categories: selectCategory ? selectCategory : "",
                        name: `${searchName ? searchName : ""}`,
                    },
                }
            );
            console.log("HAHAf", data.products);
            setProducts(data.products);
            setProductCount(data.count);
            setMaxPageCount(Math.ceil(data.count / 10));
        } catch (error) {
        } finally {
            toast.success("Products loaded successfully");
        }
    }, [currentPage, user, selectCategory, numericFilters, searchName]);

    useEffect(() => {
        // ensure that this only triggers when the location pathname only has /seller, nothing else
        if (location.pathname !== "/seller/productsOverview") {
            return;
        }

        fetchProducts();
        const params = [
            buildQueryParam("page", currentPage),
            buildQueryParam("keyword", searchName),
            buildQueryParam(
                "minPrice",
                minMaxPrice[0] > 0 ? minMaxPrice[0] : ""
            ),
            buildQueryParam(
                "maxPrice",
                minMaxPrice[1] > 0 ? minMaxPrice[1] : ""
            ),
            buildQueryParam("outOfStock", outOfStock ? "true" : ""),
            buildQueryParam(
                "minStock",
                minMaxStock[0] > 0 ? minMaxStock[0] : ""
            ),
            buildQueryParam(
                "maxStock",
                minMaxStock[1] > 0 ? minMaxStock[1] : ""
            ),
            buildQueryParam(
                "minSales",
                minMaxSales[0] > 0 ? minMaxSales[0] : ""
            ),
            buildQueryParam(
                "maxSales",
                minMaxSales[1] > 0 ? minMaxSales[1] : ""
            ),
            buildQueryParam("categories", selectCategory),
        ].filter(Boolean);

        console.log("params", params);

        const newUrl = `${location.pathname}?${params.join("&")}`;

        window.history.replaceState({ path: newUrl }, "", newUrl);
    }, [
        fetchProducts,
        currentPage,
        searchName,
        minMaxPrice,
        outOfStock,
        selectCategory,
        minMaxStock,
        minMaxSales,
        location.pathname,
    ]);

    useEffect(() => {
        toast.info(`minMaxPrice changed ${minMaxPrice}`);
        console.log("minMaxPrice DITO", minMaxPrice);
    }, [minMaxPrice]);

    const handleButtonClick = (buttonNumber) => {};

    const handleSoldOut = (buttonNumber) => {
        console.log(buttonNumber);
        setSelectedButton(buttonNumber);
        setOutOfStock(true);
    };

    const handleDefault = (buttonNumber) => {
        console.log(buttonNumber);
        setSelectedButton(buttonNumber);
        setOutOfStock(false);
    };

    const handleCategoryChange = (e) => {
        console.log(e.target.value);
        setselectCategory(e.target.value);
    };

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

    return (
        <div className="flex mx-auto select-none items-center ">
            <div className="flex flex-col w-full">
                <div className="text-3xl pl-4 font-bold text-[#211C6A] w-full mb-4">
                    My Products
                </div>
                <ul className="flex border-b-2 border-gray-200 w-full px-4 text-gray-500">
                    <li
                        onClick={() => handleDefault(1)}
                        className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 1
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        All
                    </li>
                    {/* <li
                        onClick={() => handleButtonClick(2)}
                        className={`p-4  mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 2
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Live
                    </li> */}
                    <li
                        onClick={() => handleSoldOut(2)}
                        className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 2
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Sold Out
                    </li>
                    {/* <li
                        onClick={() => handleButtonClick(4)}
                        className={`p-4 mr-4  cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 4
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Suspended 1
                    </li> */}
                    {/* <li
                        onClick={() => handleButtonClick(5)}
                        className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 5
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Unlisted
                    </li> */}
                </ul>

                <div className="flex flex-row w-full items-center justify-between">
                    <input
                        className=" appearance-none outline-none bg-transparent border border-[#211C6A] px-4 py-1 rounded-md w-[250px] mt-4 text-sm ml-6"
                        placeholder="Input Product Name"
                        onChange={delayedHandleSearchName}
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
                                    <option
                                        key={key}
                                        value={productCategories[key]}
                                    >
                                        {productCategories[key]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row w-full items-center justify-between pl-6">
                    {/* <RangeInput
                        label="Stock"
                        handleOnChange={delayedHandleMinMaxStock}
                    /> */}
                    <RangeInput
                        label="Price"
                        handleOnChange={delayedHandleMinMaxPrice}
                    />
                    <RangeInput
                        label="Sales"
                        handleOnChange={delayedHandleMinMaxSales}
                    />
                </div>

                {/* <div className="mt-6 ml-6 text-sm">
                    <button className="p-2 bg-[#211C6A] text-white rounded-md hover:bg-opacity-50 w-24 transition ease-in-out duration-300">
                        Search
                    </button>
                    <button className="p-2 bg-transparent text-[#211C6A] hover:bg-gray-300 border w-24  border-[#211C6A] rounded-md ml-4">
                        Reset
                    </button>
                </div> */}

                <div className="flex flex-col mt-10 ml-6">
                    <div className="flex  justify-between items-center">
                        <div className="text-xl font-semibold">
                            {productCount ? productCount : "..."} Products
                        </div>

                        <div className="flex justify-between items-center">
                            <Link
                                to="/seller/addeditProduct"
                                className="flex  items-center justify-center bg-[#211C6A] text-white rounded-md mr-4 px-4 py-3 cursor-pointer hover:bg-opacity-50 transition ease-in-out duration-300"
                            >
                                <FaPlus className="mr-2" />
                                Add a New Product
                            </Link>
                            <div className="flex items-center justify-center bg-red-600 text-white rounded-md px-4 py-3 cursor-pointer hover:bg-opacity-50 transition ease-in-out duration-300">
                                <FaTrash className="mr-2" />
                                Delete Product
                            </div>
                        </div>
                    </div>

                    <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
                        <thead>
                            <tr className="text-left bg-gray-300">
                                {/* <th className="p-2">
                                    <input type="checkbox" />
                                </th> */}
                                <th className="p-2">img</th>
                                <th className="p-2">Product Name</th>
                                <th className="p-2">Price</th>
                                <th className="p-2">Sold Count</th>
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
                                    deleteProduct={() =>
                                        handleDeleteProduct(product._id)
                                    }
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
};

export default Products;
