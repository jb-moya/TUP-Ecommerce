import React from "react";
import { FaEdit, FaBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa";
import defaultProfileImage from "../assets/images/defaultProfileImage.png";
import { useDispatch, useSelector } from "react-redux";

const UserProfileMenu = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    return (
        <div className="ml-40 w-[250px] flex-wrap flex flex-col">
            <div className="flex-wrap flex flex-row px-5 py-6 border-gray-300">
                <div className="w-10 h-10">
                    <img
                        className="w-full h-full rounded-full object-cover overflow-hidden"
                        src={
                            user.image
                                ? user.image
                                : defaultProfileImage
                        }
                        alt=""
                    />
                </div>
                <div className="ml-3 w-36 h-10 flex flex-col text-sm">
                    <p className="font-bold truncate">
                        {user.firstName} {user.lastName}
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
                    <a
                        href="/#"
                        className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white"
                    >
                        My Account
                    </a>
                    <a
                        href="/customeraccount"
                        className="mb-1 p-1 bg-[#211C6A] text-white"
                    >
                        Profile
                    </a>
                    <a
                        href="/customeraccount=password"
                        className="mb-3 p-1 hover:bg-[#211C6A] hover:text-white"
                    >
                        Set Password
                    </a>
                    <a
                        href="/#"
                        className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white"
                    >
                        Purchase History
                    </a>
                    <a
                        href="/notifications"
                        className="p-1 hover:bg-[#211C6A] hover:text-white"
                    >
                        Notifications
                    </a>
                </div>
            </div>
        </div>
    );
};

export default UserProfileMenu;
