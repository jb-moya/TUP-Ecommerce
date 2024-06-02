import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PaginationButtons from "./PaginationButtons";
import defaultProfileImage from "../Assets/defaultPP.png";

import Logo1 from "../OrganizationAssets/logoipsum-329.svg";
import Logo2 from "../OrganizationAssets/logoipsum-330.svg";
import Logo3 from "../OrganizationAssets/logoipsum-331.svg";
import Logo4 from "../OrganizationAssets/logoipsum-332.svg";
import Logo5 from "../OrganizationAssets/logoipsum-321.svg";
import Logo6 from "../OrganizationAssets/logoipsum-323.svg";
import Logo7 from "../OrganizationAssets/logoipsum-325.svg";

// Slider
import LoadingSymbol from "./loadingScreen";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import { isUserLogged } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import { TbHexagonLetterPFilled } from "react-icons/tb";

const productCategories = [
    "Electronics",
    "Clothing",
    "Shoes",
    "Books",
    "Beauty",
    "Health",
    "Home",
    "Garden",
    "Toys",
    "Sports",
    "Outdoors",
    "Groceries",
    "Accessories",
    "Gaming",
    "Handmade",
    "Other",
];

const HomeFrame = () => {
    const isLogged = useSelector(isUserLogged);
    const [products, setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPageCount, setMaxPageCount] = useState(0);
    const [sellers, setSellers] = useState([]);
    const [loadingFetchProducts, setLoadingFetchProducts] = useState(true);
    const [loadingFetchPopularProducts, setLoadingFetchPopularProducts] =
        useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/user",
                {
                    params: {
                        role: "seller",
                        status: "approved",
                        limit: 30,
                    },
                }
            );
            console.log("data", data);
            setSellers(data.users);
        } catch (error) {
            console.error(error);
        } finally {
            // toast.success("Products loaded successfully");
        }
    }, []);

    const fetchPopularProducts = useCallback(async () => {
        try {
            setLoadingFetchPopularProducts(true);
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        sort: [["soldCount", "descending"]],
                        limit: 6,
                        populatedFields: "createdBy",
                        productStatus: "enabled",
                    },
                }
            );
            console.log("fetching products popular", data.products);
            setPopularProducts(data.products);
        } catch (error) {
            console.error(error);
        } finally {
            setLoadingFetchPopularProducts(false);
        }
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        page: currentPage,
                        limit: 40,
                        populatedFields: "createdBy",
                        productStatus: "enabled",
                    },
                }
            );
            console.log("fetching products", data.products);
            setProducts(data.products);
            setMaxPageCount(Math.ceil(data.count / 40));
        } catch (error) {
            console.error(error);
        } finally {
            // toast.success("Products loaded successfully");
            setLoadingFetchProducts(false);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchPopularProducts();
    }, [fetchPopularProducts]);

    useEffect(() => {
        fetchProducts();
        fetchUser();
    }, [fetchProducts, fetchUser]);

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    function createSlide() {
        return (
            <SwiperSlide>
                <img className="w-[800px] h-[521px]" src={imgUrl()} alt="" />
            </SwiperSlide>
        );
    }

    return (
        <div className="flex flex-col text-[#211C6A] items-center justify-center pt-[108px]">
            <div
                className={
                    isLogged
                        ? `flex w-full h-[180px] max-w-[1240px] mx-auto select-none justify-center z-1`
                        : `flex w-full h-[220px] max-w-[1240px] mx-auto select-none justify-center z-1`
                }
            >
                <div className="md:flex flex-col items-center my-4">
                    <h1 className="font-bold text-5xl">
                        Elevate Your University Experience
                    </h1>
                    <div className="max-w-[640px] mt-2 text-center">
                        Gear up, students! Shop our exclusive university
                        organization merch now. <br />
                        Show your school pride and support your peers with every
                        purchase. <br />
                        Let's elevate our campus experience together!
                    </div>
                    {!isLogged && (
                        <button
                            onClick={handleSignUpClick}
                            className="border border-[#211C6A] rounded-full mt-4 text-[#211C6A] hover:bg-[#e8e8e8] font-semibold p-[10px] w-[250px]"
                        >
                            Sign Up as Customer
                        </button>
                    )}
                </div>
            </div>
            <div className="flex max-w-[1240px] w-full ">
                <div className=" w-[800px] h-[521px] my-5 mt-4">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        slidesPerView={1}
                        navigation
                        autoplay={{ delay: 3000 }}
                        pagination={{ clickable: true }}
                        className="rounded-2xl"
                    >
                        {createSlide()}
                        {createSlide()}
                        {createSlide()}
                        {createSlide()}
                        {createSlide()}
                    </Swiper>
                </div>

                <div className="flex flex-col w-full h-[521px] my-5 mt-4">
                    <img
                        className="w-[220x] h-[260.5px] ml-2 mb-2 bg-cover rounded-xl"
                        src={imgUrl()}
                        alt=""
                    />

                    <img
                        className="w-[220x] h-[260.5px] ml-2 bg-cover rounded-xl"
                        src={imgUrl()}
                        alt=""
                    />
                </div>
            </div>

            {sellers.length !== 0 && (
                <div className="max-w-[1240px] w-[1000px] pb-4">
                    <Swiper
                        modules={[FreeMode, Pagination]}
                        spaceBetween={20}
                        slidesPerView={5}
                        freeMode={true}
                        navigation
                        pagination={{ clickable: true }}
                        className=""
                    >
                        {sellers.map((seller, index) => (
                            <SwiperSlide
                                key={index}
                                className="w-fit my-6"
                                style={{ width: "fit-content" }}
                            >
                                <Link
                                    to={`/org/${seller._id}`}
                                    className="group my-6"
                                >
                                    <img
                                        className="w-20 h-20 object-cover rounded-full drop-shadow-sm mx-auto group-hover:scale-125 group-hover:shadow-lg transition-all ease-in-out duration-200"
                                        src={
                                            seller.image || defaultProfileImage
                                        }
                                        alt="Logo Here"
                                        loading="lazy"
                                    />
                                    <p className="mt-6 text-sm text-center line-clamp-2 transition-all ease-in-out duration-200">
                                        {seller.orgName}
                                    </p>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            <div className="max-w-[1240px] w-full mb-4 bg-white rounded-2xl shadow-md">
                <div className="max-w-[1240px] w-full">
                    <div className="font-bold h-[50px] p-4">CATEGORIES</div>
                    <hr className="border-[#211C6A]"></hr>
                    <div className="grid grid-cols-8 gap-2 p-4 border">
                        {productCategories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/search?categories=${category}`}
                                className="flex flex-col items-center hover:scale-[1.05] transition ease-in-out duration-200"
                            >
                                <img
                                    className="h-[150px] w-[150px] object-cover rounded-xl"
                                    src={require(`../Assets/categories/${category.toLowerCase()}.jpg`)}
                                    alt="Logo Here"
                                    loading="lazy"
                                />
                                <p className="text-sm">{category}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-white h-[340px] rounded-2xl max-w-[1240px] w-full mb-4 mt-4 shadow-md">
                <h1 className="font-bold p-4">TOP PRODUCTS</h1>
                <hr className="border-[#211C6A]"></hr>
                <div className="grid grid-cols-6 gap-4 m-4">
                    {popularProducts.length !== 0 &&
                        popularProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                </div>
                <LoadingSymbol
                    showWhen={
                        popularProducts.length === 0 &&
                        loadingFetchPopularProducts
                    }
                />
                {!loadingFetchPopularProducts &&
                    popularProducts.length === 0 && (
                        <div className="flex justify-center items-center">
                            No products found
                        </div>
                    )}
            </div>
            <div className="flex flex-col bg-white max-w-[1240px] w-full rounded-2xl shadow-md">
                <h1 className="font-bold p-4">DISCOVER YOUR PRODUCTS</h1>
                <hr className="border-[#211C6A]"></hr>
                <div className="grid grid-cols-6 gap-4 m-4">
                    {products.length !== 0 &&
                        products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                </div>

                <LoadingSymbol
                    showWhen={products.length === 0 && loadingFetchProducts}
                />
                {!loadingFetchProducts && products.length === 0 && (
                    <div className="flex justify-center items-center">
                        No products found
                    </div>
                )}

                <PaginationButtons
                    pageCount={maxPageCount > 0 ? maxPageCount : 1}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default HomeFrame;
