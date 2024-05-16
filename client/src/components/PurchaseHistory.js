import React, { useState, useEffect, useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import { CiShop } from "react-icons/ci";
import PaginationButtons from "./PaginationButtons";
import { useLocation, useParams, Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import formatData from "./utils/formatData";
axios.defaults.withCredentials = true;

const HistoryItem = (transaction) => {
    const createdAt = formatData(transaction.createdAt);

    return (
        <>
            <div className="flex bg-white rounded-lg w-full mb-4">
                <div className="flex flex-row justify-between w-full p-4">
                    <div className="flex flex-row w-full">
                        <img
                            className="h-[100px] w-[100px] rounded-lg object-cover"
                            src={transaction.product.image[0]}
                            alt="Logo Here"
                            loading="lazy"
                        />
                        <div className="flex flex-col w-full px-4 py-2">
                            <h1 className="text-lg">
                                {transaction.product.name}
                            </h1>
                            <div className="flex flex-col justify-between h-full">
                                <h1 className="text-xs">
                                    Variation:{" "}
                                    {transaction.product.variation.map(
                                        (variation) => {
                                            if (
                                                variation._id ===
                                                transaction.variation
                                            ) {
                                                return variation.name;
                                            }
                                        }
                                    )}
                                </h1>
                                <h1 className="text-xs">
                                    Quantity: {transaction.quantity}
                                </h1>
                                <div className="flex justify-between">
                                    <div className="text-sm">
                                        Order Total: ₱ {transaction.totalAmount}
                                    </div>
                                    <div className="text-sm font-extralight">
                                        Date ordered: {createdAt}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[130px] justify-between">
                        <button className="flex border hover:bg-gray-200  border-[#211C6A] text-[#211C6A] text-xs items-center justify-center h-10 rounded-xl">
                            <Link
                                className="flex justify-center items-center"
                                to={`/org/${transaction.product.createdBy}`}
                            >
                                <CiShop size={25} className="mr-2" /> View Shop
                            </Link>
                        </button>
                        <button className="flex bg-[#211C6A] hover:bg-opacity-70   text-white items-center justify-center h-10 text-sm p-4 rounded-xl">
                            Buy Again
                        </button>
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
    const [selectedButton, setSelectedButton] = useState(0); // Changed initial value to 1 for Dashboard

    
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
            // toast.info(`getting ${searchParams.get("page")}`);
            setCurrentPage(parseInt(searchParams.get("page"), 10));
        }

        if (searchParams.has("dateSort")) {
            // toast.info(`getting ${searchParams.get("dateSort")}`);
            setToggleDateSort(parseInt(searchParams.get("dateSort"), 10));
        }

        if (searchParams.has("priceSort")) {
            // toast.info(`getting ${searchParams.get("priceSort")}`);
            setToggleTotalAmountSort(
                parseInt(searchParams.get("priceSort"), 10)
            );
        }

        if (searchParams.has("searchName")) {
            // toast.info(`getting ${searchParams.get("searchName")}`);
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
    }, [searchName, toggleDateSort, toggleTotalAmountSort, currentPage]);

    useEffect(() => {
        console.log("Effect triggered by dependencies:");

        fetchTransactionHistory();
        const newUrl = `${location.pathname}?${
            searchName ? `keyword=${searchName}` : ""
        }${toggleDateSort !== 1 ? `&dateSort=${toggleDateSort}` : ""}${
            toggleTotalAmountSort !== 1
                ? `&totalAmountSort=${toggleTotalAmountSort}`
                : ""
        }${currentPage !== 1 ? `&page=${currentPage}` : ""}`;

        window.history.replaceState({ path: newUrl }, "", newUrl);
    }, [
        fetchTransactionHistory,
        searchName,
        toggleDateSort,
        toggleTotalAmountSort,
        currentPage,
        location.pathname,
    ]);

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

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
