import { Link } from "react-router-dom";
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function imgUrl() {
    const id = rand(1, 200);
    return `https://picsum.photos/id/${id}/1920/1080`;
}

const ProductCard = ({product}) => {
    return (
        <Link
            to={`/product/662f45a2754796a0ccf03c71`}
            className="flex flex-col h-[250px] border border-[#211C6A] cursor-pointer hover:scale-[1.02] hover:shadow-sm transition-all duration-100 ease-in-out"
        >
            <img
                className="h-[160px] w-full"
                src={imgUrl()}
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