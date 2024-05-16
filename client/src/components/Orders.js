import React, { useState, useEffect, useCallback } from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import axios from "axios";
import PaginationButtons from "./PaginationButtons";
import {
    buildQueryParam,
    buildQueryArrayParam,
} from "./utils/buildQueryParams.js";
import { useLocation } from "react-router-dom";
import convertToBase64 from "./utils/convertToBase64.js";
import ex from "../Assets/ex.png";
import { FaCheckCircle } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

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

const orderAction = {
    1: "Ship my Orders",
    2: "Mark as 'Shipping'",
    3: "Mark as 'Completed'",
};

const OrderRow = ({ order, selectedOrder, isSelected }) => {
    return (
        <tr className="border-t">
            <td className="p-2">
                <input
                    type="checkbox"
                    className="cursor-pointer"
                    checked={isSelected}
                    onChange={() => selectedOrder(order._id, isSelected)}
                />
            </td>
            <td className="p-2" colSpan="4">
                {order.product.name}
            </td>
            <td className="p-2">x{order.quantity}</td>
            <td className="p-2">P {order.totalAmount}</td>
            <td className="p-2">{order.orderStatus}</td>
            <td className="p-2">{order.shippingMethod}</td>
            <td className="p-2">{order.paymentMethod}</td>
            <td className="p-2"></td>
        </tr>
    );
};

export const Orders = () => {
    let location = useLocation();
    const [maxPageCount, setMaxPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [transactions, setTransactions] = useState([]);
    const [transactionTotalCount, setTransactionTotalCount] = useState(0);
    const [selectedButton, setSelectedButton] = useState(0); // Changed initial value to 1 for Dashboard
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [areAllOrdersSelected, setAreAllOrdersSelected] = useState(false);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.has("page")) {
            setCurrentPage(parseInt(searchParams.get("page")));
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

        console.log("selectedButton", selectedButton);
    }, [location.search, selectedButton]);

    const handleAddSelectedOrder = (orderId, isSelected) => {
        if (isSelected) {
            setSelectedOrders((prev) => prev.filter((id) => id !== orderId));
        } else {
            setSelectedOrders((prev) => [...prev, orderId]);
        }
    };

    const handleAllSelectedOrders = (e) => {
        if (e.target.checked) {
            const allOrderIds = transactions.map(
                (transaction) => transaction._id
            );
            setSelectedOrders(allOrderIds);
        } else {
            setSelectedOrders([]);
        }

        setAreAllOrdersSelected(e.target.checked);
    };

    useEffect(() => {
        if (
            selectedOrders.length === transactions.length &&
            transactions.length > 0
        ) {
            setAreAllOrdersSelected(true);
        } else {
            setAreAllOrdersSelected(false);
        }
    }, [selectedOrders, transactions]);

    useEffect(() => {
        console.log("selectedOrders", selectedOrders);
    }, [selectedOrders]);

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    const fetchAllTransactions = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/transactions`,
                {
                    params: {
                        page: currentPage,
                        orderStatus: orderStatus[selectedButton],
                    },
                }
            );
            const data = await response.data;
            console.log(response);

            setTransactions(data.transactions);
            setTransactionTotalCount(data.transactionTotalCount);
            setMaxPageCount(Math.ceil(data.transactionTotalCount / 10));
        } catch (error) {
            console.error(error);
        }
    }, [currentPage, selectedButton]);

    const handleUpdateStatus = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/v1/transactions`,
                {
                    orders: selectedOrders,
                    orderStatus: orderStatus[selectedButton + 1],
                }
            );
            console.log(response);
            fetchAllTransactions();

            toast.success("Orders have been marked as 'To Ship'!");
        } catch (error) {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        }
    };

    useEffect(() => {
        fetchAllTransactions();

        const params = [
            buildQueryParam("page", currentPage),
            // buildQueryParam("status", orderStatus[selectedButton]),
        ].filter(Boolean);

        const newUrl = `${location.pathname}?${params.join("&")}`;
        window.history.replaceState({ path: newUrl }, "", newUrl);
    }, [currentPage, fetchAllTransactions, selectedButton, location.pathname]);

    return (
        <div className="flex mx-auto select-none items-center ">
            <div className="flex flex-col w-full">
                <div className="text-3xl pl-4 font-bold text-[#211C6A] w-full mb-4">
                    My Orders
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
                        Unpaid
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
                        Shipping
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
                        Cancellation
                    </li>
                    <li
                        onClick={() => handleButtonClick(6)}
                        className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                            selectedButton === 6
                                ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                                : ""
                        }`}
                    >
                        Return/Refund
                    </li>
                </ul>

                <div className="flex flex-row w-full items-center justify-between">
                    <input
                        className=" appearance-none outline-none bg-transparent border border-[#211C6A] px-4 py-2 rounded-full w-[250px] mt-4 text-sm ml-6"
                        placeholder="Search Orders"
                    />

                    <div className="text-sm flex items-center mt-4 ml-6">
                        <div>Order Creation Date:</div>
                        <input
                            className="rounded-full border border-[#211C6A] px-4 py-2 mx-4 text-gray-500"
                            type="date"
                        />
                        -
                        <input
                            className="rounded-full border border-[#211C6A] px-4 py-2 mx-4 text-gray-500"
                            type="date"
                        />
                    </div>
                </div>

                {/* <div className="flex border-b-2 border-gray-200 px-4 justify-between w-full text-gray-500  text-sm mt-16">
                    <ul className="flex w-[370px] justify-between pl-2 mb-2 ">
                        <li
                            onClick={() => handleButtonClick1(1)}
                            className={`p-4 px-6 cursor-pointer  hover:bg-[#211C6A] hover:text-white hover:rounded-full border-[#211C6A] transition ease-in-out duration-200 ${
                                selectedButton1 === 1
                                    ? " bg-[#211C6A] rounded-full border-b-[#EFEFEF] text-white"
                                    : ""
                            }`}
                        >
                            All 0
                        </li>

                        <li
                            onClick={() => handleButtonClick1(2)}
                            className={`p-4 px-6 cursor-pointer border-[#211C6A]  hover:bg-[#211C6A] hover:text-white hover:rounded-full transition ease-in-out duration-200 ${
                                selectedButton1 === 2
                                    ? " bg-[#211C6A] rounded-full border-b-[#EFEFEF] text-white"
                                    : ""
                            }`}
                        >
                            To Process 0
                        </li>

                        <li
                            onClick={() => handleButtonClick1(3)}
                            className={`p-4 px-6 cursor-pointer border-[#211C6A] hover:bg-[#211C6A] hover:text-white hover:rounded-full  transition ease-in-out duration-200 ${
                                selectedButton1 === 3
                                    ? " bg-[#211C6A] rounded-full border-b-[#EFEFEF] text-white"
                                    : ""
                            }`}
                        >
                            Processed 0
                        </li>
                    </ul>
                </div> */}

                <div className="flex justify-between mt-2 p-4 ">
                    <div className="text-lg">Orders</div>
                    <div className="flex items-center">
                        <div className="flex items-center text-sm">
                            Sort By:
                            <select className="ml-2 border border-[#211C6A] rounded-full p-2 bg-transparent outline-none ">
                                <option value="option1">
                                    Orders Confirmed
                                </option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                        <Tooltip
                            id="my-tooltip"
                            style={{
                                backgroundColor: "#211c6a",
                                color: "#fff",
                                borderRadius: "8px",
                            }}
                        />

                        {selectedButton === 1 ? (
                            <button
                                type="button"
                                className={`px-4 py-2 ${
                                    selectedOrders.length === 0
                                        ? `cursor-not-allowed`
                                        : `cursor-pointer`
                                } rounded-full flex justify-center items-center text-white bg-[#211C6A] text-sm ml-4 hover:text-[#211C6A] hover:bg-gray-300 transition ease-in-out duration-300`}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={
                                    selectedOrders.length === 0
                                        ? "Please select orders first!"
                                        : ""
                                }
                                disabled={selectedOrders.length === 0}
                                data-tooltip-place="top"
                                onClick={handleUpdateStatus}
                            >
                                <CiDeliveryTruck size={20} className="" />
                                <div className="ml-2">
                                    {orderAction[selectedButton]}
                                </div>
                            </button>
                        ) : selectedButton === 2 ? (
                            <button
                                type="button"
                                className={`px-4 py-2 ${
                                    selectedOrders.length === 0
                                        ? `cursor-not-allowed`
                                        : `cursor-pointer`
                                } rounded-full flex justify-center items-center text-white bg-[#211C6A] text-sm ml-4 hover:text-[#211C6A] hover:bg-gray-300 transition ease-in-out duration-300`}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={
                                    selectedOrders.length === 0
                                        ? "Please select orders first!"
                                        : ""
                                }
                                disabled={selectedOrders.length === 0}
                                data-tooltip-place="top"
                                onClick={handleUpdateStatus}
                            >
                                <CiDeliveryTruck size={20} className="" />
                                <div className="ml-2">
                                    {orderAction[selectedButton]}
                                </div>
                            </button>
                        ) : selectedButton === 3 ? (
                            <button
                                type="button"
                                className={`px-4 py-2 ${
                                    selectedOrders.length === 0
                                        ? `cursor-not-allowed`
                                        : `cursor-pointer`
                                } rounded-full flex justify-center items-center text-white bg-[#211C6A] text-sm ml-4 hover:text-[#211C6A] hover:bg-gray-300 transition ease-in-out duration-300`}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={
                                    selectedOrders.length === 0
                                        ? "Please select orders first!"
                                        : ""
                                }
                                disabled={selectedOrders.length === 0}
                                data-tooltip-place="top"
                                onClick={handleUpdateStatus}
                            >
                                <FaCheckCircle size={20} className="" />
                                <div className="ml-2">
                                    {orderAction[selectedButton]}
                                </div>
                            </button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>

                <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-sm ">
                    <thead>
                        <tr className="text-left bg-gray-300">
                            <th className="p-2">
                                <input
                                    type="checkbox"
                                    className="cursor-pointer"
                                    checked={areAllOrdersSelected}
                                    // onClick={handleAllSelectedOrders}
                                    onChange={handleAllSelectedOrders}
                                />
                            </th>
                            <th className="p-2" colSpan="4">
                                Product(s)
                            </th>
                            <th className="p-2"></th>
                            <th className="p-2">Order Total</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Shipping Method</th>
                            <th className="p-2">Payment Method</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction) => (
                            <OrderRow
                                key={transaction._id}
                                order={transaction}
                                selectedOrder={handleAddSelectedOrder}
                                isSelected={selectedOrders.includes(
                                    transaction._id
                                )}
                            />
                        ))}
                    </tbody>
                </table>

                <PaginationButtons
                    pageCount={maxPageCount > 0 ? maxPageCount : 1}
                    setCurrentPage={10}
                />
            </div>
        </div>
    );
};
