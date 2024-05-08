import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductCard from "./ProductCard.js";
import { useSelector, useDispatch } from "react-redux";
import { setSearchClicked } from "../features/searchSlice.js";
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";
import StarRating from "./StarRating.js";
axios.defaults.withCredentials = true;

export const SearchPageFrame = () => {
    const searchClicked = useSelector((state) => state.search.searchClicked);
    const dispatch = useDispatch();
    const [selectedOption, setSelectedOption] = useState({
        name: 1,
        createdAt: -1,
    });
    const [toggleDateSort, setToggleDateSort] = useState(1);
    const [toggleNameSort, setToggleNameSort] = useState(1);
    const [togglePriceSort, setTogglePriceSort] = useState(1);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);
    const [minRating, setMinRating] = useState(5);
    const [searchName, setSearchName] = useState("");
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    const handleMinMaxPrice = (e) => {
        e.preventDefault();

        e.value = parseFloat(e.value);

        const { name, value } = e.target;
        let newValue = parseFloat(value); // Convert value to number

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
                return [newValue, prevState[1]]; // Update min value
            } else {
                return [prevState[0], newValue]; // Update max value
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

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    const handleSeeMore = () => {
        // Navigate to the desired route
        // navigate('/');
    };

    const fetchProducts = async () => {
        const urlParams = new URLSearchParams(window.location.search);
        const keyword = urlParams.get("keyword");
        setSearchName(keyword);

        try {
            toast.success(
                `${toggleDateSort} ga ${toggleNameSort} ${togglePriceSort} ${minMaxPrice[0]} ${minMaxPrice[1]}`
            );

            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        name: keyword,
                        numericFilters: `${
                            minMaxPrice[0] > 0 ? `price>=${minMaxPrice[0]}` : ""
                        }${
                            minMaxPrice[1] > 0
                                ? `,price<=${minMaxPrice[1]}`
                                : ""
                        }${
                            minRating > 0 ? `,averageRating>=${minRating}` : ""
                        }`,
                        // limit,
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
                    },
                }
            );
            console.log("Products", data);
            toast.success("Products fetched successfully");
            setProducts(data.products);
        } catch (error) {
            console.log(error);
        }
    };

    const handleMinRating = (e) => {
        toast.success(`Min Rating: ${e.currentTarget.value}`);
        const { value } = e.currentTarget;
        setMinRating(value);
    };

    useEffect(() => {
        if (searchClicked) {
            fetchProducts();

            // Reset the searchClicked state to false
            const timer = setTimeout(() => {
                dispatch(setSearchClicked(false));
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [searchClicked, dispatch]);

    useEffect(() => {
        fetchProducts();
        // delayedFetchProducts();
    }, [
        selectedOption,
        minMaxPrice,
        toggleDateSort,
        toggleNameSort,
        togglePriceSort,
        minRating,
    ]);

    return (
        <div>
            <div className="flex max-w-[1240px] pt-[90px] mx-auto select-none p-4 mt-4 text-[#211C6A] ">
                <div className="flex flex-col h-full w-[250px] p-2">
                    <div className="font-bold text-3xl ">Filters</div>
                    <hr className="border-t border-gray-300" />
                    <div className="flex flex-col">
                        <div className="py-4 px-2 font-semibold text-lg">
                            Price Range
                        </div>
                        <div className="flex flex-row items-center">
                            <div>
                                {/* <label className="text-sm">min</label> */}
                                <input
                                    className="rounded border border-gray-300 appearance-none outline-none w-[80px] px-2 py-1 text-sm text-gray-800"
                                    type="number"
                                    placeholder="₱ MIN"
                                    min={0}
                                    name="min"
                                    // value={minMaxPrice[0]}
                                    onChange={delayedHandleMinMaxPrice}
                                />
                            </div>
                            <hr className="border border-gray-300 flex-grow mx-2"></hr>
                            <div>
                                {/* <label className="text-sm">max</label> */}
                                <input
                                    className="rounded border border-gray-300 appearance-none outline-none w-[80px] px-2 py-1  text-sm text-gray-800"
                                    type="number"
                                    placeholder="₱ MAX"
                                    name="max"
                                    // value={minMaxPrice[1]}
                                    onChange={delayedHandleMinMaxPrice}
                                />
                            </div>
                        </div>
                        <div className="py-2 px-2 font-semibold text-lg">
                            Minimum Rating
                        </div>
                        <div className="">
                            <button
                                className="flex p-1 items-center w-full border border-opacity-0 hover:border-[#211C6A] hover:border-opacity-1 hover:scale-[1.05] transition ease-in-out delay-50 rounded"
                                value={5}
                                onClick={handleMinRating}
                            >
                                <StarRating
                                    defaultRating={5}
                                    disableAction={true}
                                />
                                <div className="text-sm text-gray-800">(5)</div>
                            </button>
                            <button
                                className="flex p-1 items-center w-full border border-opacity-0 hover:border-[#211C6A] hover:border-opacity-1 hover:scale-[1.05] transition ease-in-out delay-50 rounded"
                                value={4}
                                onClick={handleMinRating}
                            >
                                <StarRating
                                    defaultRating={4}
                                    disableAction={true}
                                />
                                <div className="text-sm text-gray-800">(4)</div>
                            </button>
                            <button
                                className="flex p-1 items-center w-full border border-opacity-0 hover:border-[#211C6A] hover:border-opacity-1 hover:scale-[1.05] transition ease-in-out delay-50 rounded"
                                value={3}
                                onClick={handleMinRating}
                            >
                                <StarRating
                                    defaultRating={3}
                                    disableAction={true}
                                />
                                <div className="text-sm text-gray-800">(3)</div>
                            </button>
                            <button
                                className="flex p-1 items-center w-full border border-opacity-0 hover:border-[#211C6A] hover:border-opacity-1 hover:scale-[1.05] transition ease-in-out delay-50 rounded"
                                value={2}
                                onClick={handleMinRating}
                            >
                                <StarRating
                                    defaultRating={2}
                                    disableAction={true}
                                />
                                <div className="text-sm text-gray-800">(2)</div>
                            </button>
                            <button
                                className="flex p-1 items-center w-full border border-opacity-0 hover:border-[#211C6A] hover:border-opacity-1 hover:scale-[1.05] transition ease-in-out delay-50 rounded"
                                value={1}
                                onClick={handleMinRating}
                            >
                                <StarRating
                                    defaultRating={1}
                                    disableAction={true}
                                />
                                <div className="text-sm text-gray-800">(1)</div>
                            </button>
                            <button
                                className="flex p-1 items-center w-full border border-opacity-0 hover:border-[#211C6A] hover:border-opacity-1 hover:scale-[1.05] transition ease-in-out delay-50 rounded"
                                value={0}
                                onClick={handleMinRating}
                            >
                                <StarRating
                                    defaultRating={0}
                                    disableAction={true}
                                />
                                <div className="text-sm text-gray-800">(0)</div>
                            </button>
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
                        {products ? (
                            products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))
                        ) : (
                            <div>...Loading Products...</div>
                        )}
                    </div>
                    <div className="flex items-center justify-center m-4 select-none">
                        <button
                            onClick={handleSeeMore}
                            className="border border-[#211C6A] text-[#211C6A] hover:bg-[#e8e8e8] font-semibold p-[10px] w-[150px]"
                        >
                            See More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
