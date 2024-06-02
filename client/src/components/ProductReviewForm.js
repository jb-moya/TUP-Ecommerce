import React, { useCallback, useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { rootUrl } from "../App.js";
import axios from "axios";
import formatPrice from "../components/utils/formatPrice.js";
import LoadingSymbol from "../components/loadingScreen.js";
import ImageSwiper from "../components/Swiper.js";
import logoUnsaturated from "../Assets/LogoUnSaturated.png";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

export const ProductReviewForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState({});
    const [productSeller, setProductSeller] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        const root = `${rootUrl}/products/${id}`;

        try {
            setIsLoading(true);
            const response = await axios.get(root);

            console.log("response", response);
            setProductDetails(response.data.product);
            setProductSeller(response.data.product.createdBy);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const updateProductStatus = async (status) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/v1/products/${id}`,
                {
                    productStatus: status,
                }
            );
            console.log("response", response.data);
            toast.info(`Product ${status} successfully`);
            navigate("/admin/manageProducts");
        } catch (error) {
            console.error(error);
            toast.error(`Failed to ${status} product`);
        }
    };

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div className="flex flex-col max-w-[1240px] mx-auto mt-[96px] text-[#211C6A] justify-center">
            <div className="text-5xl font-bold mt-8 text-center">
                Product Review Form
            </div>
            <div className="bg-white border rounded-xl shadow-md w-full px-10 max-w-[1000px] mx-auto select-none z-1 mt-8">
                <div className="text-2xl font-bold mt-8">
                    Product Information
                </div>

                <div className="w-full flex p-4">
                    <div className="w-5/12 flex flex-col">
                        <div className="px-2 h-full">
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
                    </div>

                    <div className="w-7/12 flex flex-col ">
                        <div className="flex px-4 py-4">
                            <label className="font-semibold mr-4 w-40">
                                Product Name:
                            </label>
                            <span>{productDetails.name}</span>
                        </div>
                        <div className="flex px-4 pb-4">
                            <label className="font-semibold mr-4 w-40">
                                Product Category:
                            </label>
                            <span>{productDetails.category}</span>
                        </div>
                        <div className="flex px-4 pb-4">
                            <label className="font-semibold mr-4 w-40">
                                Price:
                            </label>
                            <div className={`font-semibold text-red-700`}>
                                {productDetails.price &&
                                productDetails.price !== -1
                                    ? "₱ " + formatPrice(productDetails.price)
                                    : null}

                                {productDetails.variation &&
                                    productDetails.variation.length > 0 && (
                                        <div className="flex flex-col">
                                            {productDetails.variation.map(
                                                (v, index) => (
                                                    <div
                                                        key={`${v.name}${index}`}
                                                        className="border border-1 border-gray-300 rounded-xl py-[2px] px-2 font-light m-[1px]"
                                                    >
                                                        {`${
                                                            v.name
                                                        } (${formatPrice(
                                                            v.price
                                                        )})`}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        </div>
                        <div className="flex px-4 pb-4">
                            <label className="font-semibold mr-4 w-40">
                                Stock:
                            </label>
                            <div>
                                {productDetails.variation &&
                                productDetails.variation.length > 0 ? (
                                    <div className="flex flex-col">
                                        {productDetails.variation.map((v) => (
                                            <div
                                                className="border border-1 border-gray-300 rounded-xl py-[2px] px-2 font-light m-[1px]"
                                                key={v.name}
                                            >
                                                {`${v.name} (${v.stock})`}
                                            </div>
                                        ))}
                                        <div className="font-light">
                                            total:{" "}
                                            {productDetails.variation.reduce(
                                                (total, v) => total + v.stock,
                                                0
                                            )}
                                        </div>
                                    </div>
                                ) : productDetails.stock &&
                                  productDetails.stock !== -1 ? (
                                    productDetails.stock
                                ) : productDetails.stock === 0 ? (
                                    <div className="text-red-400">SOLD OUT</div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                        <div className="flex px-4 pb-4">
                            <label className="font-semibold mr-4 w-40">
                                Variation Class:
                            </label>
                            <span>
                                {productDetails.variationClass &&
                                    productDetails.variationClass}
                            </span>
                        </div>
                        <div className="flex flex-col px-4 py-4">
                            <label className="font-semibold mr-4 w-40">
                                Description:
                            </label>
                            <span className="pl-8 pt-4">
                                <div
                                    className="px-8 font-light"
                                    dangerouslySetInnerHTML={{
                                        __html: productDetails.description,
                                    }}
                                ></div>
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex  justify-center mt-8">
                    <button
                        className="bg-green-700 mr-2 text-white uppercase py-2 px-4 w-[200px]  mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-green-500 hover:text-white transition duration-200 ease-in-out"
                        onClick={() => updateProductStatus("enabled")}
                    >
                        Approve
                    </button>
                    <button
                        className="bg-red-700 mr-2  text-white uppercase  py-2 px-4  w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
                        onClick={() => updateProductStatus("disabled")}
                    >
                        Disapprove
                    </button>
                    <button
                        className="bg-[#211C6A] text-white uppercase  py-2 px-4 w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                        onClick={() => navigate("/admin/manageProducts")}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};
