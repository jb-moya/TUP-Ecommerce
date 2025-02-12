import React, { useEffect, useState } from "react";
import LinkRoute from "./LinkRoute.js";
import TMCLogo from "../Assets/Logo.png";
import { useNavigate, useSearchParams } from "react-router-dom";

import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { TbLetterX } from "react-icons/tb";
import defaultProfileImage from "../Assets/defaultPP.png";
import { useDispatch, useSelector } from "react-redux";
import {
    setLogged,
    logOut,
    isUserLogged,
    getUserRole,
} from "../features/user/userSlice.js";
import { Link } from "react-router-dom";
import { setSearchClicked } from "../features/searchSlice.js";
import { toast } from "react-toastify";

const ProfileMenu = ({ handleProfileMenuToggle, isProfileMenuOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const userRole = useSelector(getUserRole);

    const sellerMenus = [
        {
            to: "/seller/dashboard",
            menu: "Dashboard",
        },
        {
            to: "/seller/accountsettings",
            menu: "Account Settings",
        },
        {
            to: "/seller/productsOverview",
            menu: "Product Overview",
        },
        {
            to: "/seller/orders",
            menu: "My Orders",
        },
        {
            to: "/seller/addeditProduct",
            menu: "Add Product",
        },
        {
            to: "/seller/advertisement",
            menu: "My Advertisement",
        },
    ];

    const customerMenus = [
        { to: "/customer", menu: "Account Settings" },
        { to: "/customer/purchasehistory", menu: "My History" },
    ];

    const handleLogOut = async () => {
        try {
            await dispatch(logOut());
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
        <div className="cursor-pointer" onClick={handleProfileMenuToggle}>
            <div className="flex items-center hover:text-blue-500 duration-500 ease-in-out transition-all hover:scale-105">
                <img
                    src={user && user.image ? user.image : defaultProfileImage}
                    alt="MY FACE"
                    className="w-8 h-8 mr-[5px] border-2 border-blue-900 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <div className="leading-none">
                        {user.firstName && user.firstName}
                        {user.orgName && user.orgName}
                        {userRole === "admin" && "Admin"}
                    </div>
                    <div className="text-[10px] font-light text-center leading-none select-none">
                        logged in as {user.role}
                    </div>
                </div>
            </div>
            {isProfileMenuOpen && (
                <div className="absolute transition-all duration-500 ease-in-out text-[#211C6A] top-20 right-4 lg:right-[150px] bg-white border border-gray-200 rounded-lg shadow-lg">
                    <div className="flex flex-col text-center">
                        {user.role === "seller"
                            ? sellerMenus.map((link, index) => {
                                  return (
                                      <Link
                                          to={link.to}
                                          className="py-2 px-4 hover:bg-gray-300 text-center w-full"
                                          key={`${link}-${index}`}
                                      >
                                          {link.menu}
                                      </Link>
                                  );
                              })
                            : user.role === "customer"
                            ? customerMenus.map((link, index) => {
                                  return (
                                      <Link
                                          to={link.to}
                                          className="py-2 px-4 hover:bg-gray-300 text-center w-full"
                                          key={`${link}-${index}`}
                                      >
                                          {link.menu}
                                      </Link>
                                  );
                              })
                            : null}
                        <div
                            className="py-2 px-4 hover:bg-gray-300"
                            onClick={handleLogOut}
                        >
                            Logout
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export const NavBar = ({
    bgColor = "bg-slate-100",
    bgColorAnnouncement = "bg-[#211C6A]",
    ColorAnnouncementText = "text-[#EFEFEF]",
    textColor = "text-[#211C6A]",
    border = "border-b-[#211C6A]",
    logo = TMCLogo,
}) => {
    const dispatch = useDispatch();
    const userLogged = useSelector(isUserLogged);
    const { productCount } = useSelector((store) => store.cart);
    const { user } = useSelector((state) => state.user);
    const userRole = useSelector(getUserRole);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const navigate = useNavigate();
    let [searchParams, setSearchParams] = useSearchParams();

    const handleNav = () => {
        if (isProfileMenuOpen) {
            setIsProfileMenuOpen(false);
        }
        setNav(!nav);
    };

    const handleProfileMenuToggle = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleClick = () => {
        navigate("/login");
    };

    const handleSearch = () => {
        if (!searchValue) {
            return;
        }

        setSearchParams({ keyword: searchValue });
        navigate(`/search?keyword=${encodeURIComponent(searchValue)}`);

        dispatch(setSearchClicked(true));
    };

    const [nav, setNav] = useState(true);

    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleClearInput = () => {
        setSearchValue("");
    };

    const handleGoToCart = () => {
        navigate("/cart");
        window.location.reload();
    };

    const links = [
        { to: "/", text: "Home" },
        { to: "/about", text: "About" },
        { to: "/sellercenter", text: "Seller Centre" },
    ];

    if (userRole === "admin") {
        links.push({ to: "/admin", text: "Admin" });
    }

    return (
        <div
            className={`${bgColor} border-b-[1px] ${border} fixed top-0 left-0 w-full z-50`}
        >
            <div
                className={`flex w-full h-[25px] ${bgColorAnnouncement} justify-center p-1 `}
            >
                <p className={`${ColorAnnouncementText} text-sm font-light`}>
                    FREE SHIPPING ON YOUR FIRST PURCHASE. FEB. 25–28.
                </p>
            </div>
            <div
                className={`${textColor} flex overflow-hidden max-w-[1240px] h-16 justify-between items-center mx-auto text-nowrap`}
            >
                <div className="flex items-center select-none font-bold">
                    <img
                        className="w-20 h-20 drop-shadow-2xl"
                        src={logo}
                        alt="Logo Here"
                        loading="lazy"
                    />
                    <h1 className="text-xl">TUP Merch Co.</h1>
                </div>

                <div className="hidden md:flex text-based font-semibold h-full justify-center">
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            className="w-full h-full px-4 content-center hover:text-[#0084ff] hover:border-b-2 hover:border-[#0084ff] transition-all ease-in-out duration-300"
                            to={link.to}
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>

                <div className="flex p-2 items-center justify-between">
                    {user && user.role === "customer" && (
                        <div
                            className="pr-4 cursor-pointer"
                            onClick={handleGoToCart}
                        >
                            <div className="flex relative hover:scale-110 transition duration-200 ease-in-out">
                                <FaShoppingCart size={20} />
                                {productCount > 0 && (
                                    <div className="bg-red-500 absolute -right-2 -top-2 text-[12px] w-[18px] h-[15px] text-white rounded-full flex justify-center items-center">
                                        {productCount}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                    <div className="pr-6 cursor-pointer" onClick={handleNav}>
                        <FaSearch
                            className="hover:scale-110 transition duration-200 ease-in-out"
                            size={20}
                        />
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
                                    onClick={handleSearch}
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

                    {userLogged ? (
                        <ProfileMenu
                            bgColor={bgColor}
                            textColor={textColor}
                            handleProfileMenuToggle={handleProfileMenuToggle}
                            isProfileMenuOpen={isProfileMenuOpen}
                        />
                    ) : (
                        <button
                            onClick={handleClick}
                            className={`${ColorAnnouncementText} ${bgColorAnnouncement} hover:shadow-zinc-50 rounded-full hover:shadow-sm hover:scale-[1.1] font-semibold py-2 px-5 border border-[#211C6A] text-sm transition ease-in-out duration-200`}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
