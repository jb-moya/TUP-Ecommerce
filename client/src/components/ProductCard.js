import { Link } from "react-router-dom";
import logoUnsaturated from "../Assets/LogoUnSaturated.png";
import formatPrice from "./utils/formatPrice";
import StarRating from "./StarRating";
import { FaStar } from "react-icons/fa";
import toNumberShortcut from "./utils/toNumberShortcut";

const ProductCard = ({ product }) => {
    return (
        <Link
            to={`/product/${product._id}`}
            className="group relative flex flex-col h-[250px] rounded-xl border border-[#211C6A] border-opacity-20 cursor-pointer hover:scale-[1.04] hover:shadow-md transition-all duration-100 ease-in-out"
        >
            <div className="overflow-hidden rounded-t-xl">
                <img
                    className="h-[150px] max-h-[160px] w-full border object-cover group-hover:scale-[1.10] rounded-t-xl transition-transform duration-[600ms] cubic-bezier(0.000, 0.990, 0.000, 1.005)"
                    src={product.image[0] || logoUnsaturated}
                    // src={logoUnsaturated}
                    alt="Logo Here"
                    loading="lazy"
                />
            </div>
            <div className="flex flex-col h-[90px] p-2 text-sm overflow-hidden shadow-[0px_-24px_3px_-2px_rgba(0,0,0,0.08)] z-10">
                <p className="line-clamp-2 leading-[17px]">
                    {product.name || "No Name"}
                </p>
                <div className="mt-auto">
                    <div className="flex justify-between">
                        <p className="text-[#7d74f2] pl-[2px] group-hover:text-red-500 transition-all duration-500 ease-in-out">
                            {product.price !== -1
                                ? "₱ " + formatPrice(product.price)
                                : product.variation.length !== 0
                                ? "₱ " + formatPrice(product.variation[0].price)
                                : "Unavailable"}
                        </p>
                        {product.soldCount ? (
                            <div className="font-light text-xs self-center">
                                {toNumberShortcut(product.soldCount)} sold
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div className="z-[11]">
                {product.createdBy.orgName && (
                    <div className="line-clamp-1 absolute text-[#211C6A] left-0 shadow text-[9px] transition-all duration-500 ease-in-out group-hover:text-[10px] px-2 text-xs top-[134px] bg-white rounded-r-md shadow-[#211c6a2c] font-semibold w-fit align-middle">
                        <img
                            src={product.createdBy.image || logoUnsaturated}
                            alt="Logo Here"
                            className="w-4 h-4 rounded-full inline-block mr-1 border-gray-400"
                        />
                        {product.createdBy.orgName}
                    </div>
                )}
                <div className="absolute text-[11px] top-[134px] right-0 w-fit rounded-tl-md pl-[4px] bg-white">
                    {product.averageRating > 0 && (
                        <div className="flex text-center justify-center align-middle items-center">
                            {product.averageRating} <FaStar color="#FFC107" />
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
