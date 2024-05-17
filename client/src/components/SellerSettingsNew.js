import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { IoBag } from "react-icons/io5";
import { RiAdvertisementFill } from "react-icons/ri";
import { DashboardFrame } from "./DashboardFrame.js";
import { Orders } from "./Orders.js";
import Products from "./Products.js";
import { useSelector } from "react-redux";
import defaultProfileImage from "../Assets/defaultPP.png";
import { IoSettingsOutline } from "react-icons/io5";
import SellerAccountSettings from "./SellerAccountSettings.js";
import { RiAddLargeFill } from "react-icons/ri";
import { AddProductFrame } from "./AddProductFrame.js";
import { useNavigate } from "react-router-dom";
import { NavBar } from "./NavBar.js";
import Footer from "./Footer.js";
import { FaBan } from "react-icons/fa";
import { toast } from "react-toastify";

const SellerMenuButton = ({ icon, text, selected, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col hover:bg-[#211C6A] hover:opacity-50 mx-4 transition ease-in-out duration-200 hover:text-white mt-2 rounded-xl ${
            selected ? "bg-[#211C6A] text-white" : ""
        }`}
    >
        <div className="flex items-center m-2">
            {icon}
            <p className="px-2 py-1 font-medium text-sm">{text}</p>
        </div>
    </button>
);

const iconSize = 20;
const menuItems = [
    {
        icon: <MdDashboard size={iconSize} />,
        text: "Dashboard",
        path: "dashboard",
    },
    {
        icon: <IoSettingsOutline size={iconSize} />,
        text: "Account Settings",
        path: "accountsettings",
    },
    {
        icon: <BiPurchaseTag size={iconSize} />,
        text: "Orders",
        path: "orders",
    },
    {
        icon: <IoBag size={iconSize} />,
        text: "Products Overview",
        path: "productsOverview",
    },
    {
        icon: <RiAddLargeFill size={iconSize} />,
        text: "Add/Edit Product",
        path: "addeditProduct",
    },
    {
        icon: <RiAdvertisementFill size={iconSize} />,
        text: "Advertisement",
        path: "Advertisement",
    },
];

const SellerSettings = ({ settingsMenu = 0 }) => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const [selectedButton, setSelectedButton] = useState(settingsMenu);

    console.log(
        "selectedButton.js: settubngMenu: ",
        settingsMenu,
        "button",
        selectedButton
    );

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
        navigate(`/seller/${menuItems[buttonNumber].path}`);
    };

    useEffect(() => {
        setSelectedButton(settingsMenu);
    }, [settingsMenu]);

    useEffect(() => {
        console.log("selectedButton.js: selectedButton: ", selectedButton);
    }, [selectedButton]);

    return (
        <>
            <NavBar />
            <div className="flex text-[#211C6A] pt-[96px]">
                <div className="flex w-full max-w-[1240px] h-full mx-auto p-4">
                    <div className="w-[300px] flex flex-col m-4 bg-white shadow-md rounded-xl">
                        <div className="flex justify-center items-center my-4 p-2">
                            <img
                                className="rounded-full h-[60px] w-[60px] drop-shadow-lg"
                                src={
                                    user && user.image
                                        ? user.image
                                        : defaultProfileImage
                                }
                                alt="Logo Here"
                            />

                            <div className="flex justify-center items-center text-sm font-semibold py-2 px-4">
                                {user && user.orgName}
                            </div>
                        </div>

                        <div className="w-full flex justify-center">
                            <hr className="border-t border-gray-300 w-5/6" />
                        </div>

                        {menuItems.map((item, index) => (
                            <SellerMenuButton
                                key={index}
                                icon={item.icon}
                                text={item.text}
                                selected={selectedButton === index}
                                onClick={() => handleButtonClick(index)}
                            />
                        ))}
                    </div>

                    <div className="font-semibold p-4 max-w-[900px] w-full">
                        {selectedButton === 0 && <DashboardFrame />}
                        {selectedButton === 1 && <SellerAccountSettings />}
                        {selectedButton === 2 && <Orders />}
                        {selectedButton === 3 && <Products />}
                        {selectedButton === 4 && <AddProductFrame />}
                        {selectedButton === 5 && (
                            <div className="flex flex-col items-center justify-center">
                                <FaBan size={100} className="text-red-500" />
                                <p className="text-xl font-semibold">
                                    Advertisement Feature is not yet available.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default SellerSettings;
