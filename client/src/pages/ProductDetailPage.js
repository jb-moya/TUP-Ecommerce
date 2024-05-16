import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar.js";
import ImageSwiper from "../components/Swiper.js";
import StarRating from "../components/StarRating.js";
import image from "../components/images/lake-louise-51543_1280.jpg";
import RatingOverview from "../components/RatingOverview.js";
import ProductVariation from "../components/ProductVariation.js";
import { useLocation, useNavigate } from "react-router-dom";
import Review from "../components/Review.js";
import OrderQuantity from "../components/OrderQuantity.js";
import { rootUrl } from "../App.js";
import Footer from "../components/Footer.js";
import axios from "axios";
import WriteReview from "../WriteReview.js";
import logoUnsaturated from "../Assets/LogoUnSaturated.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import defaultProfileImage from "../Assets/defaultPP.png";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cart/cartSlice.js";
import { IoCart } from "react-icons/io5";
import formatPrice from "../components/utils/formatPrice.js";
import { isUserLogged } from "../features/user/userSlice.js";
import { Tooltip } from "react-tooltip";

axios.defaults.withCredentials = true;

const ProductDetailPage = (props) => {
    const dispatch = useDispatch();
    const userLogged = useSelector(isUserLogged);
    const navigate = useNavigate();
    const { id } = useParams();

    const [puffAnimationPrice, setPuffAnimationPrice] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const [productSeller, setProductSeller] = useState({});
    const [productReviews, setProductReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVariation, setSelectedVariation] = useState();
    const [profilePicture, setProfilePicture] = useState("");
    const [userName, setUserName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isOpenWriteReview, setIsOpenWriteReview] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const root = `${rootUrl}/products/${id}`;

            try {
                const response = await axios.get(root);
                console.log("response", response);

                setProductDetails(response.data.product);
                setProductSeller(response.data.product.createdBy);

                if (response.data.product.variation.length > 0) {
                    setSelectedVariation(response.data.product.variation[0]);
                } else {
                    setSelectedVariation(null);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        setQuantity(1);
    }, [selectedVariation]);

    const handleAddToCart = async () => {
        try {
            await dispatch(
                addToCart({
                    productID: productDetails._id,
                    quantity: quantity,
                    variationID: selectedVariation
                        ? selectedVariation._id
                        : null,
                })
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const handleWriteReview = () => {
        setIsOpenWriteReview(!isOpenWriteReview);
    };

    const handleVariationPick = (variation) => {};

    const handleSelectedVariationChange = (variation) => {
        setSelectedVariation(variation);

        setPuffAnimationPrice(true);
        setTimeout(() => {
            setPuffAnimationPrice(false);
        }, 200); // 200 milliseconds, same duration as the CSS transition
    };

    return (
        <div className="mt-32">
            <NavBar />

            <div className="w-[1100px] flex-wrap flex mx-auto justify-center px-2 py-6 bg-white rounded-xl shadow-md">
                <div className="w-5/12 px-2">
                    {isLoading ? (
                        <div className="w-full h-full flex items-center justify-center">
                            Loading Images...
                        </div>
                    ) : productDetails.image.length > 0 ? (
                        <ImageSwiper images={productDetails.image} />
                    ) : (
                        <div>
                            <img
                                src={logoUnsaturated}
                                alt=""
                                className="w-full h-full rounded-xl object-cover"
                            />
                        </div>
                    )}
                </div>

                <div className="w-7/12">
                    <div className="w-full flex h-min">
                        <div className="w-7/12">
                            <div className="text-2xl px-8 font-bold text-[#211c6a]">
                                {productDetails.name}
                            </div>
                            <div className="flex align-baseline">
                                <div className="pl-8 pr-2 flex leading-tight font-light border-r-[1px] border-[#000000] border-opacity-40">
                                    <span className="text-lg leading-none font-light pr-1">
                                        {productDetails.numOfReviews}
                                    </span>{" "}
                                    <span className="font-extralight">
                                        Rating
                                    </span>
                                </div>
                                <div className="pl-2 pr-2 flex leading-tight font-light border-r-[1px] border-[#000000] border-opacity-40">
                                    <span className="text-lg leading-none font-light pr-1">
                                        {productDetails.soldCount}
                                    </span>{" "}
                                    <span className="font-extralight">
                                        Sold
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="w-5/12 text-right">
                            <div
                                className={
                                    puffAnimationPrice
                                        ? `text-2xl px-8 font-semibold scale-110 transition-all duration-100 ease-out text-red-700`
                                        : `text-2xl px-8 font-semibold text-red-700`
                                }
                            >
                                {productDetails.price &&
                                productDetails.price !== -1
                                    ? "₱ " + formatPrice(productDetails.price)
                                    : productDetails.variation &&
                                      productDetails.variation.length !== 0
                                    ? "₱ " +
                                      formatPrice(selectedVariation.price)
                                    : "Unavailable"}
                            </div>
                            <div className="flex align-baseline justify-end">
                                <div className="leading-none underline pr-1 underline-offset-4 text-[#211c6a]">
                                    {productDetails.averageRating
                                        ? productDetails.averageRating.toFixed(
                                              1
                                          )
                                        : "..."}
                                </div>
                                <div className="pr-8">
                                    <StarRating
                                        defaultRating={
                                            productDetails.averageRating
                                                ? Math.round(
                                                      productDetails.averageRating
                                                  )
                                                : 0
                                        }
                                        disableAction={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex"></div>
                    <hr className="border-r-[1px] mt-2 mx-4 border-[#000000] border-opacity-20"></hr>

                    <div className="mt-4 mx-6 border">
                        {isLoading ? (
                            <div>loading variation...</div>
                        ) : (
                            productDetails.variation.length > 0 && (
                                <ProductVariation
                                    id={"component2"}
                                    options={productDetails.variation}
                                    handleVariationPick={handleVariationPick}
                                    variationClass={
                                        productDetails.variationClass
                                    }
                                    setSelectedVariation={
                                        handleSelectedVariationChange
                                    }
                                />
                            )
                        )}
                    </div>

                    <div className="mt-1 flex items-center border mx-6">
                        <div className="w-3/12 pl-2 text-sm break-normal font-medium text-[#211c6a]">
                            Quantity:{" "}
                        </div>
                        <div className="pr-2">
                            {isLoading ? (
                                <div>loading...</div>
                            ) : (
                                <OrderQuantity
                                    maximum={
                                        selectedVariation
                                            ? selectedVariation.stock
                                            : productDetails.stock
                                    }
                                    quantity={quantity}
                                    onQuantityChange={handleQuantityChange}
                                />
                            )}
                        </div>
                        <div>
                            {isLoading ? (
                                <div>loading...</div>
                            ) : (
                                <div>
                                    {selectedVariation
                                        ? selectedVariation.stock
                                        : productDetails.stock}{" "}
                                    stock available
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full mt-4 flex items-center">
                        <Tooltip
                            id="my-tooltip"
                            style={{
                                backgroundColor: "#211c6a",
                                color: "#fff",
                                borderRadius: "8px",
                            }}
                        />
                        <div className="w-4/12 flex flex-col align-middle items-center">
                            <button
                                className="w-9/12 p-2 border rounded-lg bg-[#a6bec2] text-white hover:border-violet-500"
                                onClick={handleAddToCart}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={
                                    userLogged ? "" : "Please log in to buy!"
                                }
                                data-tooltip-place="top"
                                disabled={!userLogged}
                                style={{
                                    cursor: userLogged
                                        ? "pointer"
                                        : "not-allowed",
                                }}
                            >
                                <div className="flex items-center">
                                    <IoCart size={28} />{" "}
                                    <div className="pl-2">Add to Cart</div>
                                </div>
                            </button>
                            <button
                                className="mt-2 w-9/12 p-2 border rounded-lg bg-[#59b5c3] text-white hover:border-violet-500"
                                onClick={() => {
                                    handleAddToCart();
                                    navigate("/cart");
                                }}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={
                                    userLogged ? "" : "Please log in to buy!"
                                }
                                data-tooltip-place="top"
                                disabled={!userLogged}
                                style={{
                                    cursor: userLogged
                                        ? "pointer"
                                        : "not-allowed",
                                }}
                            >
                                Buy Now
                            </button>
                        </div>
                        <div className="w-8/12 ml-2 mr-6 p-2 border bg-[#ffffff] border-black border-opacity-25 rounded-xl shadow-md relative">
                            <div className="flex items-center justify-center">
                                <div className="w-20 h-20">
                                    <img
                                        className="w-full h-full rounded-full object-cover overflow-hidden drop-shadow-md"
                                        src={
                                            productSeller.image
                                                ? productSeller.image
                                                : defaultProfileImage
                                        }
                                        alt=""
                                    />
                                </div>
                                <div className="p-4 flex">
                                    <div className="pr-4 font-medium text-lg text-[#211c6a]">
                                        {productSeller.orgName
                                            ? productSeller.orgName
                                            : "..."}
                                    </div>
                                    <Link
                                        to={`/org/${productSeller._id}`}
                                        className="rounded-lg px-[4px] py-[4px] border text-[#59b4c3] border-[#59b4c3] leading-none self-center"
                                    >
                                        View Seller
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className="border-r-[1px] mt-4 mx-4 border-[#000000] border-opacity-20"></hr>
                    <div className="w-full">
                        <div className="px-8 mt-2 font-semibold text-lg leading-relaxed text-[#211c6a]">
                            Product Details
                        </div>
                        <div
                            className="px-8 font-light"
                            dangerouslySetInnerHTML={{
                                __html: productDetails.description,
                            }}
                        >
                            {/* {productDetails.description} */}
                        </div>
                    </div>
                </div>

                <hr className="w-full rounded-lg border-t-1 border-black border-opacity-25 mt-4"></hr>

                <div className="w-full flex flex-col items-center my-4">
                    <div className="font-semibold text-lg mb-4 leading-relaxed text-[#211c6a]">
                        Product Ratings
                    </div>
                    <RatingOverview
                        productID={id}
                        averageRating={
                            productDetails.averageRating
                                ? productDetails.averageRating.toFixed()
                                : 0
                        }
                        handleWriteReview={handleWriteReview}
                    />
                </div>

                <hr className="w-full rounded-lg border-t-1 border-black border-opacity-25 mb-4"></hr>

                <div className="flex flex-col">
                    {isOpenWriteReview && (
                        <WriteReview
                            productID={id}
                            closeWriteReviewComponent={() =>
                                setIsOpenWriteReview(false)
                            }
                        />
                    )}

                    <div>
                        <Review productID={id} />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

// https://www.youtube.com/watch?v=8pKjULHzs0s

export default ProductDetailPage;
