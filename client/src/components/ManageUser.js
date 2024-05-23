import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import defaultProfileImage from "../Assets/defaultPP.png";
import formatData from "./utils/formatData.js";
import {
    buildQueryParam,
    buildQueryArrayParam,
} from "./utils/buildQueryParams.js";
import classNames from "classnames";
axios.defaults.withCredentials = true;

const SellerRow = ({ seller }) => {
    const navigate = useNavigate();

    const handleReviewButtonClick = () => {
        navigate(`/admin/seller-review-form/${seller._id}`);
    };

    const updateStatusOrganization = async (status) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/v1/user/updateStatusOrganization`,
                {
                    id: seller._id,
                    status: status,
                }
            );
            console.log("response", response.data);
            toast.info(`Organization ${status} successfully`);
        } catch (error) {
            console.error(error);
            toast.error(`Failed to ${status} organization`);
        }
    };

    const statusColor = classNames({
        "text-green-500": seller.status === "approved",
        "text-yellow-500": seller.status === "pending",
        "text-red-500": seller.status === "banned",
        "text-black bg-black": seller.status === "rejected",
    });

    return (
        <tr>
            <td className="p-2">
                <img
                    src={seller.image ? seller.image : defaultProfileImage}
                    alt="User"
                    className="w-8 h-8 rounded-full"
                />
            </td>
            <td className="p-2">{seller.orgName}</td>
            <td className={`p-2 ${statusColor}`}>{seller.status}</td>
            <td className="p-2">{formatData(seller.createdAt)}</td>
            <td className="p-2 text-center">
                {seller.status === "pending" && (
                    <>
                        <button
                            type="button"
                            className="text-green-500 hover:text-green-700 mx-2 hover:scale-150"
                            onClick={() => updateStatusOrganization("approved")}
                        >
                            Approve
                        </button>
                        <button
                            type="button"
                            className="text-black bg-red hover:text-red-700 mx-2 hover:scale-150"
                            onClick={() => updateStatusOrganization("rejected")}
                        >
                            Reject
                        </button>
                    </>
                )}
                <button
                    type="button"
                    className="text-blue-500 hover:text-blue-700 mx-2 hover:scale-150"
                    onClick={handleReviewButtonClick}
                >
                    Review
                </button>
                <button
                    type="button"
                    className="text-red-500 hover:font-bold hover:scale-150 mx-2"
                    onClick={() => updateStatusOrganization("banned")}
                >
                    Ban
                </button>
            </td>
        </tr>
    );
};

const status = {
    0: "",
    1: "pending",
    2: "banned",
    3: "approved",
    4: "rejected",
};

function getKeyByValue(object, value) {
    return Object.entries(object).find(([key, val]) => val === value)?.[0];
}

export const ManageUser = () => {
    let location = useLocation();
    const [selectedButton, setSelectedButton] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [users, setUsers] = useState([]);
    const [count, setCount] = useState(0);

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        if (searchParams.has("page")) {
            setCurrentPage(searchParams.get("page"));
        }

        if (searchParams.has("status")) {
            setSelectedButton(
                parseInt(getKeyByValue(status, searchParams.get("status")))
            );
        }

        console.log("searchParams", searchParams);
    }, [location.search]);

    const fetchAllUsers = useCallback(async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/user",
                {
                    params: {
                        page: currentPage,
                        role: "seller",
                        status: status[selectedButton],
                    },
                }
            );
            console.log("data", data);
            setUsers(data.users);
            setCount(data.users.length);
        } catch (error) {
            console.error(error);
        } finally {
            toast.success("Products loaded successfully");
        }
    }, [currentPage, selectedButton]);

    useEffect(() => {
        fetchAllUsers();

        const params = [
            buildQueryParam("page", currentPage),
            buildQueryParam("role", "organization"),
            buildQueryParam("status", status[selectedButton]),
        ].filter(Boolean);

        const newUrl = `${location.pathname}?${params.join("&")}`;

        window.history.pushState({ path: newUrl }, "", newUrl);
    }, [fetchAllUsers, currentPage, selectedButton, location]);

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
            <ul className="flex border-b-2 border-gray-200 w-full px-4 text-gray-500">
                <li
                    onClick={() => handleButtonClick(0)}
                    className={`p-4 cursor-pointer hover:border-b-2 mr-4 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
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
                    Pending
                </li>
                <li
                    onClick={() => handleButtonClick(2)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 2
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Banned
                </li>
                <li
                    onClick={() => handleButtonClick(3)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 3
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Approved
                </li>
                <li
                    onClick={() => handleButtonClick(4)}
                    className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 4
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Rejected
                </li>
            </ul>

            <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
                <thead>
                    <tr className="text-left bg-gray-300">
                        <th className="p-2">img</th>
                        <th className="p-2">username</th>
                        <th className="p-2">status</th>
                        <th className="p-2">submitted on</th>
                        <th className="p-2 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody className="">
                    {users.map((user) => (
                        <SellerRow key={user._id} seller={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};
