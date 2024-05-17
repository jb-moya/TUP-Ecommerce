import React, { useState, useEffect, useCallback } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import defaultProfileImage from "../Assets/defaultPP.png";
// import { Link } from "react-router-dom";
// import ConfirmationModal from "../components/Confirmation.js";
import { NavBar } from "../components/NavBar.js";
import Footer from "../components/Footer.js";

import { IoBag } from "react-icons/io5";
import { FaBan, FaHouseUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { ManageUser, UserOverview } from "../components/ManageUser.js";
import { MdCategory } from "react-icons/md";
import { ManageProducts } from "../components/ManageProducts.js";
import { ManageCategories } from "../components/ManageCategories.js";
import { ProductViolationForm } from "../components/ProductViolationForm.js";


// axios.defaults.withCredentials = true;

// const NoImage = () => {
//     return (
//         <div className="w-full h-full text-xs bg-slate-200 flex text-[#abb7c5] justify-center items-center rounded">
//             n/a
//         </div>
//     );
// };

// const ProductRow = ({ product, index, deleteProduct }) => {
//     const renderImage = () => {
//         if (product.image.length) {
//             return (
//                 <img
//                     src={product.image[0] || defaultProfileImage}
//                     className="w-12 h-12 rounded"
//                     alt=""
//                 />
//             );
//         }
//         return <NoImage />;
//     };

//     const renderPrice = () => {
//         if (product.price !== -1) {
//             return product.price;
//         }

//         if (product.variation.length > 0) {
//             return (
//                 <>
//                     {product.variation.map((v, index) => (
//                         <div
//                             key={`${v.name}${index}`}
//                             className="border border-1 border-gray-300 rounded-xl p-[2px] font-light m-[1px]"
//                         >{`${v.name} (${v.price})`}</div>
//                     ))}
//                 </>
//             );
//         }
//         return product.price;
//     };

//     const renderStock = () => {
//         console.log(
//             "product HANEP NA YAN stockkkk",
//             product.name,
//             product.stock
//         );
//         if (product.variation.length > 0) {
//             const totalStock = product.variation.reduce(
//                 (total, v) => total + v.stock,
//                 0
//             );

//             return (
//                 <>
//                     {product.variation.map((v) => (
//                         <div
//                             className="border border-1 border-gray-300 rounded-xl p-[2px] font-light m-[1px]"
//                             key={v.name}
//                         >{`${v.name} (${v.stock})`}</div>
//                     ))}
//                     <div className="font-light">total: {totalStock}</div>
//                 </>
//             );
//         } else if (product.stock && product.stock !== -1) {
//             return product.stock;
//         } else if (product.stock === 0) {
//             return <div className="text-red-400">SOLD OUT</div>;
//         } else {
//             return "error";
//         }
//     };

//     const renderVariationNames = () => {
//         if (product.variation.length > 0) {
//             return (
//                 <>
//                     {product.variation.map((v) => (
//                         <div
//                             key={v.name}
//                             className="border border-1 border-gray-300 rounded-xl p-[2px] font-light m-[1px]"
//                         >
//                             {v.name}
//                         </div>
//                     ))}
//                 </>
//             );
//         }
//         return "n/a";
//     };

//     const [isModalOpen, setIsModalOpen] = useState(false);

//     const handleOpenModal = () => {
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleConfirmDelete = () => {
//         console.log("Product Deleted");
//         deleteProduct();
//         setIsModalOpen(false);
//     };

//     return (
//         <tr
//             className={
//                 index % 2 === 0
//                     ? "border-t text-xs"
//                     : "border-t text-xs bg-slate-200"
//             }
//         >
//             {/* <td className="p-2">
//                 <input type="checkbox" />
//             </td> */}
//             <td className="w-12 h-12 flex items-center">{renderImage()}</td>
//             <td>
//                 <div className="px-1">{product.name}</div>
//             </td>
//             <td className={product.price === -1 ? "p-1 flex-col" : "p-1"}>
//                 {renderPrice()}
//             </td>
//             <td className="p-1">{product.soldCount}</td>
//             <td
//                 className={
//                     product.variation.length > 0 ? "p-1 flex-col" : "p-1"
//                 }
//             >
//                 {renderStock()}
//             </td>
//             <td
//                 className={
//                     product.variationClass
//                         ? "p-1"
//                         : "p-1 font-light text-gray-400"
//                 }
//             >
//                 {product.variationClass || "n/a"}
//             </td>
//             <td
//                 className={`p-1 text-left ${
//                     product.variation.length === 0
//                         ? "text-gray-400 font-light"
//                         : ""
//                 }`}
//             >
//                 {renderVariationNames()}
//             </td>
//             <td className="p-1">{product.category}</td>

//             <td className="">
//                 <button
//                     type="button"
//                     className="hover:scale-[1.15] hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] w-full cursor-pointer"
//                 >
//                     <Link
//                         to={`/admin/addProductViolation/${product._id}`}
//                         className="button-link"
//                     >
//                         Add Violation
//                     </Link>
//                 </button>
//                 <>
//                     <button
//                         type="button"
//                         className="hover:scale-[1.15] hover:[text-shadow:_0_1px_0_rgb(0_0_0_/_40%)] hover:text-red-500 text-red-300 cursor-pointer w-full"
//                         onClick={handleOpenModal}
//                     >
//                         Delete
//                     </button>
//                     {isModalOpen && (
//                         <ConfirmationModal
//                             className="transition-none ease-out duration-300"
//                             isOpen={isModalOpen}
//                             onClose={handleCloseModal}
//                             onConfirm={handleConfirmDelete}
//                         />
//                     )}
//                 </>
//             </td>
//         </tr>
//     );
// };

const AdminMainPage = () => {
    // const [orgs, setOrgs] = useState([]);
    // const [customers, setCustomers] = useState([]);
    // const [admins, setAdmins] = useState([]);

    // const [orgCount, setOrgCount] = useState(0);
    // const [customerCount, setCustomerCount] = useState(0);
    // const [adminCount, setAdminCount] = useState(0);

    // const [products, setProducts] = useState([]);
    // const [pendingProductCount, setPendingProductCount] = useState(0);

    // const [currentPage, setCurrentPage] = useState(1);
    // const [maxPageCount, setMaxPageCount] = useState(1);
    

    // const fetchPendingProduct = useCallback(async () => {
    //     try {
    //         const { data } = await axios.get(
    //             "http://localhost:5000/api/v1/products",
    //             {
    //                 params: {
    //                     page: currentPage,
    //                     productStatus: "pending",
    //                 },
    //             }
    //         );

    //         console.log(`violated product`, data);
    //         setProducts(data.products);
    //         setPendingProductCount(data.products.length);
    //         setMaxPageCount(Math.ceil(data.count / 10));
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         toast.success("Products loaded successfully");
    //     }
    // }, [currentPage]);

    // const fetchUser = useCallback(
    //     async (role, setUsers, setCount, additionalParams = {}) => {
    //         try {
    //             const { data } = await axios.get(
    //                 "http://localhost:5000/api/v1/user",
    //                 {
    //                     params: {
    //                         page: currentPage,
    //                         role: role,
    //                         ...additionalParams,
    //                     },
    //                 }
    //             );

    //             console.log(`HAHAf ${role}`, data);
    //             setUsers(data.users);
    //             setCount(data.users.length);
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             toast.success("Products loaded successfully");
    //         }
    //     },
    //     [currentPage]
    // );

    // const handleDeleteProduct = (productID) => {
    //     try {
    //         axios.delete(`http://localhost:5000/api/v1/products/${productID}`);
    //         setProducts(
    //             products.filter((product) => product._id !== productID)
    //         );
    //         toast.success("Product deleted successfully");
    //     } catch (error) {
    //         toast.error("Error deleting product");
    //     }
    // };

    // useEffect(() => {
    //     fetchUser("organization", setOrgs, setOrgCount);
    //     fetchUser("customer", setCustomers, setCustomerCount);
    //     fetchUser("admin", setAdmins, setAdminCount);
    //     fetchPendingProduct();
    // }, [fetchUser, fetchPendingProduct]);

    const AdminMenuButton = ({ icon, text, selected, onClick }) => (
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
        icon: <IoSettingsOutline size={iconSize} />,
        text: "Account Settings",
        path: "",
    },
    {
        icon: <FaHouseUser size={iconSize} />,
        text: "Manage Users",
        path: "",
    },
    {
        icon: <IoBag size={iconSize} />,
        text: "Manage Products",
        path: "",
    },
    {
        icon: < MdCategory  size={iconSize} />,
        text: "Manage Categories",
        path: "",
    },
    {
        icon: <FaBan size={iconSize} />,
        text: "Product Violations",
        path: "",
    },
];

    
    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);  
    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

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
                                    src={imgUrl()}
                                    alt="Logo Here"
                                />

                                <div className="flex justify-center text-nowrap items-center text-sm font-semibold py-2 px-4">
                                    {/* {user && user.orgName} */} Juan Dela Cruz
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
                            />
                        ))}
                    </div>

                    <div className="font-semibold p-4 max-w-[900px] w-full">
                        {selectedButton === 0 && <div>Content for Admin Account Settings</div>}
                        {selectedButton === 1 && <ManageUser />}
                        {selectedButton === 2 && <ManageProducts />}
                        {selectedButton === 3 && <ManageCategories />}
                        {selectedButton === 4 && <ProductViolationForm />}
                        
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default AdminMainPage;
