import { Link } from "react-router-dom";
import logoUnsaturated from "../Assets/LogoUnSaturated.png";
import formatPrice from "./utils/formatPrice";
import StarRating from "./StarRating";
import { FaStar } from "react-icons/fa";
const ProductCard = ({ product }) => {
    return (
        <Link
            to={`/product/${product._id}`}
            className="relative flex flex-col h-[250px] rounded-xl border border-[#211C6A] border-opacity-20 cursor-pointer hover:scale-[1.04] hover:shadow-md transition-all duration-100 ease-in-out"
        >
            <img
                className="h-[160px] max-h-[150px] w-full border object-cover rounded-t-xl"
                src={product.image[0] || logoUnsaturated}
                // src={logoUnsaturated}
                alt="Logo Here"
                loading="lazy"
            />
            <div className="flex flex-col h-[90px] m-2 text-sm overflow-hidden">
                <p className="line-clamp-2 leading-[17px]">{product.name || "No Name"}</p>
                <div className="mt-auto">
                    <div className="flex justify-between">
                        <p className="text-[#7d74f2] pl-[2px]">
                            {product.price !== -1
                                ? "₱ " + formatPrice(product.price)
                                : product.variation.length !== 0
                                ? "₱ " + formatPrice(product.variation[0].price)
                                : "Unavailable"}
                        </p>
                        {product.soldCount ? (
                            <div className="font-light text-xs self-center">
                                {product.soldCount} sold
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
            <div className="">
                {product.createdBy.orgName && (
                    <div className="line-clamp-1 absolute text-[#211C6A] left-0 shadow text-[9px] px-2 text-xs top-[138px] bg-white rounded-r-md shadow-[#211c6a2c] font-semibold w-fit align-middle">
                        <img
                            src={product.createdBy.image || logoUnsaturated}
                            alt="Logo Here"
                            className="w-4 h-4 rounded-full inline-block mr-1 border border-1 border-gray-400"
                        />
                        {product.createdBy.orgName}
                    </div>
                )}
                <div className="absolute text-[11px] top-[132px] right-0 w-fit rounded-tl-md pl-[4px] bg-white">
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
