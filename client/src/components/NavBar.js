import React, { useEffect, useState } from "react";
import LinkRoute from "./LinkRoute.js";
import TMCLogo from "../Assets/Logo.png";
import ColoredTMCLogo from "../Assets/LogoBlue.png";
import { useNavigate } from "react-router-dom";

//Icons
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { TbLetterX } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import defaultProfileImage from "../Assets/defaultPP.png";

const ProfileMenu = ({
    image,
    userName,
    handleProfileMenuToggle,
    logOut,
    isProfileMenuOpen,
}) => {
    return (
        <div className="cursor-pointer" onClick={handleProfileMenuToggle}>
            <div className="flex flex-row">
                <img
                    src={image || defaultProfileImage}
                    alt="MY FACE"
                    className="w-8 h-8 border-2 border-blue-900 rounded-full"
                />
                <div className="px-1 self-center">{userName}</div>
            </div>
            {isProfileMenuOpen && (
                <div className="absolute transition duration-200 ease-in-out text-[#211C6A] top-20 right-4 lg:right-[150px] bg-white border border-gray-200 rounded shadow-lg">
                    <ul>
                        <li className="py-2 px-4 hover:bg-gray-300">
                            {" "}
                            <a href="/customeraccount">My Account</a>
                        </li>
                        <li className="py-2 px-4 hover:bg-gray-300">
                            My Purchase
                        </li>
                        <li
                            className="py-2 px-4 hover:bg-gray-300"
                            onClick={logOut}
                        >
                            Logout
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export const NavBar = ({
    bgColor = "bg-[#EFEFEF]",
    bgColorAnnouncement = "bg-[#211C6A]",
    ColorAnnouncementText = "text-[#EFEFEF]",
    textColor = "text-[#211C6A]",
    border = "border-b-[#211C6A]",
    logo = TMCLogo,
}) => {
    const [profilePicture, setProfilePicture] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            // Parse the JSON string back into an object

            const userObject = JSON.parse(storedUser);
            // console.log("User data found in localStorage:", userObject);

            // Now you can access properties of the user object
            // console.log("User ID:", userObject.user._id);
            // console.log("First Name:", userObject.user.firstName);
            // console.log("Last Name:", userObject.user.lastName);
            // console.log("Email:", userObject.user.email);
            // console.log("Role:", userObject.user.role);

            setProfilePicture(userObject.user.image);
            setUserName(userObject.user.firstName);
            // Access other properties as needed

            // Set the user object in your component state if necessary
            // setUser(userObject);
        } else {
            console.log("User data not found in localStorage.");
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const handleNav = () => {
        if (isProfileMenuOpen) {
            setIsProfileMenuOpen(false);
        }
        setNav(!nav);
    };
    const handleProfileMenuToggle = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };
    const logOut = () => {
        // Log out the user
        // console.log("Logging out...");
        try {
            axios.post("http://localhost:5000/api/v1/auth/logout");
            localStorage.setItem("isLoggedIn", "false");
            // console.log("Logged O U T", localStorage.getItem("isLoggedIn"));

            // Remove the user object from localStorage
            localStorage.removeItem("user");

            // Redirect to the login page

            // Refresh the page
            navigate("/");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const [isLoggedIn, setIsLoggedIn] = useState(
        localStorage.getItem("isLoggedIn")
    );

    useEffect(() => {
        setIsLoggedIn(localStorage.getItem("isLoggedIn"));
    }, []);

    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the desired route
        navigate("/login");
    };

    const [nav, setNav] = useState(true);

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
            className={`${bgColor} border-b-[1px] ${border} fixed top-0 left-0 w-full z-50`}
        >
            <div className={`flex w-full h-[25px] ${bgColorAnnouncement} justify-center p-1 `}>
                <p className={`${ColorAnnouncementText} text-sm font-light`}>
                    FREE SHIPPING ON YOUR FIRST PURCHASE. FEB. 25–28.
                </p>
            </div>
            <div
                className={`${textColor} flex overflow-hidden max-w-[1240px] px-4 h-16 justify-between items-center mx-auto text-nowrap`}
            >
                <div className="flex items-center select-none font-bold">
                    <img
                        className="w-20 h-20"
                        src={logo}
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
                        <LinkRoute to="/sellercenter" text="Seller Centre" />
                    </li>
                </ul>

                <div className="flex p-2 items-center justify-between">
                    <div className="pr-4 cursor-pointer">
                        <FaShoppingCart
                            className="hover:scale-110 transition duration-200 ease-in-out"
                            size={20}
                        />
                    </div>
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

                    {isLoggedIn === "true" ? (
                        <ProfileMenu
                            bgColor={bgColor}
                            textColor={textColor}
                            image={profilePicture}
                            userName={userName}
                            handleProfileMenuToggle={handleProfileMenuToggle}
                            logOut={logOut}
                            isProfileMenuOpen={isProfileMenuOpen}
                        />
                    ) : (
                        <button
                            onClick={handleClick}
                            className={`${ColorAnnouncementText} ${bgColorAnnouncement} hover:shadow-zinc-50 hover:shadow-sm hover:scale-[1.1] font-semibold py-2 px-5 border border-[#211C6A] text-sm transition ease-in-out duration-200`}
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

// export const ColoredNavBar = () => {
//     const navigate = useNavigate();

//     const handleClick = () => {
//         // Navigate to the desired route
//         navigate("/login");
//     };

//     const [nav, setNav] = useState(true);

//     const handleNav = () => {
//         setNav(!nav);
//     };

//     const [searchValue, setSearchValue] = useState("");

//     const handleInputChange = (event) => {
//         setSearchValue(event.target.value);
//     };

//     const handleClearInput = () => {
//         setSearchValue("");
//     };

//     return (
//         // content wrapper
//         <div className="bg-[#211C6A] border-b-[1px] border-b-[#EFEFEF] fixed top-0 left-0 w-full z-50">
//             <div className=" flex w-full h-[25px] bg-[#EFEFEF] justify-center p-1 ">
//                 <p className="text-[#211C6A] text-sm font-light">
//                     FREE SHIPPING ON YOUR FIRST PURCHASE. FEB. 25–28.
//                 </p>
//             </div>
//             <div className="flex overflow-hidden max-w-[1240px] px-4 h-16 text-[#EFEFEF] justify-between items-center mx-auto text-nowrap">
//                 <div className="flex items-center select-none font-bold">
//                     <img
//                         className="w-20 h-20"
//                         src={ColoredTMCLogo}
//                         alt="Logo Here"
//                         loading="lazy"
//                     />
//                     <h1 className="text-xl">TUP Merch Co.</h1>
//                 </div>

//                 <ul className="hidden md:flex text-based font-semibold">
//                     <li className="p-4">
//                         <LinkRoute to="/" text="Home" />
//                     </li>
//                     <li className="p-4">
//                         <LinkRoute to="/about" text="About" />
//                     </li>
//                     <li className="p-4">
//                         <LinkRoute to="/" text="Contact" />
//                     </li>
//                     <li className="p-4">
//                         <LinkRoute to="/sellercenter" text="Seller Centre" />
//                     </li>
//                 </ul>

//                 <div className="flex p-2 items-center justify-between">
//                     <div className="pr-4 cursor-pointer">
//                         <FaShoppingCart
//                             className="hover:scale-110 transition duration-200 ease-in-out"
//                             size={20}
//                         />
//                     </div>
//                     <div className="pr-6 cursor-pointer" onClick={handleNav}>
//                         <FaSearch
//                             className="hover:scale-110 transition duration-200 ease-in-out"
//                             size={20}
//                         />
//                     </div>

//                     <div
//                         className={
//                             !nav
//                                 ? "fixed left-0 top-0 flex items-center justify-center w-full h-[89px] bg-[#EFEFEF] border-b border-b-[#211C6A] z-50 font-light ease-in-out duration-500"
//                                 : "fixed top-[-100%]"
//                         }
//                     >
//                         <div className="relative">
//                             <input
//                                 className="pl-4 pr-24 h-12 w-[800px] text-black border border-[#211C6A]"
//                                 type="text"
//                                 placeholder="Search"
//                                 value={searchValue}
//                                 onChange={handleInputChange}
//                             />
//                             {searchValue && (
//                                 <div
//                                     className="absolute p-3 top-[-10px] right-[30px] mt-3 mr-4"
//                                     onClick={handleClearInput}
//                                 >
//                                     <TiDeleteOutline
//                                         size={20}
//                                         style={{
//                                             color: "#211C6A",
//                                             cursor: "pointer",
//                                         }}
//                                     />
//                                 </div>
//                             )}
//                             <div className="absolute border-l border-l-[#211C6A] border-opacity-50 p-3 top-[-10px] right-[-15px] mt-3 mr-4">
//                                 <FaSearch
//                                     size={20}
//                                     style={{ color: "#211C6A" }}
//                                 />
//                             </div>
//                         </div>
//                         <div className="p-3 cursor-pointer" onClick={handleNav}>
//                             <TbLetterX
//                                 className="hover:scale-110"
//                                 size={20}
//                                 style={{ color: "#211C6A" }}
//                             />
//                         </div>
//                     </div>

//                     <button
//                         onClick={handleClick}
//                         className="hover:bg-[#a5a5a5] text-[#EFEFEF] font-semibold py-2 px-5 border border-[#EFEFEF] text-sm transition ease-in-out duration-200 "
//                     >
//                         Login
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export const NavbarUser = () => {
//     const [nav, setNav] = useState(true);
//     const [searchValue, setSearchValue] = useState("");
//     const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

//     const logOut = () => {
//         // Log out the user
//         console.log("Logging out...");
//         try {
//             axios.post("http://localhost:5000/api/v1/auth/logout");
//             localStorage.setItem("isLoggedIn", false);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     const handleNav = () => {
//         if (isProfileMenuOpen) {
//             setIsProfileMenuOpen(false);
//         }
//         setNav(!nav);
//     };

//     const handleInputChange = (event) => {
//         setSearchValue(event.target.value);
//     };

//     const handleClearInput = () => {
//         setSearchValue("");
//     };

//     const handleProfileMenuToggle = () => {
//         setIsProfileMenuOpen(!isProfileMenuOpen);
//     };

//     return (
//         <div className="bg-[#EFEFEF] border-b-[1px] border-b-[#211C6A] fixed top-0 left-0 w-full z-50">
//             <div className="flex w-full h-[25px] bg-[#211C6A] justify-center p-1">
//                 <p className="text-white text-sm font-light">
//                     FREE SHIPPING ON YOUR FIRST PURCHASE. FEB. 25–28.
//                 </p>
//             </div>
//             <div className="flex overflow-hidden max-w-[1240px] px-4 h-16 text-[#211C6A] justify-between items-center mx-auto text-nowrap">
//                 <div className="flex items-center select-none font-bold">
//                     <img
//                         className="w-20 h-20"
//                         src={TMCLogo}
//                         alt="Logo Here"
//                         loading="lazy"
//                     />
//                     <h1 className="text-xl">TUP Merch Co.</h1>
//                 </div>

//                 <ul className="hidden md:flex text-based font-semibold">
//                     <li className="p-4">
//                         <LinkRoute to="/" text="Home" />
//                     </li>
//                     <li className="p-4">
//                         <LinkRoute to="/about" text="About" />
//                     </li>
//                     <li className="p-4">
//                         <LinkRoute to="/" text="Contact" />
//                     </li>
//                     <li className="p-4">
//                         <LinkRoute to="/sellercenter" text="Seller Centre" />
//                     </li>
//                 </ul>

//                 <div className="flex p-2 items-center justify-between w-[120px]">
//                     <div className="cursor-pointer">
//                         <FaShoppingCart
//                             className="hover:scale-110 transition duration-200 ease-in-out"
//                             size={20}
//                         />
//                     </div>
//                     <div className="cursor-pointer" onClick={handleNav}>
//                         <FaSearch
//                             className="hover:scale-110 transition duration-200 ease-in-out"
//                             size={20}
//                         />
//                     </div>

//                     <div
//                         className={
//                             !nav
//                                 ? "fixed left-0 top-0 flex items-center justify-center w-full h-[89px] bg-[#EFEFEF] border-b border-b-[#211C6A] z-50 font-light ease-in-out duration-500"
//                                 : "fixed top-[-100%]"
//                         }
//                     >
//                         <div className="relative">
//                             <input
//                                 className="pl-4 pr-24 h-12 w-[800px] text-black border border-[#211C6A]"
//                                 type="text"
//                                 placeholder="Search"
//                                 value={searchValue}
//                                 onChange={handleInputChange}
//                             />
//                             {searchValue && (
//                                 <div
//                                     className="absolute p-3 top-[-10px] right-[30px] mt-3 mr-4"
//                                     onClick={handleClearInput}
//                                 >
//                                     <TiDeleteOutline
//                                         size={20}
//                                         style={{
//                                             color: "#211C6A",
//                                             cursor: "pointer",
//                                         }}
//                                     />
//                                 </div>
//                             )}
//                             <div className="absolute border-l border-l-[#211C6A] border-opacity-50 p-3 top-[-10px] right-[-15px] mt-3 mr-4">
//                                 <FaSearch
//                                     size={20}
//                                     style={{ color: "#211C6A" }}
//                                 />
//                             </div>
//                         </div>
//                         <div className="p-3 cursor-pointer" onClick={handleNav}>
//                             <TbLetterX
//                                 className="transition duration-200 ease-in-out hover:scale-110"
//                                 size={20}
//                                 style={{ color: "#211C6A" }}
//                             />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

export const ColoredNavBarUser = ({ bgColor1 = "bg-[#EFEFEF]",
                                    textColor1 = "text-[#211C6A]",}) => {
    const navigate = useNavigate();
    const [nav, setNav] = useState(true);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleNav = () => {
        if (isProfileMenuOpen) {
            setIsProfileMenuOpen(false);
        }
        setNav(!nav);
    };

    const handleProfileMenuToggle = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
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
                <p className="text-[#EFEFEF][#211C6A] text-sm font-light">
                    FREE SHIPPING ON YOUR FIRST PURCHASE. FEB. 25–28.
                </p>
            </div>
            <div className="flex overflow-hidden max-w-[1240px] px-4 h-16 text-[#EFEFEF] justify-between items-center mx-auto text-nowrap">
                <div className="flex items-center select-none font-bold">
                    <img
                        className="w-20 h-20"
                        src={ColoredTMCLogo}
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
                        <LinkRoute to="/sellercenter" text="Seller Centre" />
                    </li>
                </ul>

                <div className="flex p-2 items-center justify-between">
                    <div className="pr-4 cursor-pointer">
                        <FaShoppingCart
                            className="hover:scale-110 transition duration-200 ease-in-out"
                            size={20}
                        />
                    </div>
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

                    <div
                        className=" cursor-pointer"
                        onClick={handleProfileMenuToggle}
                    >
                        <CgProfile
                            className="hover:scale-110 transition duration-200 ease-in-out"
                            size={25}
                        />
                        {isProfileMenuOpen && (
                            <div className="absolute transition duration-200 ease-in-out text-[#211C6A] top-20 right-4 lg:right-[150px] bg-white border border-gray-200 rounded shadow-lg">
                                <ul>
                                    <li className="py-2 px-4 hover:bg-gray-300">
                                        {" "}
                                        <a href="/customeraccount">
                                            My Account
                                        </a>
                                    </li>
                                    <li className="py-2 px-4 hover:bg-gray-300">
                                        My Purchase
                                    </li>
                                    <li className="py-2 px-4 hover:bg-gray-300">
                                        Logout
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
