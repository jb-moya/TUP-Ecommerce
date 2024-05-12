import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PaginationButtons from "./PaginationButtons";

import Logo1 from "../OrganizationAssets/logoipsum-329.svg";
import Logo2 from "../OrganizationAssets/logoipsum-330.svg";
import Logo3 from "../OrganizationAssets/logoipsum-331.svg";
import Logo4 from "../OrganizationAssets/logoipsum-332.svg";
import Logo5 from "../OrganizationAssets/logoipsum-321.svg";
import Logo6 from "../OrganizationAssets/logoipsum-323.svg";
import Logo7 from "../OrganizationAssets/logoipsum-325.svg";

// Slider

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { isUserLogged } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

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
    const dispatch = useDispatch();
    const isLogged = useSelector(isUserLogged);
    const [products, setProducts] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productCount, setProductCount] = useState(0);
    const [maxPageCount, setMaxPageCount] = useState(0);

    const fetchPopularProducts = useCallback(async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        sort: [["soldCount", "ascending"]],
                        limit: 6,
                    },
                }
            );
            setPopularProducts(data.products);
        } catch (error) {}
    }, []);

    const fetchProducts = useCallback(async () => {
        try {
            const { data } = await axios.get(
                "http://localhost:5000/api/v1/products",
                {
                    params: {
                        page: currentPage,
                    },
                }
            );
            setProducts(data.products);
            setProductCount(data.productTotalCount);
            setMaxPageCount(Math.ceil(data.productTotalCount / 10));
        } catch (error) {
        } finally {
            toast.success("Products loaded successfully");
        }
    }, [currentPage]);

    useEffect(() => {
        fetchPopularProducts();
    }, [fetchPopularProducts]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts, currentPage]);

    const navigate = useNavigate();

    const handleSignUpClick = () => {
        navigate("/signup");
    };

    const handleSeeMore = () => {
        navigate("/");
    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        // // console.log(id);
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
        <div className="flex flex-col text-[#211C6A] items-center justify-center pt-[96px]">
            <div className="flex w-full h-[220px] max-w-[1240px] mx-auto select-none justify-center z-1">
                <div className="hidden md:flex flex-col items-center mt-4">
                    <h1 className="font-bold text-4xl">
                        Elevate Your University Experience
                    </h1>
                    <p className="max-w-[640px] text-center">
                        <br />
                        Gear up, students! Shop our exclusive university
                        organization merch now. <br />
                        Show your school pride and support your peers with every
                        purchase. <br />
                        Let's elevate our campus experience together!
                    </p>
                    {!isLogged && (
                        <button
                            onClick={handleSignUpClick}
                            className="border border-[#211C6A] text-[#211C6A] mt-5 hover:bg-[#e8e8e8] font-semibold p-[10px] w-[150px]"
                        >
                            Sign Up
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
                        className="w-[220x] h-[260.5px] ml-2 mb-2 bg-cover"
                        src={imgUrl()}
                        alt=""
                    />

                    <img
                        className="w-[220x] h-[260.5px] ml-2 bg-cover"
                        src={imgUrl()}
                        alt=""
                    />
                </div>
            </div>

            <div className="flex flex-row justify-between max-w-[1240px] w-[1000px] h-20 mb-4 mx-auto">
                <img
                    className="w-20 h-20"
                    src={Logo1}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo2}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo3}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo4}
                    alt="Logo Here"
                    loading="lazy"
                />
                <img
                    className="w-20 h-20"
                    src={Logo5}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo6}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo7}
                    alt="Logo Here"
                    loading="lazy"
                />
            </div>

            <div className="max-w-[1240px] w-full mb-4 bg-white">
                <div className="max-w-[1240px] w-full ">
                    <div className="font-bold h-[50px] p-4">CATEGORIES</div>
                    <hr className="border-[#211C6A]"></hr>
                    <div className="grid grid-cols-8 gap-2 p-4 border ">
                        {productCategories.map((category, index) => (
                            <Link
                                key={index}
                                to={`/search?categories=${category}`}
                                className="flex flex-col items-center hover:scale-[1.05] transition ease-in-out duration-200"
                            >
                                <img
                                    className="h-[150px] w-[150px] bg-contain rounded"
                                    // src={category.toLowerCase()}
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

            <div className="flex flex-col bg-white h-[340px] max-w-[1240px] w-full mb-4 mt-4">
                <h1 className="font-bold p-4">TOP PRODUCTS</h1>
                <hr className="border-[#211C6A]"></hr>
                <div className="grid grid-cols-6 gap-4 m-4">
                    {popularProducts.length !== 0 ? (
                        popularProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    ) : (
                        <div className="flex justify-center align-middle">
                            ...Loading Popular Products...
                        </div>
                    )}
                </div>
            </div>

            <div className="flex flex-col bg-white max-w-[1240px] w-full">
                <h1 className="font-bold p-4">DISCOVER YOUR PRODUCTS</h1>
                <hr className="border-[#211C6A]"></hr>
                <div className="grid grid-cols-6 gap-4 m-4">
                    {products.length !== 0 ? (
                        products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    ) : (
                        <div>...Loading Products...</div>
                    )}
                </div>

                <PaginationButtons
                    pageCount={maxPageCount > 0 ? maxPageCount : 1}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default HomeFrame;
