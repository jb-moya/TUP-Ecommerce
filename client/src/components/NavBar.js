import React, {useState } from "react";
import LinkRoute from "./LinkRoute.js";
import TMCLogo from "../Assets/Logo.png";
import ColoredTMCLogo from "../Assets/LogoBlue.png"
import { useNavigate } from "react-router-dom";

//Icons
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { TbLetterX } from "react-icons/tb";

export const NavBar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the desired route
        navigate("/login");
    };

    const [nav, setNav] = useState(true)

    const handleNav = () => {
        setNav(!nav);
    };

    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClearInput = () => {
        setSearchValue("");
    };

    return (
        // content wrapper
        <div className="bg-[#EFEFEF] border-b-[1px] border-b-[#211C6A] fixed top-0 left-0 w-full z-50">
            <div className=" flex w-full h-[25px] bg-[#211C6A] justify-center p-1 "> 
                <p className="text-white text-sm font-light">
                    FREE SHIPPING ON YOUR FIRST PURCHASE. FEB. 25–28. 
                </p>
            
            </div>
            <div className="flex overflow-hidden max-w-[1240px] px-4 h-16 text-[#211C6A] justify-between items-center mx-auto text-nowrap">
                <div className="flex items-center select-none font-bold">
                    <img
                        className="w-20 h-20"
                        src={TMCLogo}
                        alt="Logo Here"
                        loading="lazy"
                    />
                    <h1 className="text-xl">TUP Merch Co.</h1>
                </div>

                <ul className="hidden md:flex text-based font-semibold">
                    <li className="p-4">
                        <LinkRoute to="/" text="Home" />
                    </li>
                    <li className="p-4">
                        <LinkRoute to="/about" text="About" />
                    </li>
                    <li className="p-4">
                        <LinkRoute to="/" text="Contact" />
                    </li>
                    <li className="p-4">
                        <LinkRoute to="/" text="Seller Center" />
                    </li>
                </ul>

                <div className="flex p-2 items-center justify-between">
                    <div className="pr-4 cursor-pointer">
                        <FaShoppingCart className="hover:scale-110 transition duration-200 ease-in-out" size={20} />
                    </div>
                    <div className="pr-6 cursor-pointer" onClick={handleNav}>
                        <FaSearch className="hover:scale-110 transition duration-200 ease-in-out" size={20} />
                    </div>

                    <div
                        className={
                            !nav
                                ? "fixed left-0 top-0 flex items-center justify-center w-full h-[89px] bg-[#EFEFEF] border-b border-b-[#211C6A] z-50 font-light ease-in-out duration-500"
                                : "fixed top-[-100%]"
                        }
                    >
                        <div className="relative">
                            <input
                                className="pl-4 pr-24 h-12 w-[800px] text-black border border-[#211C6A]"
                                type="text"
                                placeholder="Search"
                                value={searchValue}
                                onChange={handleInputChange}
                            />
                            {searchValue && (
                                <div
                                    className="absolute p-3 top-[-10px] right-[30px] mt-3 mr-4"
                                    onClick={handleClearInput}
                                >
                                    <TiDeleteOutline
                                        size={20}
                                        style={{
                                            color: "#211C6A",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            )}
                            <div className="absolute border-l border-l-[#211C6A] border-opacity-50 p-3 top-[-10px] right-[-15px] mt-3 mr-4">
                                <FaSearch
                                    size={20}
                                    style={{ color: "#211C6A" }}
                                />
                            </div>
                        </div>
                        <div className="p-3 cursor-pointer" onClick={handleNav}>
                            <TbLetterX
                                className="hover:scale-110"
                                size={20}
                                style={{ color: "#211C6A" }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleClick}
                        className="hover:bg-[#e8e8e8] text-[#211C6A] font-semibold py-2 px-5 border border-[#211C6A] text-sm transition ease-in-out duration-200 "
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};


export const ColoredNavBar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the desired route
        navigate("/login");
    };

    const [nav, setNav] = useState(true)

    const handleNav = () => {
        setNav(!nav);
    };

    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClearInput = () => {
        setSearchValue("");
    };

    return (
        // content wrapper
        <div className="bg-[#211C6A] border-b-[1px] border-b-[#EFEFEF] fixed top-0 left-0 w-full z-50">
            <div className=" flex w-full h-[25px] bg-[#EFEFEF] justify-center p-1 "> 
                <p className="text-[#211C6A] text-sm font-light">
                    FREE SHIPPING ON YOUR FIRST PURCHASE. FEB. 25–28. 
                </p>
            
            </div>
            <div className="flex overflow-hidden max-w-[1240px] px-4 h-16 text-[#EFEFEF] justify-between items-center mx-auto text-nowrap">
                <div className="flex items-center select-none font-bold">
                    <img
                        className="w-20 h-20"
                        src={ColoredTMCLogo }
                        alt="Logo Here"
                        loading="lazy"
                    />
                    <h1 className="text-xl">TUP Merch Co.</h1>
                </div>

                <ul className="hidden md:flex text-based font-semibold">
                    <li className="p-4">
                        <LinkRoute to="/" text="Home" />
                    </li>
                    <li className="p-4">
                        <LinkRoute to="/about" text="About" />
                    </li>
                    <li className="p-4">
                        <LinkRoute to="/" text="Contact" />
                    </li>
                    <li className="p-4">
                        <LinkRoute to="/" text="Seller Center" />
                    </li>
                </ul>

                <div className="flex p-2 items-center justify-between">
                    <div className="pr-4 cursor-pointer">
                        <FaShoppingCart className="hover:scale-110 transition duration-200 ease-in-out" size={20} />
                    </div>
                    <div className="pr-6 cursor-pointer" onClick={handleNav}>
                        <FaSearch className="hover:scale-110 transition duration-200 ease-in-out" size={20} />
                    </div>

                    <div
                        className={
                            !nav
                                ? "fixed left-0 top-0 flex items-center justify-center w-full h-[89px] bg-[#EFEFEF] border-b border-b-[#211C6A] z-50 font-light ease-in-out duration-500"
                                : "fixed top-[-100%]"
                        }
                    >
                        <div className="relative">
                            <input
                                className="pl-4 pr-24 h-12 w-[800px] text-black border border-[#211C6A]"
                                type="text"
                                placeholder="Search"
                                value={searchValue}
                                onChange={handleInputChange}
                            />
                            {searchValue && (
                                <div
                                    className="absolute p-3 top-[-10px] right-[30px] mt-3 mr-4"
                                    onClick={handleClearInput}
                                >
                                    <TiDeleteOutline
                                        size={20}
                                        style={{
                                            color: "#211C6A",
                                            cursor: "pointer",
                                        }}
                                    />
                                </div>
                            )}
                            <div className="absolute border-l border-l-[#211C6A] border-opacity-50 p-3 top-[-10px] right-[-15px] mt-3 mr-4">
                                <FaSearch
                                    size={20}
                                    style={{ color: "#211C6A" }}
                                />
                            </div>
                        </div>
                        <div className="p-3 cursor-pointer" onClick={handleNav}>
                            <TbLetterX
                                className="hover:scale-110"
                                size={20}
                                style={{ color: "#211C6A" }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleClick}
                        className="hover:bg-[#a5a5a5] text-[#EFEFEF] font-semibold py-2 px-5 border border-[#EFEFEF] text-sm transition ease-in-out duration-200 "
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};
