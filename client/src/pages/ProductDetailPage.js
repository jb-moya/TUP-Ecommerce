import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar.js";
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
axios.defaults.withCredentials = true;

const exampleProduct = {
    product: {
        _id: "65ee78d04cfbe7e546c10544",
        name: "Sneakers",
        price: [59.99],
        featured: false,
        variationClass: ["Color", "Size"],
        description: "A comfortable sneakers with advanced features",
        variation: [
            {
                sku: "QRS345",
                option: {
                    color: "Red",
                    size: "Large",
                },
                price: 59.99,
                stock: 10,
                _id: "65ee78d04cfbe7e546c10545",
            },
            {
                sku: "TUV678",
                option: {
                    color: "Blue",
                    size: "Large",
                },
                price: 59.99,
                stock: 5,
                _id: "65ee78d04cfbe7e546c10546",
            },
            {
                sku: "WXY901",
                option: {
                    color: "Black",
                    size: "Large",
                },
                price: 59.99,
                stock: 10,
                _id: "65ee78d04cfbe7e546c10547",
            },
        ],
        createdAt: "2024-03-11T03:21:50.798Z",
        category: "Shoes",
        createdBy: "65ec48144d8f314289363eb2",
        averageRating: 0,
        numOfReviews: 0,
        updatedAt: "2024-03-12T00:26:49.438Z",
        __v: 0,
    },
};

const ProductDetailPage = (props) => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    console.log(currentPath);

    useEffect(() => {
        const fetchData = async () => {
            const root = `${rootUrl}/products/65ee78d04cfbe7e546c10544`;

            try {
                const response = await axios.get(root);

                console.log("response", response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        console.log("cookie", document.cookie);
    }, []);

    const variations = {}
    exampleProduct.product.variation.forEach((variation) => {
        const { option } = variation;
        const optionKeys = Object.keys(option);

        optionKeys.forEach((key) => {
            if (variations[key]) {
                if (!variations[key].includes(option[key])) {
                    variations[key].push(option[key]);
                }
            } else {
                variations[key] = [option[key]];
            }
        });    
    });

    console.log(variations)


    // const options2 = [
    //     { value: "option4", label: "Option 4" },
    //     { value: "option5", label: "Option 5" },
    //     { value: "option6", label: "Option 6" },
    // ];

    return (
        <div className="mt-32">
            <NavBar />

            <div className="w-[1100px] flex-wrap flex mx-auto justify-center px-2 py-6 bg-white rounded-md shadow-md">
                <div className="w-5/12 pl-8">
                    <ImageSwiper />
                </div>

                <div className="w-7/12">
                    <div className="w-full flex h-min">
                        <div className="w-7/12">
                            <div className="text-3xl px-8 font-bold text-[#211c6a]">
                                PRODUCT NAME
                            </div>
                            <div className="px-8 text-base font-light leading-none">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci accusamus
                            </div>
                        </div>
                        <div className="w-5/12 text-right">
                            <div className="text-2xl px-8 font-semibold text-red-700">
                                ₱599,999.99
                            </div>
                            <div className="flex align-baseline justify-end">
                                <div className="leading-none underline pr-1 underline-offset-4 text-[#211c6a]">
                                    4.9
                                </div>
                                <div className="pr-8">
                                    <StarRating
                                        defaultRating={3}
                                        disableAction={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-full flex mt-2">
                        <div className="pl-8 pr-2 flex leading-tight font-light border-r-[1px] border-[#000000] border-opacity-40">
                            <span className="text-lg leading-none font-light pr-1">
                                1.2K+
                            </span>{" "}
                            <span className="font-extralight">Rating</span>
                        </div>
                        <div className="pl-2 pr-2 flex leading-tight font-light border-r-[1px] border-[#000000] border-opacity-40">
                            <span className="text-lg leading-none font-light pr-1">
                                5.5K+
                            </span>{" "}
                            <span className="font-extralight">Sold</span>
                        </div>
                    </div>

                    <div className="w-full mt-10">
                        {/* <ProductVariation
                            id={"component1"}
                            options={options1}
                            variationClass={"Color"}
                        /> */}
                        {/* <ProductVariation
                            id={"component2"}
                            options={options2}
                            variationClass={"Model and Size"}
                        /> */}
                    </div>
                    <div className="mt-8 flex items-center">
                        <div className="w-3/12 pl-8 text-sm break-normal font-medium text-[#211c6a]">
                            Quantity:{" "}
                        </div>
                        <div className="pr-2">
                            <OrderQuantity
                                maximum={999}
                                quantity={quantity}
                                onQuantityChange={handleQuantityChange}
                            />
                        </div>
                        <div>12 stock available</div>
                    </div>
                    <div className="flex px-8 py-7 justify-center items-center">
                        <button className="p-2 border rounded mr-4 bg-[#a6bec2] text-white hover:border-violet-500">
                            Add to Cart
                        </button>
                        <button className="p-2 border rounded bg-[#59b5c3] text-white hover:border-violet-500">
                            Buy Now
                        </button>
                    </div>

                    <hr className="w-1/2 m-auto rounded border-t-1 border-black border-opacity-25 mb-4"></hr>
                </div>

                {/* <hr className="w-1/2 m-auto rounded border-t-1 border-black border-opacity-25 mb-4"></hr> */}

                <div className="w-full">
                    <div className="px-8 mt-4 font-semibold text-lg leading-relaxed text-[#211c6a]">
                        Product Details
                    </div>
                    <div className="px-8">
                        Lorem ipsum dolor sit, amet
                        consectetur adipisicing elit. Quas facere ut molestias
                        soluta! Placeat repellendus eum minima est. Perspiciatis
                        expedita corporis dolorem repellat. Repellat corporis
                        itaque possimus non qui molestias tempora accusamus in
                        obcaecati delectus fugiat quas a ad numquam odit
                        provident ex harum quod et officia dolorum sequi, quae
                        voluptatibus optio! Deserunt nemo eius mollitia debitis,
                        harum quibusdam! Error quisquam commodi, cum ipsa,
                        labore iure earum mollitia quos ex impedit ut odio
                        voluptatum magni tempore dolorem! Maiores cumque beatae
                        ipsam delectus aliquid labore quo odit. Expedita dolores
                        deleniti enim quidem beatae consectetur perspiciatis
                        mollitia rem. Sed, voluptas animi aliquid totam et eius,
                        quasi assumenda illo quam impedit dignissimos iusto
                        temporibus consequatur cum iure voluptates. Minus
                        aliquid pariatur perspiciatis voluptatum fuga asperiores
                        aliquam quas ipsam voluptate debitis? Nulla nihil
                        tempora, iusto sunt adipisci itaque in quas, expedita
                        obcaecati delectus incidunt praesentium culpa
                        repudiandae quo molestias nisi optio neque! Temporibus
                        sint quibusdam quae, minus ea vero veritatis facere
                        excepturi reprehenderit illo aspernatur debitis sit,
                        neque quas eius aperiam sapiente exercitationem soluta
                        aliquid voluptate repellat minima voluptatem! Numquam ex
                        mollitia porro vitae. Doloribus accusamus incidunt
                        tempore eius similique beatae corrupti cupiditate
                        architecto? Vitae, voluptatibus. Molestias doloribus
                        tenetur ipsa animi, enim velit saepe.
                    </div>
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
                    <RatingOverview />
                </div>

                <hr className="w-full rounded border-t-1 border-black border-opacity-25 mb-4"></hr>

                <div>
                    <Review />
                </div>
            </div>

            <Footer />
        </div>
    );
};

// https://www.youtube.com/watch?v=8pKjULHzs0s

export default ProductDetailPage;
