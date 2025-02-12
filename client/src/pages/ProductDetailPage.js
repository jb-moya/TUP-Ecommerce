import React, { useEffect, useState, useCallback } from "react";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import ProductCard from "../components/ProductCard.js";
import LoadingSymbol from "../components/loadingScreen.js";
import InfoTooltip from "../components/utils/infoTooltip.js";
import toNumberShortcut from "../components/utils/toNumberShortcut.js";

axios.defaults.withCredentials = true;

const ProductDetailPage = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const userLogged = useSelector(isUserLogged);
    const navigate = useNavigate();
    const { id } = useParams();

    console.log("user", user);

    const [puffAnimationPrice, setPuffAnimationPrice] = useState(false);
    const [productDetails, setProductDetails] = useState({});
    const [productSeller, setProductSeller] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [selectedVariation, setSelectedVariation] = useState();
    const [quantity, setQuantity] = useState(1);
    const [isOpenWriteReview, setIsOpenWriteReview] = useState(false);
    const [sameSellerProducts, setSameSellerProducts] = useState([]);
    const [sameCategoryProducts, setCategoryProducts] = useState([]);

    const fetchProducts = useCallback(async (additionalParams = {}, setter) => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        ...additionalParams,
                        limit: 20,
                        populatedFields: "createdBy",
                        productStatus: "enabled",
                    },
                }
            );
            console.log("data", data);
            setter(data.products);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, []);

    const fetchData = useCallback(async () => {
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
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [id, fetchData]);

    useEffect(() => {
        if (productSeller?._id) {
            fetchProducts(
                {
                    createdBy: productSeller._id,
                },
                setSameSellerProducts
            );
        }
    }, [productSeller, fetchProducts]);

    useEffect(() => {
        if (productDetails?.category) {
            fetchProducts(
                {
                    categories: productDetails.category,
                },
                setCategoryProducts
            );
        }
    }, [productDetails, fetchProducts]);

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
        }, 200);
    };

    return (
        <div className="mt-32 ">
            <NavBar />

            <div className="w-[1100px] h-full flex-wrap flex mx-auto justify-center px-2 py-6 bg-white rounded-xl shadow-md">
                <div className="w-5/12 px-2 h-full">
                    {isLoading ? (
                        <LoadingSymbol showWhen={isLoading} />
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
                            <div className="text-2xl px-[30px] font-bold text-[#211c6a]">
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
                                        {productDetails.soldCount &&
                                        productDetails.soldCount !== 0
                                            ? toNumberShortcut(
                                                  productDetails.soldCount
                                              )
                                            : "0"}
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
                                        ? formatPrice(selectedVariation.stock)
                                        : formatPrice(
                                              productDetails.stock
                                          )}{" "}
                                    <span className="font-light">
                                        stock available
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="w-full mt-4 flex items-center">
                        <InfoTooltip id="my-tooltip" />
                        <div className="w-4/12 flex flex-col align-middle items-center">
                            <button
                                className="w-9/12 p-2 border rounded-lg bg-[#a6bec2] text-white hover:border-violet-500"
                                onClick={handleAddToCart}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={
                                    userLogged
                                        ? user.role === "customer"
                                            ? ""
                                            : "customer can only perform this"
                                        : "Please log in to buy!"
                                }
                                disabled={
                                    !userLogged || user.role !== "customer"
                                }
                                style={{
                                    cursor: userLogged
                                        ? user.role === "customer"
                                            ? "pointer"
                                            : "not-allowed"
                                        : "not-allowed",
                                }}
                                data-tooltip-place="top"
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
                                    userLogged
                                        ? user.role === "customer"
                                            ? ""
                                            : "customer can only perform this"
                                        : "Please log in to buy!"
                                }
                                disabled={
                                    !userLogged || user.role !== "customer"
                                }
                                style={{
                                    cursor: userLogged
                                        ? user.role === "customer"
                                            ? "pointer"
                                            : "not-allowed"
                                        : "not-allowed",
                                }}
                                data-tooltip-place="top"
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

                {sameSellerProducts.length > 0 && (
                    <>
                        <div className="w-full mt-4">
                            <div className="font-semibold text-center text-lg leading-relaxed text-[#211c6a]">
                                From the same Seller
                            </div>
                            <Swiper
                                modules={[FreeMode, Pagination]}
                                spaceBetween={20}
                                slidesPerView={5}
                                freeMode={true}
                                navigation
                                pagination={{ clickable: true }}
                            >
                                {sameSellerProducts
                                    .filter((product) => product._id !== id)
                                    .map((product) => (
                                        <SwiperSlide
                                            key={product._id}
                                            className="h-[300px] mt-4 mb-10"
                                        >
                                            <ProductCard product={product} />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                        <div className="my-6">
                            <Link
                                to={`/org/${productSeller._id}`}
                                className="border-1 border rounded-lg hover:scale-105 shadow-sm px-4 py-2 bg-[#59b4c3] text-white hover:bg-[#211c6a] transition-all duration-200 ease-in-out"
                            >
                                View more products from {productSeller.orgName}
                            </Link>
                        </div>
                    </>
                )}

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

                <hr className="w-full rounded-lg border-t-1 border-black border-opacity-25 mt-4"></hr>

                {sameCategoryProducts.length > 0 && (
                    <>
                        <div className="w-full mt-4">
                            <div className="font-semibold text-center text-lg leading-relaxed text-[#211c6a]">
                                With the same Category:{" "}
                                {productDetails.category}
                            </div>
                            <Swiper
                                modules={[FreeMode, Pagination]}
                                spaceBetween={20}
                                slidesPerView={5}
                                freeMode={true}
                                navigation
                                pagination={{ clickable: true }}
                            >
                                {sameCategoryProducts
                                    .filter((product) => product._id !== id)
                                    .map((product) => (
                                        <SwiperSlide
                                            key={product._id}
                                            className="h-[300px] mt-4 mb-10"
                                        >
                                            <ProductCard product={product} />
                                        </SwiperSlide>
                                    ))}
                            </Swiper>
                        </div>
                        <div className="my-4">
                            <Link
                                to={`/search?categories=${productDetails.category}`}
                                className="border-1 border rounded-lg hover:scale-105 shadow-sm px-4 py-2 bg-[#59b4c3] text-white hover:bg-[#211c6a] transition-all duration-200 ease-in-out"
                            >
                                View more products from{" "}
                                {productDetails.category}
                            </Link>
                        </div>
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
};

// https://www.youtube.com/watch?v=8pKjULHzs0s

export default ProductDetailPage;
