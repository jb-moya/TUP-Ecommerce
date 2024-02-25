import { Link } from "react-router-dom";

const ProductCard = ({ productID }) => {
    return (
        <div className="productCard">
            <h2>{productID}</h2>

            <Link to={`/product/${productID}`}>
                <img
                    src="https://via.placeholder.com/150"
                    alt="Placeholder for product"
                />
            </Link>
        </div>
    );
};

export default ProductCard;
