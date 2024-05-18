import React, { useState } from "react";
import ProductFilter from "./ProductFilter";
import { useNavigate } from "react-router-dom";

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

const PendingProducts = ({ product }) => {
    const navigate = useNavigate();

    const handleReviewButtonClick = () => {
        navigate(`/admin/product-review-form/${product._id}`);
    };

    return (
        <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
            <thead>
                <tr className="text-left bg-gray-300">
                    <th className="p-2">img</th>
                    <th className="p-2">
                        <select className="w-full border-gray-400 outline-none bg-transparent">
                            <option value="">Product Name</option>
                            <option value="A to Z">A to Z</option>
                            <option value="Z to A">Z to A</option>
                        </select>
                    </th>
                    <th className="p-2">
                        <select className="w-full border-gray-400 outline-none bg-transparent">
                            <option value="">Category</option>
                            <option value="Category1">Category1</option>
                            <option value="Category2">Category2</option>
                        </select>
                    </th>
                    <th className="p-2">
                        <select className="w-full border-gray-400 outline-none bg-transparent">
                            <option value="">Organization Name</option>
                            <option value="A to Z">A to Z</option>
                            <option value="Z to A">Z to A</option>
                        </select>
                    </th>
                    <th className="p-2">
                        <select className="w-full border-gray-400 outline-none bg-transparent">
                            <option value="">Product Creation Date</option>
                            <option value="1 year">1 year</option>
                            <option value="2 years">2 years</option>
                        </select>
                    </th>
                    <th className="p-2 text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="p-2">
                        <img
                            src="path_to_image.jpg"
                            alt="User"
                            className="w-8 h-8 rounded-full"
                        />
                    </td>
                    <td className="p-2">Tshirt ni Gaspar</td>
                    <td className="p-2">Category1</td>
                    <td className="p-2">TUP Graybots</td>
                    <td className="p-2">2024-05-17</td>
                    <td className="p-2 text-center">
                        <button
                            type="button"
                            className="text-blue-500 hover:text-blue-700 mx-2"
                            onClick={handleReviewButtonClick}
                        >
                            Review
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export const ManageProducts = () => {
    const [selectedButton, setSelectedButton] = useState(0);

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
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
                    className={`p-4 cursor-pointer hover:border-b-2  mr-4  hover:border-b-[#211C6A] transition ease-in-out duration-200 ${
                        selectedButton === 1
                            ? "border-b-[#211C6A] border-b-2 text-[#211C6A]"
                            : ""
                    }`}
                >
                    Pending Products
                </li>
            </ul>
            {selectedButton === 0 && <ProductFilter />}
            {selectedButton === 1 && <PendingProducts />}
        </div>
    );
};
