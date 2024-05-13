import { Link } from "react-router-dom";
import logoUnsaturated from "../Assets/LogoUnSaturated.png";

const ProductCard = ({product}) => {
    return (
        <Link
            to={`/product/${product._id}`}
            className="flex flex-col h-[250px] rounded-xl border border-[#211C6A] border-opacity-20 cursor-pointer hover:scale-[1.04] hover:shadow-md transition-all duration-100 ease-in-out"
        >
            <img
                className="h-[160px] w-full border object-cover rounded-t-xl"
                src={product.image[0] || logoUnsaturated}
                // src={logoUnsaturated}
                alt="Logo Here"
                loading="lazy"
            />
            <div className="flex flex-col h-[90px] m-2 text-sm overflow-hidden justify-between">
                <p className="line-clamp-2">{product.name || "No Name"}</p>
                <div className="flex justify-between">
                    <p className="text-[#7d74f2]">
                        {product.price !== -1
                            ? "₱ " + product.price
                            : product.variation.length !== 0
                            ? "₱ " + product.variation[0].price
                            : "Unavailable"}
                    </p>
                    <p>
                        {product.soldCount ? product.soldCount + " Sold" : ""}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;