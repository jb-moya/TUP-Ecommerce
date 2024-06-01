import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import ProductCard from "./ProductCard.js";
import { useSelector, useDispatch } from "react-redux";
import { setSearchClicked } from "../features/searchSlice.js";
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";
import StarRating from "./StarRating.js";
import PaginationButtons from "./PaginationButtons";
import debounce from "./utils/debounce.js";
import handleMinMaxInput from "./utils/handleMinMaxInput.js";
import {
    buildQueryParam,
    buildQueryArrayParam,
} from "./utils/buildQueryParams.js";
import LoadingSymbol from "../components/loadingScreen.js";
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
    12: "Groceries",
    13: "Accessories",
    14: "Gaming",
    15: "Handmade",
    16: "Other",
};

const minRatingComp = (currentMinRating, handleMinRating) => {
    const selectedStyle =
        "flex px-3 py-2 items-center w-full border-2 bg-[#BCBAD2] border-opacity-8 hover:border-[#211C6A] hover:border-opacity-1 transition ease-in-out delay-50 rounded-2xl";

    const unselectedStyle =
        "flex px-3 py-1 items-center w-full rounded-lg  hover:bg-gray-200 transition ease-in-out delay-50 hover:scale-[1.05] rounded-2xl";

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

const DEBOUNCE_DELAY = 1000;

export const SearchPageFrame = () => {
    const { id: organizationIDinURL } = useParams();
    const dispatch = useDispatch();
    let location = useLocation();
    const [currentPage, setCurrentPage] = useState(1);
    const [productCount, setProductCount] = useState(0);
    const [maxPageCount, setMaxPageCount] = useState(0);
    const searchClicked = useSelector((state) => state.search.searchClicked);
    const [toggleDateSort, setToggleDateSort] = useState(1);
    const [toggleNameSort, setToggleNameSort] = useState(1);
    const [sortCategories, setSortCategories] = useState([]);
    const [sortOrganizations, setSortOrganizations] = useState([]);
    const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);
    const [isCurrentlyFetching, setIsCurrentlyFetching] = useState(false);
    const [minRating, setMinRating] = useState(0);
    const [searchName, setSearchName] = useState("");
    const [products, setProducts] = useState([]);
    const [organizations, setOrganizations] = useState([]);
    const limit = 30;

    const hasMounted = useRef(false);

    useEffect(() => {
        toast.info("location.search", location.search);
        const searchParams = new URLSearchParams(location.search);

        // console.log("local search", location.search);
        // console.log("searchParams", searchParams);

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
            setMinMaxPrice([0, parseInt(searchParams.get("maxPrice"), 10)]);
        }

        if (searchParams.has("minRating")) {
            setMinRating(parseInt(searchParams.get("minRating"), 10));
        }

        if (searchParams.has("categories")) {
            toast.info("bat kas ina yan")
            setSortCategories(searchParams.get("categories").split(","));
        }

        if (searchParams.has("dateSort")) {
            setToggleDateSort(parseInt(searchParams.get("dateSort"), 10));
        }

        if (searchParams.has("nameSort")) {
            setToggleNameSort(parseInt(searchParams.get("nameSort"), 10));
        }

        if (searchParams.has("organization")) {
            setSortOrganizations(searchParams.get("organization").split(","));
        }

        if (searchParams.has("page")) {
            setCurrentPage(parseInt(searchParams.get("page"), 10));
        }
    }, [location.search]);

    const delayedHandleMinMaxPrice = debounce((e) => {
        toast.info(`e.target.value ${e.target.value}`);
        handleMinMaxInput(e, setMinMaxPrice);
    }, 1000);

    const fetchAllOrganization = async () => {
        setIsCurrentlyFetching(true);
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/user",
                {
                    params: {
                        page: currentPage,
                        role: "seller",
                        status: "approved",
                    },
                }
            );
            console.log("data", data);
            setOrganizations(data.users);
        } catch (error) {
            console.error(error);
        } finally {
            // toast.success("Products loaded successfully");
        }
    };

    const numericFilters = useMemo(() => {
        const numericFiltersArray = [];

        if (minMaxPrice[0] > 0) {
            numericFiltersArray.push(`price>=${minMaxPrice[0]}`);
        }
        if (minMaxPrice[1] > 0) {
            numericFiltersArray.push(`price<=${minMaxPrice[1]}`);
        }
        if (minRating > 0) {
            numericFiltersArray.push(`averageRating>=${minRating}`);
        }

        return numericFiltersArray.join(",");
    }, [minMaxPrice, minRating]);

    const fetchProducts = useCallback(async () => {
        try {
            setIsCurrentlyFetching(true);
            console.log(
                "lmao",
                currentPage,
                searchName,
                sortCategories,
                toggleDateSort,
                toggleNameSort,
                sortOrganizations,
                organizationIDinURL,
                numericFilters
            );

            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        name: `${searchName ? searchName : ""}`,
                        numericFilters: numericFilters,
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
                        createdBy: organizationIDinURL
                            ? organizationIDinURL
                            : sortOrganizations.length > 0
                            ? sortOrganizations.join(",")
                            : "",
                        page: currentPage,
                        populatedFields: "createdBy",
                        productStatus: "enabled",
                        limit: limit,
                    },
                }
            );
            toast.success(`W H A T ${data.count}`);
            setProducts(data.products);
            setProductCount(data.count);

            setMaxPageCount(Math.ceil(data.count / limit));
        } catch (error) {
        } finally {
            setIsCurrentlyFetching(false);
        }
    }, [
        currentPage,
        searchName,
        sortCategories,
        toggleDateSort,
        toggleNameSort, 
        sortOrganizations,
        organizationIDinURL,
        numericFilters,
    ]);

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

    const handleToggleOrganization = (e) => {
        const { value } = e.currentTarget;

        setSortOrganizations((prevState) => {
            if (prevState.includes(value)) {
                return prevState.filter(
                    (organization) => organization !== value
                );
            } else {
                return [...prevState, value];
            }
        });
    };

    const handleMinRating = (e) => {
        const { value } = e.currentTarget;
        setMinRating(parseInt(value, 10));
    };

    // useEffect(() => {
    //     if (searchClicked) {
    //         fetchProducts();
    //         const timer = setTimeout(() => {
    //             dispatch(setSearchClicked(false));
    //         }, 2000);

    //         return () => clearTimeout(timer);
    //     }
    // }, [fetchProducts, searchClicked, dispatch]);

    useEffect(() => {
        if (!hasMounted.current) {
            hasMounted.current = true;
            return;
        }

        toast.info("LUHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
        fetchProducts();
        const params = [
            buildQueryParam("keyword", searchName),
            buildQueryParam(
                "minPrice",
                minMaxPrice[0] > 0 ? minMaxPrice[0] : ""
            ),
            buildQueryParam(
                "maxPrice",
                minMaxPrice[1] > 0 ? minMaxPrice[1] : ""
            ),
            buildQueryParam("minRating", minRating > 0 ? minRating : ""),
            buildQueryArrayParam("categories", sortCategories),
            buildQueryParam(
                "dateSort",
                toggleDateSort !== 1 ? toggleDateSort : ""
            ),
            buildQueryParam(
                "nameSort",
                toggleNameSort !== 1 ? toggleNameSort : ""
            ),
            buildQueryParam("page", currentPage !== 1 ? currentPage : ""),
            buildQueryArrayParam("organizations", sortOrganizations),
        ].filter(Boolean); // Remove empty strings

        const newUrl = `${location.pathname}?${params.join("&")}`;

        window.history.replaceState({ path: newUrl }, "", newUrl);
    }, [
        fetchProducts,
        searchName,
        minMaxPrice,
        toggleDateSort,
        toggleNameSort,
        minRating,
        sortCategories,
        sortOrganizations,
        currentPage,
        location.pathname,
    ]);

    useEffect(() => {
        fetchAllOrganization();
    }, []);

    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };

    const delayedHandleSearchNameChange = debounce((e) => {
        handleSearchNameChange(e);
    }, 1000);

    return (
        <div>
            <div className="max-w-[1220px] mx-auto h-10 mt-24 p-4">
                <input
                    className="h-12 w-full text-black border border-[#211C6A] px-4 rounded-xl"
                    type="text"
                    placeholder="Search"
                    onChange={delayedHandleSearchNameChange}
                />
            </div>
            <div className="flex max-w-[1240px] mx-auto select-none p-4 mt-4 text-[#211C6A]">
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
                                    className="rounded-lg border border-gray-300 appearance-none outline-none w-[80px] px-2 py-1 text-sm text-gray-800"
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
                                    className="rounded-lg border border-gray-300 appearance-none outline-none w-[80px] px-2 py-1  text-sm text-gray-800"
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
                        {!organizationIDinURL && (
                            <>
                                <div className="py-2 px-2 font-semibold text-lg bg-gray-100">
                                    Organization
                                </div>
                                <div className="pl-4 pt-1">
                                    {organizations &&
                                    organizations.length > 0 ? (
                                        organizations.map((org) => (
                                            <div
                                                key={org._id}
                                                className="flex items-center"
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="mr-2"
                                                    name={org._id}
                                                    value={org._id}
                                                    onChange={
                                                        handleToggleOrganization
                                                    }
                                                    checked={sortOrganizations.includes(
                                                        org._id
                                                    )}
                                                />
                                                <span className="text-sm">
                                                    {org.orgName}
                                                </span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-sm">
                                            Loading...
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

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
                                        checked={sortCategories.includes(
                                            productCategories[key]
                                        )}
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

                <div className="flex flex-col w-full">
                    <div className="flex text-[#211C6A] mb-4 mr-4 items-center justify-between">
                        <div className="font-bold text-[30px] py-2 px-2">
                            Search results for "{searchName}"
                        </div>

                        <div>
                            <button
                                className={
                                    toggleDateSort === 1
                                        ? "py-1 px-2 mr-2 rounded-lg bg-[#211C6A] text-white"
                                        : "py-1 px-2 mr-2 rounded-lg bg-white text-[#211C6A]"
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
                                        ? "py-1 px-2 mr-2 rounded-lg bg-[#211C6A] text-white"
                                        : "py-1 px-2 mr-2 rounded-lg bg-white text-[#211C6A]"
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
                    <div className="grid grid-cols-5 gap-4 mx-4 p-4 rounded-lg shadow-lg bg-white">
                        {!isCurrentlyFetching ? (
                            productCount !== 0 ? (
                                products.map((product, index) => (
                                    <ProductCard
                                        key={index}
                                        product={product}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center mt-20">
                                    ...No Products found. Try changing your
                                    filters...
                                </div>
                            )
                        ) : null}

                        <div className="col-span-full my-20">
                            {isCurrentlyFetching && (
                                <LoadingSymbol showWhen={isCurrentlyFetching} />
                            )}
                        </div>
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
