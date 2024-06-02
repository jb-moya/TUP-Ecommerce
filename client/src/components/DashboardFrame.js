import React, { useEffect, useState, useCallback } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { TbBasketCancel } from "react-icons/tb";
import PaginationButtons from "./PaginationButtons";
import { FaCaretDown } from "react-icons/fa6";
import { FaCaretUp } from "react-icons/fa6";
import axios from "axios";
import formatData from "./utils/formatData";
import { useLocation } from "react-router-dom";
import formatPrice from "./utils/formatPrice";
axios.defaults.withCredentials = true;

const SortButton = ({ fieldName, toggle, setterToggle }) => {
    return (
        <>
            <button
                className={
                    toggle === 1
                        ? "py-1 px-2 mr-2 rounded-xl bg-[#211C6A] text-white border border-[#211C6A]"
                        : "py-1 px-2 mr-2 rounded-xl bg-white text-[#211C6A] border border-black border-opacity-30"
                }
                onClick={() => setterToggle(toggle * -1)}
            >
                {toggle === 1 ? (
                    <div className="flex">
                        <div className="pr-1">{fieldName} </div> <FaCaretUp />
                    </div>
                ) : (
                    <div className="flex">
                        <div className="pr-1">{fieldName} </div> <FaCaretDown />
                    </div>
                )}
            </button>
        </>
    );
};

export const DashboardFrame = () => {
    const [transactions, setTransactions] = useState([]);
    let location = useLocation();
    const [transactionTotalCount, setTransactionTotalCount] = useState(0);
    const [count, setCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalItemsOrdered, setTotalItemsOrdered] = useState(0);
    const [toggleTotalAmountSort, setToggleTotalAmountSort] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [toggleDateSort, setToggleDateSort] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(0);
    const [itemsOrderedLoading, setItemsOrderedLoading] = useState(true);
    const [totalRevenueLoading, setTotalRevenueLoading] = useState(true);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.has("page")) {
            setCurrentPage(parseInt(searchParams.get("page"), 10));
        }

        if (searchParams.has("dateSort")) {
            setToggleDateSort(parseInt(searchParams.get("dateSort"), 10));
        }

        if (searchParams.has("priceSort")) {
            setToggleTotalAmountSort(
                parseInt(searchParams.get("priceSort"), 10)
            );
        }
    }, [location.search]);

    const fetchAllTransactions = useCallback(async () => {
        try {
            setItemsOrderedLoading(true);
            const response = await axios.get(
                `http://localhost:5000/api/v1/transactions`,
                {
                    params: {
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
                        orderStatus: "Completed",
                    },
                }
            );
            const data = await response.data;
            console.log("BOY", response);

            setTransactions(data.transactions);
            setTransactionTotalCount(data.count);
            setMaxPageCount(Math.ceil(data.count / 10));
        } catch (error) {
            console.error(error);
        } finally {
            setItemsOrderedLoading(false);
        }
    }, [currentPage, toggleTotalAmountSort, toggleDateSort]);

    const fetchTotalRevenue = async () => {
        try {
            setTotalRevenueLoading(true);
            const response = await axios.get(
                `http://localhost:5000/api/v1/transactions/revenue`
            );
            const data = await response.data;
            setTotalRevenue(data.totalRevenue);
            setTotalItemsOrdered(data.totalQuantity);
            console.log(data);
        } catch (error) {
            console.error(error);
        } finally {
            setTotalRevenueLoading(false);
        }
    };

    useEffect(() => {
        fetchAllTransactions();
        const newUrl = `${location.pathname}?${
            toggleDateSort !== 1 ? `&dateSort=${toggleDateSort}` : ""
        }${
            toggleTotalAmountSort !== 1
                ? `&totalAmountSort=${toggleTotalAmountSort}`
                : ""
        }${currentPage !== 1 ? `&page=${currentPage}` : ""}`;

        window.history.pushState({}, "", newUrl);
    }, [
        fetchAllTransactions,
        location.pathname,
        currentPage,
        toggleTotalAmountSort,
        toggleDateSort,
    ]);

    useEffect(() => {
        fetchTotalRevenue();
    }, []);

    return (
        <div>
            <div className="flex mx-auto select-none items-center ">
                <div className="flex flex-col w-full">
                    <div className="text-3xl pl-4 font-bold text-[#211C6A] w-full mb-4">
                        Dashboard
                    </div>

                    <div className="flex flex-row w-full justify-between mb-4">
                        <div className="w-[280px] h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-xl">
                            <div className="flex items-center justify-between  p-6 text-white w-full">
                                <div className="flex flex-col">
                                    <h2 className="text-3xl mb-2">
                                        {!totalRevenueLoading
                                            ? totalItemsOrdered
                                            : "loading"}
                                    </h2>
                                    <p className="text-sm">
                                        Total Items Ordered
                                    </p>
                                </div>
                                <FaShoppingCart className="mr-4" size={40} />
                            </div>
                        </div>

                        <div className="w-[280px]  h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-xl">
                            <div className="flex items-center justify-between  p-6 text-white w-full">
                                <div className="flex flex-col">
                                    <h2 className="text-3xl mb-2">
                                        {!totalRevenueLoading ? (
                                            <div className="flex flex-row justify-center align-middle text-center">
                                                <div className="pr-2">₱</div>
                                                <div className="self-center">
                                                    {formatPrice(totalRevenue)}
                                                </div>
                                            </div>
                                        ) : (
                                            "loading"
                                        )}
                                    </h2>
                                    <p className="text-sm">Total Sales</p>
                                </div>
                                <IoMdCash className="mr-4" size={40} />
                            </div>
                        </div>

                        <div className="w-[280px]  h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-xl">
                            <div className="flex items-center justify-between  p-6 text-white w-full">
                                <div className="flex flex-col">
                                    <h2 className="text-3xl mb-2">
                                        {!totalRevenueLoading ? (
                                            <div className="flex flex-row justify-center align-middle text-center">
                                                <div className="pr-2">₱</div>
                                                <div className="self-center">
                                                    {formatPrice(totalRevenue * 0.975)}
                                                </div>
                                            </div>
                                        ) : (
                                            "loading"
                                        )}
                                    </h2>
                                    <p className="text-sm">Total Revenue</p>
                                </div>
                                <IoMdCash className="mr-4" size={40} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white w-full shadow-lg p-6 rounded-xl">
                        <div className="text-lg font-bold text-[#211C6A] w-full px-2">
                            Sales
                        </div>
                        <hr className="border-[#211C6A] "></hr>

                        <div className="my-2">
                            <SortButton
                                fieldName="Total Amount"
                                toggle={toggleTotalAmountSort}
                                setterToggle={setToggleTotalAmountSort}
                            />
                            <SortButton
                                fieldName="Date"
                                toggle={toggleDateSort}
                                setterToggle={setToggleDateSort}
                            />
                        </div>

                        <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full">
                            <thead>
                                <tr className="text-left">
                                    <th className="p-2">Product ID</th>
                                    <th className="p-2">Product Name</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Variant</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Total Amount</th>
                                    <th className="p-2">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction, index) => (
                                    <tr
                                        key={transaction._id}
                                        // className="border-t text-sm"
                                        className={`border-t text-sm ${
                                            index % 2 === 0
                                                ? "bg-gray-100"
                                                : "bg-gray-200"
                                        }`}
                                    >
                                        <td className="p-2">
                                            {transaction._id}
                                        </td>
                                        <td className="p-2">
                                            {transaction.product.name}
                                        </td>
                                        <td className="p-2">
                                            {transaction.quantity}
                                        </td>
                                        <td className="p-2">
                                            {transaction.variation
                                                ? transaction.product.variation.filter(
                                                      (variation) =>
                                                          variation._id ===
                                                          transaction.variation
                                                  )[0].name
                                                : "-"}
                                        </td>
                                        <td className="p-2">
                                            {transaction.product.price !== -1
                                                ? transaction.product.price
                                                : transaction.product
                                                      .variation[0].price}
                                        </td>
                                        <td className="p-2">
                                            {transaction.totalAmount}
                                        </td>
                                        <td className="p-2">
                                            {formatData(transaction.createdAt)}
                                        </td>
                                    </tr>
                                ))}

                                {itemsOrderedLoading && (
                                    <tr>
                                        <td
                                            colSpan="1000"
                                            className="p-2 text-center"
                                        >
                                            Loading...
                                        </td>
                                    </tr>
                                )}

                                {transactions.length === 0 &&
                                    !itemsOrderedLoading && (
                                        <tr>
                                            <td
                                                colSpan="1000"
                                                className="p-2 text-center"
                                            >
                                                No transactions found
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>

                        <PaginationButtons
                            pageCount={maxPageCount > 0 ? maxPageCount : 1}
                            setCurrentPage={10}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
