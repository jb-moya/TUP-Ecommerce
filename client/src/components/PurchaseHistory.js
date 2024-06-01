import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import PaginationButtons from "./PaginationButtons";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
    buildQueryParam,
    buildQueryArrayParam,
} from "./utils/buildQueryParams.js";
import { toast } from "react-toastify";
import formatData from "./utils/formatData";
import classNames from "classnames";
import defaultProfileImage from "../Assets/defaultPP.png";

axios.defaults.withCredentials = true;

const orderStatus = {
    0: "",
    1: "To Pay",
    2: "To Ship",
    3: "To Recieve",
    4: "Completed",
    5: "Cancelled",
    6: "Refunded",
};

const handleOrderStatusChange = async (order, status) => {
    try {
        const response = await axios.patch(
            `http://localhost:5000/api/v1/transactions`,
            {
                orders: order,
                orderStatus: status,
            }
        );
        console.log(response);

        toast.success(`Orders have been marked as ${status}!`);
    } catch (error) {
        toast.error("An error occurred. Please try again.");
        // console.error(error);
    }
};

const HistoryItem = (transaction) => {
    const createdAt = formatData(transaction.createdAt);

    const orderStatusClassName = classNames({
        "text-xs border border-1 rounded-lg w-fit px-2": true,
        "bg-green-100 border-0": transaction.orderStatus === "Completed",
        "bg-red-100 border-0": transaction.orderStatus === "Cancelled",
        "bg-yellow-100 border-0": transaction.orderStatus === "To Pay",
        "bg-blue-100 border-0": transaction.orderStatus === "To Ship",
        "bg-purple-100 border-0": transaction.orderStatus === "To Receive",
        "bg-black text-white border-0": transaction.orderStatus === "Refunded",
    });

    return (
        <>
            <div className="flex bg-white shadow-md rounded-lg w-full mb-4">
                <div className="flex flex-row justify-between w-full p-4">
                    <div className="flex flex-row w-full h-full">
                        <div className="w-2/12 flex items-center justify-center">
                            <img
                                className="h-[100px] w-[100px] rounded-lg object-cover my-auto shadow-md"
                                src={transaction.product.image[0]}
                                alt="Logo Here"
                                loading="lazy"
                            />
                        </div>
                        <div className="flex flex-col w-full px-4 py-2">
                            <h1 className="text-lg pl-1 py-[1px]">
                                <div className="flex justify-between">
                                    <Link
                                        to={`/product/${transaction.product._id}`}
                                        className="text-[#211C6A] hover:underline"
                                    >
                                        {transaction.product.name}
                                    </Link>
                                    <div className="flex text-sm items-center">
                                        <img
                                            src={
                                                transaction.product.createdBy
                                                    .image ||
                                                defaultProfileImage
                                            }
                                            alt="Logo Here"
                                            className="h-5 w-5 mr-2 rounded-full"
                                        />
                                        {transaction.product.createdBy.orgName}
                                    </div>
                                </div>
                            </h1>
                            <div className="flex flex-col h-full">
                                <h1 className="text-xs pl-1 py-[1px]">
                                    {transaction.product.variation.length >
                                        0 && (
                                        <>
                                            Variation:{" "}
                                            {transaction.product.variation.map(
                                                (variation) => {
                                                    if (
                                                        variation._id ===
                                                        transaction.variation
                                                    ) {
                                                        return variation.name;
                                                    }

                                                    return null;
                                                }
                                            )}
                                        </>
                                    )}
                                </h1>
                                <h1 className="text-xs pl-1 py-[1px]">
                                    Quantity: {transaction.quantity}
                                </h1>
                                <div className="text-sm pl-1 py-[1px]">
                                    Order Total: ₱ {transaction.totalAmount}
                                </div>
                                <div className="flex justify-between py-[1px] mt-auto">
                                    <h1 className={orderStatusClassName}>
                                        {transaction.orderStatus}
                                    </h1>
                                    <div className="text-sm font-extralight">
                                        Date ordered: {createdAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[130px] justify-between h-[130px]">
                        <Link
                            className="flex border hover:bg-gray-200 border-[#211C6A] text-[#211C6A] text-xs items-center justify-center h-10 rounded-xl"
                            to={`/org/${transaction.product.createdBy}`}
                        >
                            <CiShop size={25} className="mr-2" /> View Shop
                        </Link>
                        <Link
                            className="flex bg-[#211C6A] hover:bg-opacity-70 text-white items-center justify-center h-10 text-sm p-4 rounded-xl"
                            to={`/product/${transaction.product._id}`}
                        >
                            Buy Again
                        </Link>
                        {(transaction.orderStatus === orderStatus[1] ||
                            transaction.orderStatus === orderStatus[2]) && (
                            <button
                                type="button"
                                className="flex border border-1 border-[#211c6a8f] hover:bg-red-500 hover:text-white hover:border-red-500 items-center justify-center h-10 text-sm p-2 rounded-xl"
                                onClick={() =>
                                    handleOrderStatusChange(
                                        transaction._id,
                                        orderStatus[5]
                                    )
                                }
                            >
                                Cancel Order
                            </button>
                        )}
                        {transaction.orderStatus === orderStatus[3] && (
                            <button
                                type="button"
                                className="flex border border-1 border-[#211c6a8f] hover:bg-red-500 hover:text-white hover:border-red-500 items-center justify-center h-10 text-sm p-2 rounded-xl"
                                onClick={() =>
                                    handleOrderStatusChange(
                                        transaction._id,
                                        orderStatus[6]
                                    )
                                }
                            >
                                Return Refund
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

const PurchaseHistory = () => {
    const dispatch = useDispatch();
    let location = useLocation();
    const [transactions, setTransactions] = useState([]);
    const [transactionTotalCount, setTransactionTotalCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(1);
    const [toggleDateSort, setToggleDateSort] = useState(1);
    const [toggleTotalAmountSort, setToggleTotalAmountSort] = useState(1);
    const [searchName, setSearchName] = useState("");
    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
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

    const handleSearchNameChange = (e) => {
        setSearchName(e.target.value);
    };

    const delayedHandleSearchNameChange = debounce((e) => {
        handleSearchNameChange(e);
    }, 1000);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.has("page")) {
            setCurrentPage(parseInt(searchParams.get("page"), 10));
        }

        if (searchParams.has("dateSort")) {
            setToggleDateSort(parseInt(searchParams.get("dateSort"), 10));
        }

        if (searchParams.has("status")) {
            // get key using value
            const status = searchParams.get("status");
            const key = Object.keys(orderStatus).find(
                (key) => orderStatus[key] === status
            );
            console.log("key", key);
            setSelectedButton(parseInt(key));
        }

        if (searchParams.has("priceSort")) {
            setToggleTotalAmountSort(
                parseInt(searchParams.get("priceSort"), 10)
            );
        }

        if (searchParams.has("searchName")) {
            setSearchName(searchParams.get("searchName"));
        }
    }, [location.search]);

    const fetchTransactionHistory = useCallback(async () => {
        try {
            toast.success(`searchName: ${searchName}`);
            const response = await axios.get(
                `http://localhost:5000/api/v1/transactions`,
                {
                    params: {
                        productName: `${searchName ? searchName : ""}`,
                        sort: [
                            [
                                "totalAmount",
                                toggleTotalAmountSort === 1
                                    ? "ascending"
                                    : "descending",
                            ],
                            [
                                "createdAt",
                                toggleDateSort === 1
                                    ? "ascending"
                                    : "descending",
                            ],
                        ],
                        orderStatus: orderStatus[selectedButton],
                        page: currentPage,
                    },
                }
            );
            const data = response.data;
            console.log(data);

            setTransactions(data.transactions);
            setTransactionTotalCount(data.transactionTotalCount);
            setMaxPageCount(Math.ceil(data.transactionTotalCount / 10));
        } catch (error) {
            console.error(error);
        }
    }, [
        searchName,
        toggleDateSort,
        toggleTotalAmountSort,
        currentPage,
        selectedButton,
    ]);

    useEffect(() => {
        console.log("Effect triggered by dependencies:");

        fetchTransactionHistory();

        const params = [
            buildQueryParam("page", currentPage),
            // buildQueryParam("status", orderStatus[selectedButton]),
        ].filter(Boolean);

        const newUrl = `${location.pathname}?${params.join("&")}`;
        window.history.replaceState({ path: newUrl }, "", newUrl);
    }, [
        fetchTransactionHistory,
        searchName,
        toggleDateSort,
        toggleTotalAmountSort,
        currentPage,
        location.pathname,
    ]);

    const handleSortChange = (e) => {
        if (e.target.value === "Price") {
            setToggleTotalAmountSort(toggleTotalAmountSort * -1);
        } else if (e.target.value === "Date") {
            setToggleDateSort(toggleDateSort * -1);
        } else if (e.target.value === "Default") {
            setToggleDateSort(1);
            setToggleTotalAmountSort(1);
        }
    };

    return (
        <div className="flex flex-col text-[#211C6A] w-[850px]">
            <div className="flex justify-between">
                <div className=" my-4 text-lg font-bold ">
                    My Purchase History
                </div>
                <div className="flex flex-row items-center h-full justify-center">
                    <div className="flex justify-end text-[#211C6A]  ">
                        <select
                            className="border border-[#211C6A] rounded-xl h-9 w-32 px-2 outline-none text-sm"
                            defaultValue="Filter By"
                            onChange={handleSortChange}
                        >
                            <option value="Default">Filter by</option>
                            <option value="Price">Price</option>
                            <option value="Date">Date</option>
                        </select>
                    </div>
                    <div className="relative">
                        <input
                            className="mx-4 bg-white border border-[#211C6A] rounded-xl py-2 px-4 pl-10 text-sm appearance-none outline-none "
                            placeholder="Search"
                            onChange={delayedHandleSearchNameChange}
                        />
                        <FaSearch className="absolute top-[10px] left-8 text-[#211C6A]" />
                    </div>
                </div>
            </div>

            <ul className="flex border-b-2 border-gray-200 w-full px-4 justify-between text-gray-500">
                <li
                    onClick={() => handleButtonClick(0)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 0
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    All
                </li>
                <li
                    onClick={() => handleButtonClick(1)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 1
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    To Pay
                </li>
                <li
                    onClick={() => handleButtonClick(2)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 2
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    To Ship
                </li>
                <li
                    onClick={() => handleButtonClick(3)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 3
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    To Receive
                </li>
                <li
                    onClick={() => handleButtonClick(4)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 4
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Completed
                </li>
                <li
                    onClick={() => handleButtonClick(5)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 5
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Cancelled
                </li>
                <li
                    onClick={() => handleButtonClick(6)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 6
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Return Refund
                </li>
            </ul>

            <div className="flex bg-white w-full mb-4"></div>

            {transactions.map((transaction) => (
                <HistoryItem key={transaction._id} {...transaction} />
            ))}

            <PaginationButtons
                pageCount={maxPageCount > 0 ? maxPageCount : 1}
                setCurrentPage={setCurrentPage}
            />
        </div>
    );
};

export default PurchaseHistory;
