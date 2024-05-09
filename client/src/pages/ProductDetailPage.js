import React, { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar.js";
import ImageSwiper from "../components/Swiper.js";
import StarRating from "../components/StarRating.js";
import image from "../components/images/lake-louise-51543_1280.jpg";
import RatingOverview from "../components/RatingOverview.js";
import ProductVariation from "../components/ProductVariation.js";
import { useLocation } from "react-router-dom";
import Review from "../components/Review.js";
import OrderQuantity from "../components/OrderQuantity.js";
import { rootUrl } from "../App.js";
import Footer from "../components/Footer.js";
import axios from "axios";
import WriteReview from "../WriteReview.js";
import logoUnsaturated from "../Assets/LogoUnSaturated.png";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice.js";
axios.defaults.withCredentials = true;

const ProductDetailPage = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [productDetails, setProductDetails] = useState({});
    const [productReviews, setProductReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state
    const [selectedVariation, setSelectedVariation] = useState(); // Track selected variation
    const [profilePicture, setProfilePicture] = useState("");
    const [userName, setUserName] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [isOpenWriteReview, setIsOpenWriteReview] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const root = `${rootUrl}/products/${id}`;

            try {
                const response = await axios.get(root);

                setProductDetails(response.data.product);

                if (response.data.product.variation.length > 0) {
                    setSelectedVariation(response.data.product.variation[0]);
                } else {
                    setSelectedVariation(null);
                }

                // console.log("response", response);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        // // console.log("cookie", document.cookie);

        fetchData();
    }, [id]);

    useEffect(() => {
        // // console.log("Selected variation", selectedVariation);

        // reset quantity to 1 if selected variation changes
        setQuantity(1);
    }, [selectedVariation]);

    const handleAddToCart = async () => {
        // console.log("Add to cart");

        // console.log(
        //     "productID", productDetails._id,
        //     "quantity", quantity,
        //     "variationID", selectedVariation ? selectedVariation._id : null
        // )

        try {
            await dispatch(addToCart({ productID: productDetails._id, quantity: quantity, variationID: selectedVariation ? selectedVariation._id : null}) );
        } catch (error) {
            console.error(error);
        }

        // try {
        //     const response = await axios.post(`${rootUrl}/cart/addToCart`, {
        //         productID: productDetails._id,
        //         quantity: quantity,
        //         variationID: selectedVariation._id,
        //     });

        //     // console.log("response", response);
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    const handleWriteReview = () => {
        // console.log("Write a review");
        setIsOpenWriteReview(!isOpenWriteReview);
    };

    const handleVariationPick = (variation) => {
        // console.log("Variation picked", variation);
    };

    return (
        <div className="mt-32">
            <NavBar />

            <div className="w-[1100px] flex-wrap flex mx-auto justify-center px-2 py-6 bg-white rounded-md shadow-md">
                <div className="w-5/12 pl-8">
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
                        </div>
                        <div className="w-5/12 text-right">
                            <div className="text-2xl px-8 font-semibold text-red-700">
                                {productDetails.price !== -1
                                    ? "₱ " + productDetails.price
                                    : productDetails.variation.length !== 0
                                    ? "₱ " + productDetails.variation[0].price
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

                    <div className="w-full flex mt-2">
                        <div className="pl-8 pr-2 flex leading-tight font-light border-r-[1px] border-[#000000] border-opacity-40">
                            <span className="text-lg leading-none font-light pr-1">
                                {productDetails.numOfReviews}
                            </span>{" "}
                            <span className="font-extralight">Rating</span>
                        </div>
                        <div className="pl-2 pr-2 flex leading-tight font-light border-r-[1px] border-[#000000] border-opacity-40">
                            <span className="text-lg leading-none font-light pr-1">
                                {productDetails.soldCount}
                            </span>{" "}
                            <span className="font-extralight">Sold</span>
                        </div>
                    </div>

                    <div className="w-full mt-10">
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
                                    setSelectedVariation={setSelectedVariation}
                                />
                            )
                        )}
                    </div>
                    <div className="mt-8 flex items-center">
                        <div className="w-3/12 pl-8 text-sm break-normal font-medium text-[#211c6a]">
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
                    <div className="flex px-8 py-7 justify-center items-center">
                        <button
                            className="p-2 border rounded mr-4 bg-[#a6bec2] text-white hover:border-violet-500"
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </button>
                        <button className="p-2 border rounded bg-[#59b5c3] text-white hover:border-violet-500">
                            Buy Now
                        </button>
                    </div>

                    <hr className="w-1/2 m-auto rounded border-t-1 border-black border-opacity-25 mb-4"></hr>
                </div>

                <div className="w-full">
                    <div className="px-8 mt-4 font-semibold text-lg leading-relaxed text-[#211c6a]">
                        Product Details
                    </div>
                    <div className="px-8">{productDetails.description}</div>
                </div>

                <div className="w-full m-8 p-4 border border-black border-opacity-25 rounded shadow-md">
                    <div className="flex items-center">
                        <div className="w-20 h-20">
                            <img
                                className="w-full h-full rounded-full object-cover overflow-hidden"
                                src={image}
                                alt=""
                            />
                        </div>
                        <div className="p-4 ">
                            <div>Shop ni Aleng Mare</div>
                            <button className="rounded px-[4px] py-[2px] border text-[#59b4c3] border-[#59b4c3] leading-none">
                                View Seller
                            </button>
                        </div>
                    </div>
                </div>

                <hr className="w-full rounded border-t-1 border-black border-opacity-25 mt-4"></hr>

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

                <hr className="w-full rounded border-t-1 border-black border-opacity-25 mb-4"></hr>

                <div className="flex flex-col">
                    {isOpenWriteReview && <WriteReview productID={id} />}

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
