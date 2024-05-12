import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { TbBasketCancel } from "react-icons/tb";
import PaginationButtons from "./PaginationButtons";
import axios from "axios";
axios.defaults.withCredentials = true;
export const DashboardFrame = () => {
    const [transactions, setTransactions] = useState([]);
    const [transactionTotalCount, setTransactionTotalCount] = useState(0);
    const [count, setCount] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalItemsOrdered, setTotalItemsOrdered] = useState(0);
    const [maxPageCount, setMaxPageCount] = useState(0);

    const fetchAllTransactions = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/transactions`
            );
            const data = await response.data;
            console.log(response);

            setTransactions(data.transactions);
            setTransactionTotalCount(data.transactionTotalCount);
            setMaxPageCount(Math.ceil(data.transactionTotalCount / 10));
        } catch (error) {
            console.error(error);
        }
    };

    const fetchTotalRevenue = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/transactions/revenue`
            );
            const data = await response.data;
            setTotalRevenue(data.totalRevenue);
            setTotalItemsOrdered(data.totalQuantity);
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllTransactions();
        fetchTotalRevenue();
    }, []);

    return (
        <div>
            <div className="flex max-w-[1240px] pt-[90px] mx-auto select-none items-center p-4">
                <div className="flex flex-col m-4 w-full">
                    <div className="text-3xl font-bold text-[#211C6A] w-full mb-4">
                        Dashboard
                    </div>

                    <div className="flex flex-row w-full justify-between mb-4 px-2">
                        <div className="w-[380px] h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-md">
                            <div className="flex items-center justify-between  p-6 text-white w-full">
                                <div className="flex flex-col">
                                    <h2 className="text-3xl mb-2">
                                        {totalItemsOrdered ? (
                                            totalItemsOrdered
                                        ) : (
                                            "loading"
                                        )}
                                    </h2>
                                    <p className="text-sm">Items Ordered</p>
                                </div>
                                <FaShoppingCart className="mr-4" size={40} />
                            </div>
                        </div>

                        <div className="w-[380px] h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-md">
                            <div className="flex items-center justify-between  p-6 text-white w-full">
                                <div className="flex flex-col">
                                    <h2 className="text-3xl mb-2">
                                        {totalRevenue ? (
                                            <div className="flex flex-row justify-center align-middle text-center">
                                                <div className="pr-2">
                                                    ₱
                                                </div>
                                                <div className="self-center">{totalRevenue}</div>
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

                        <div className="w-[380px] h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-md">
                            <div className="flex items-center justify-between  p-6 text-white w-full">
                                <div className="flex flex-col">
                                    <h2 className="text-3xl mb-2">203</h2>
                                    <p className="text-sm">Cancelled Orders</p>
                                </div>
                                <TbBasketCancel className="mr-4" size={40} />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white w-full shadow-md p-6">
                        <div className="text-lg font-bold text-[#211C6A] w-full px-2">
                            Sales
                        </div>
                        <hr className="border-[#211C6A] "></hr>

                        <select
                            className="pl-4 pr-24 h-12 w-full text-[#211C6A] border border-[#211C6A] appearance-none outline-none my-4"
                            defaultValue=""
                        >
                            <option value="" disabled hidden>
                                Filters
                            </option>
                            <option value="popular">Sort By Increasing</option>
                            <option value="latest">Sort By Decreasing</option>
                        </select>

                        <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full">
                            <thead>
                                <tr className="text-left">
                                    <th className="p-2">Product ID</th>
                                    <th className="p-2">Product Name</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Price</th>
                                    <th className="p-2">Total Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((transaction) => (
                                    <tr
                                        key={transaction._id}
                                        className="border-t"
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
                                            {transaction.product.price !== -1
                                                ? transaction.product.price
                                                : transaction.product
                                                      .variation[0].price}
                                        </td>
                                        <td className="p-2">
                                            {transaction.totalAmount}
                                        </td>
                                    </tr>
                                ))}
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
