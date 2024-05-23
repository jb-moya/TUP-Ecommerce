import React, { useState, useEffect, useCallback } from "react";
import defaultProfileImage from "../Assets/defaultPP.png";
import { NavBar } from "../components/NavBar.js";
import Footer from "../components/Footer.js";
import { useNavigate } from "react-router-dom";
import { IoBag } from "react-icons/io5";
import { FaBan, FaHouseUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { ManageUser, UserOverview } from "../components/ManageUser.js";
import { MdCategory } from "react-icons/md";
import { ManageProducts } from "../components/ManageProducts.js";
import { ManageCategories } from "../components/ManageCategories.js";
import { ProductViolationForm } from "../components/ProductViolationForm.js";
import { Tooltip } from "react-tooltip";

const iconSize = 20;
const menuItems = [
    {
        icon: <FaHouseUser size={iconSize} />,
        text: "Manage Users",
        path: "manageUsers",
    },
    {
        icon: <IoBag size={iconSize} />,
        text: "Manage Products",
        path: "manageProducts",
    },
    {
        icon: <FaBan size={iconSize} />,
        text: "File a Product Violations",
        path: "addProductViolation",
    },
];

const AdminMainPage = ({ settingsMenu = 0 }) => {
    const navigate = useNavigate();

    const AdminMenuButton = ({
        icon,
        text,
        selected,
        onClick,
        disabled = false,
    }) => (
        <>
            {disabled && (
                <Tooltip
                    id="my-tooltip"
                    style={{
                        backgroundColor: "#211c6a",
                        color: "#fff",
                        borderRadius: "8px",
                    }}
                />
            )}

            <button
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                    disabled ? "Go to manage product to add violation" : ""
                }
                onClick={onClick}
                className={`flex flex-col hover:bg-[#211C6A] hover:opacity-50 mx-4 transition ease-in-out duration-200 hover:text-white mt-2 rounded-xl ${
                    selected ? "bg-[#211C6A] text-white" : ""
                } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
                disabled={disabled}
            >
                <div className="flex items-center m-2">
                    {icon}
                    <p className="px-2 py-1 font-medium text-sm">{text}</p>
                </div>
            </button>
        </>
    );

    const [selectedButton, setSelectedButton] = useState(settingsMenu);

    useEffect(() => {
        setSelectedButton(settingsMenu);
    }, [settingsMenu]);

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
        navigate(`/admin/${menuItems[buttonNumber].path}`);
    };

    return (
        <div>
            <NavBar />
            <div className="flex text-[#211C6A] pt-[96px]">
                <div className="flex w-full max-w-[1240px] h-full mx-auto p-4">
                    <div className="w-[300px] flex flex-col m-4 bg-white shadow-md rounded-xl pb-4">
                        <div className="flex justify-center items-center">
                            <div className="flex justify-between w-[220px] items-center my-4 p-2">
                                <img
                                    className="rounded-full h-[60px] w-[60px] drop-shadow-lg"
                                    src={defaultProfileImage}
                                    alt="Logo Here"
                                />

                                <div className="flex justify-center text-nowrap items-center text-sm font-semibold py-2 px-4">
                                    Admin
                                </div>
                            </div>
                        </div>

                        <div className="w-full flex justify-center">
                            <hr className="border-t border-gray-300 w-5/6" />
                        </div>

                        {menuItems.map((item, index) => (
                            <AdminMenuButton
                                key={index}
                                icon={item.icon}
                                text={item.text}
                                selected={selectedButton === index}
                                onClick={() => handleButtonClick(index)}
                                disabled={index === 2}
                            />
                        ))}
                    </div>

                    <div className="font-semibold p-4 max-w-[900px] w-full">
                        {selectedButton === 0 && <ManageUser />}
                        {selectedButton === 1 && <ManageProducts />}
                        {selectedButton === 2 && <ProductViolationForm />}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default AdminMainPage;
