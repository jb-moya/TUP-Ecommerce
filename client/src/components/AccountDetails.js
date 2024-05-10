import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import defaultProfileImage from "../Assets/defaultPP.png";
import PasswordSetting from "./PasswordSetting.js";
import PurchaseHistory from "./PurchaseHistory.js";
import EditProfileDetails from "./EditProfileSetting.js";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
axios.defaults.withCredentials = true;

export const UserAccountDetails = ({ section }) => {
    const { user } = useSelector((state) => state.user);

    console.log("userData", user);
    console.log("user", user);

    return (
        <div className="flex w=full mx-auto">
            <div className="ml-40 w-[250px] flex-wrap flex flex-col">
                <div className="flex-wrap flex flex-row px-5 py-6 border-gray-300">
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full rounded-full object-cover overflow-hidden"
                            src={
                                user && user.image
                                    ? user.image
                                    : defaultProfileImage
                            }
                            alt=""
                        />
                    </div>
                    <div className="ml-3 w-36 h-10 flex flex-col text-sm">
                        <p className="font-bold truncate">
                            {user && user.firstName ? user.firstName : "..."}{" "}
                            {user && user.lastName ? user.lastName : "..."}
                        </p>
                        <div className="flex flex-row text-sm">
                            <FaEdit size={18} />
                            <p className="truncate">Edit profile</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <hr className="border-t border-gray-300 w-5/6" />
                </div>
                <div className="flex flex-row mt-5 px-5 py-6">
                    <div className="w-1/5 flex flex-col justify-center items-center">
                        <div className="mb-24">
                            <MdAccountCircle size={24} />
                        </div>

                        <div className="mb-7">
                            <FaClockRotateLeft size={24} />
                        </div>
                        <div>
                            <FaBell size={24} />
                        </div>
                    </div>
                    <div className="px-3 w-4/5 flex flex-col justify-center text-sm">
                        <div className="mb-2 p-1">My Account</div>
                        <Link
                            to="/customeraccount"
                            className="mb-1 p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Profile
                        </Link>
                        <Link
                            to="/customeraccount/password"
                            className="mb-3 p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Set Password
                        </Link>
                        <Link
                            to="/customeraccount/purchasehistory"
                            className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Purchase History
                        </Link>
                        <Link
                            to="/notifications"
                            className="p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Notifications
                        </Link>
                    </div>
                </div>
            </div>

            {section === "profileSettings" && <EditProfileDetails />}
            {section === "passwordSettings" && <PasswordSetting />}
            {section === "purchaseHistory" && <PurchaseHistory />}

            {/*  */}
        </div>
    );
};
