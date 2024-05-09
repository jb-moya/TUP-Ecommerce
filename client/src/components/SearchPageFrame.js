import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductCard from "./ProductCard.js";
import { useSelector, useDispatch } from "react-redux";
import { setSearchClicked } from "../features/searchSlice.js";
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";
import StarRating from "./StarRating.js";
import PaginationButtons from "./PaginationButtons";
import { DropDownMenu } from "./utils/Dropdown";
import { m } from "framer-motion";
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

const minRatingComp = (currentMinRating, handleMinRating) => {
    const selectedStyle =
        "flex px-3 py-2 items-center w-full border-2 bg-[#BCBAD2] border-opacity-8 hover:border-[#211C6A] hover:border-opacity-1 transition ease-in-out delay-50 rounded-3xl";

    const unselectedStyle =
        "flex px-3 py-1 items-center w-full rounded hover:bg-gray-200 transition ease-in-out delay-50 hover:scale-[1.05] rounded-3xl";

    return (
        <>
            {[5, 4, 3, 2, 1, 0].map((rate, index) => (
                <button
                    key={index}
                    className={
                        currentMinRating === parseInt(rate, 10)
                            ? selectedStyle
                            : unselectedStyle
                    }
                    value={rate}
                    onClick={handleMinRating}
                >
                    <StarRating defaultRating={rate} disableAction={true} />
                    <div className="text-sm text-gray-800">({rate})</div>
                </button>
            ))}
        </>
    );
};

export const SearchPageFrame = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [productCount, setProductCount] = useState(0);
    const [maxPageCount, setMaxPageCount] = useState(0);
    const searchClicked = useSelector((state) => state.search.searchClicked);
    const [toggleDateSort, setToggleDateSort] = useState(1);
    const [toggleNameSort, setToggleNameSort] = useState(1);
    const [togglePriceSort, setTogglePriceSort] = useState(1);
    const [sortCategories, setSortCategories] = useState([]);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);
    const [minRating, setMinRating] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("keyword")) {
            setSearchName(urlParams.get("keyword"));
        }

        if (urlParams.has("minPrice") && urlParams.has("maxPrice")) {
            setMinMaxPrice([
                parseInt(urlParams.get("minPrice"), 10),
                parseInt(urlParams.get("maxPrice"), 10),
            ]);
        }

        if (urlParams.has("minPrice") && !urlParams.has("maxPrice")) {
            setMinMaxPrice([parseInt(urlParams.get("minPrice"), 10), 0]);
        }

        if (urlParams.has("maxPrice") && !urlParams.has("minPrice")) {
            setMinMaxPrice([0, parseInt(urlParams.get("maxPrice"), 10)]);
        }

        if (urlParams.has("minRating")) {
            setMinRating(parseInt(urlParams.get("minRating"), 10));
        }

        if (urlParams.has("categories")) {
            setSortCategories(urlParams.get("categories").split(","));
        }

        if (urlParams.has("dateSort")) {
            setToggleDateSort(parseInt(urlParams.get("dateSort"), 10));
        }

        if (urlParams.has("nameSort")) {
            setToggleNameSort(parseInt(urlParams.get("nameSort"), 10));
        }
    }, []);

    const handleMinMaxPrice = (e) => {
        e.preventDefault();

        e.value = parseFloat(e.value);

        const { name, value } = e.target;
        let newValue = parseFloat(value);

        if (name === "min") {
            if (newValue < 0) {
                e.value = 0;
                newValue = 0;
            }

            e.value = newValue;
        } else {
            if (newValue < 0) {
                e.value = minMaxPrice[0];
                newValue = minMaxPrice[0];
            }

            e.value = newValue;
        }

        setMinMaxPrice((prevState) => {
            if (name === "min") {
                return [newValue, prevState[1]];
            } else {
                return [prevState[0], newValue];
            }
        });
    };

    const debounce = (func, delay) => {
        let timeoutId;

        return (...args) => {
            clearTimeout(timeoutId);

            timeoutId = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    const delayedHandleMinMaxPrice = debounce((e) => {
        handleMinMaxPrice(e);
    }, 1000);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        name: `${searchName ? searchName : ""}`,
                        numericFilters: `${
                            minMaxPrice[0] > 0 ? `price>=${minMaxPrice[0]}` : ""
                        }${
                            minMaxPrice[1] > 0
                                ? `,price<=${minMaxPrice[1]}`
                                : ""
                        }${
                            minRating > 0 ? `,averageRating>=${minRating}` : ""
                        }`,
                        categories:
                            sortCategories.length > 0
                                ? sortCategories.join(",")
                                : "",
                        sort: [
                            [
                                "createdAt",
                                toggleDateSort === 1
                                    ? "ascending"
                                    : "descending",
                            ],
                            [
                                "name",
                                toggleNameSort === 1
                                    ? "ascending"
                                    : "descending",
                            ],
                        ],
                        page: currentPage,
                    },
                }
            );
            console.log("Products", data);
            setProducts(data.products);
            setProductCount(data.count);

            // toast.success(`Products fetched successfully ${data.count}`);
            setMaxPageCount(Math.ceil(data.count / 10));

            navigate(
                `/search?${searchName ? `keyword=${searchName}` : ""}${
                    minMaxPrice[0] > 0 ? `&minPrice=${minMaxPrice[0]}` : ""
                }${minMaxPrice[1] > 0 ? `&maxPrice=${minMaxPrice[1]}` : ""}${
                    minRating > 0 ? `&minRating=${minRating}` : ""
                }${
                    sortCategories.length > 0
                        ? `&categories=${sortCategories.join(",")}`
                        : ""
                }${toggleDateSort !== 1 ? `&dateSort=${toggleDateSort}` : ""}${
                    toggleNameSort !== 1 ? `&nameSort=${toggleNameSort}` : ""
                }`
            );

            // toast.success(`url: /search?${urlParams.toString()}`);
        } catch (error) {
            // console.log(error);
        }
    };

    const handleToggleCategory = (e) => {
        const { value } = e.currentTarget;

        setSortCategories((prevState) => {
            if (prevState.includes(value)) {
                return prevState.filter((category) => category !== value);
            } else {
                return [...prevState, value];
            }
        });
    };

    const handleMinRating = (e) => {
        const { value } = e.currentTarget;
        setMinRating(parseInt(value, 10));
    };

    useEffect(() => {
        if (searchClicked) {
            fetchProducts();
            const timer = setTimeout(() => {
                dispatch(setSearchClicked(false));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [searchClicked, dispatch]);

    useEffect(() => {
        fetchProducts();
    }, [
        searchName,
        minMaxPrice,
        toggleDateSort,
        toggleNameSort,
        togglePriceSort,
        minRating,
        sortCategories,
        currentPage,
        navigate,
    ]);

    return (
        <div>
            <div className="flex max-w-[1240px] pt-[90px] mx-auto select-none p-4 mt-4 text-[#211C6A] ">
                <div className="flex flex-col h-full w-[250px] p-2">
                    <div className="font-bold text-3xl ">Filters</div>
                    <hr className="border-t border-gray-300" />
                    <div className="flex flex-col">
                        <div className="py-2 px-2 font-semibold text-lg bg-gray-100">
                            Price Range
                        </div>
                        <div className="flex flex-row items-center">
                            <div>
                                <input
                                    className="rounded border border-gray-300 appearance-none outline-none w-[80px] px-2 py-1 text-sm text-gray-800"
                                    type="number"
                                    placeholder="₱ MIN"
                                    min={0}
                                    name="min"
                                    onChange={delayedHandleMinMaxPrice}
                                />
                            </div>
                            <hr className="border border-gray-300 flex-grow mx-2"></hr>
                            <div>
                                <input
                                    className="rounded border border-gray-300 appearance-none outline-none w-[80px] px-2 py-1  text-sm text-gray-800"
                                    type="number"
                                    placeholder="₱ MAX"
                                    name="max"
                                    onChange={delayedHandleMinMaxPrice}
                                />
                            </div>
                        </div>
                        <div className="py-2 px-2 font-semibold text-lg bg-gray-100">
                            Minimum Rating
                        </div>
                        <div className="">
                            {minRatingComp(minRating, handleMinRating)}
                        </div>
                        <div className="py-2 px-2 font-semibold text-lg bg-gray-100">
                            Categories
                        </div>
                        <div className="pl-4 pt-1">
                            {Object.keys(productCategories).map((key) => (
                                <div key={key}>
                                    <input
                                        type="checkbox"
                                        id={key}
                                        name={productCategories[key]}
                                        value={productCategories[key]}
                                        onChange={handleToggleCategory}
                                    />
                                    <label
                                        className="pl-2"
                                        htmlFor={productCategories[key]}
                                    >
                                        {productCategories[key]}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Left Container */}
                <div className="flex flex-col w-full">
                    <div className="flex text-[#211C6A] mb-4 mr-4 items-center justify-between">
                        <div className="font-bold text-[30px] py-2 px-2">
                            Search results for "{searchName}"
                        </div>

                        <div>
                            <button
                                className={
                                    toggleDateSort === 1
                                        ? "py-1 px-2 mr-2 rounded bg-[#211C6A] text-white"
                                        : "py-1 px-2 mr-2 rounded bg-white text-[#211C6A]"
                                }
                                onClick={() =>
                                    setToggleDateSort(-toggleDateSort)
                                }
                            >
                                {toggleDateSort === 1 ? "Latest" : "Oldest"}
                            </button>
                            <button
                                className={
                                    toggleNameSort === 1
                                        ? "py-1 px-2 mr-2 rounded bg-[#211C6A] text-white"
                                        : "py-1 px-2 mr-2 rounded bg-white text-[#211C6A]"
                                }
                                onClick={() =>
                                    setToggleNameSort(-toggleNameSort)
                                }
                            >
                                {toggleNameSort === 1 ? (
                                    <div className="flex">
                                        <div className="pr-1">Name </div>{" "}
                                        <FaCaretUp />
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <div className="pr-1">Name </div>{" "}
                                        <FaCaretDown />
                                    </div>
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-9 mx-4">
                        {products.length !== 0 ? (
                            products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                        ) : (
                            <div>...Loading Products...</div>
                        )}
                    </div>
                    <PaginationButtons
                        pageCount={maxPageCount > 0 ? maxPageCount : 1}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
};
