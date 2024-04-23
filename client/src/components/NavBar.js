import React, { useEffect, useState } from "react";
import LinkRoute from "./LinkRoute.js";
import TMCBlueBGLogo from "../Assets/LogoBlue.png";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";

//Icons

import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { TbLetterX } from "react-icons/tb";

const NavBar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the desired route
        navigate("/login");
    };

    const [scrollOpacity, setScrollOpacity] = useState(0); // Initially transparent

    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY;
            // Calculate the opacity based on scroll position
            const opacity = Math.min(0.7, scrolled / 100); // Change 100 to adjust the scroll threshold
            setScrollOpacity(opacity);
        };

        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);

        // Remove scroll event listener on component unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

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
        <div
            className="fixed top-0 left-0 w-full bg-[#211C6A] z-40"
            style={{
                backgroundColor: `rgba(33, 28, 106, ${
                    scrollOpacity === 0 ? 1 : 0.8
                })`,
            }}
        >
            <div className="flex overflow-hidden max-w-[1240px] px-4 h-24 text-white justify-between items-center font-bold mx-auto text-nowrap">
                <div className="flex items-center select-none">
                    <img
                        className="w-20 h-20"
                        src={TMCBlueBGLogo}
                        alt="Logo Here"
                        loading="lazy"
                    />
                    <h1 className="text-xl">TUP Merch Co.</h1>
                </div>

                <ul className="hidden md:flex text-based">
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
                        <LinkRoute to="/" text="Shop Now!" />
                    </li>
                </ul>

                <div className="flex p-2 items-center justify-between">
                    <div className="pr-4 cursor-pointer">
                        <FaShoppingCart className="hover:scale-110 transition duration-200 ease-in-out" size={28} />
                    </div>
                    <div className="pr-6 cursor-pointer" onClick={handleNav}>
                        <FaSearch className="hover:scale-110 transition duration-200 ease-in-out" size={28} />
                    </div>

                    <div
                        className={
                            !nav
                                ? "fixed left-0 top-0 flex items-center justify-center w-full h-24 bg-[#EFEFEF] border-b border-b-[#211C6A] z-50 font-light ease-in-out duration-500"
                                : "fixed top-[-100%]"
                        }
                    >
                        <div className="relative">
                            <input
                                className="pl-4 pr-24 h-12 w-[800px] text-black border border-[#211C6A] rounded-lg"
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
                        className="bg-white hover:bg-[#EFEFEF] text-[#211C6A] font-bold py-3 px-5 rounded-2xl text-sm"
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
