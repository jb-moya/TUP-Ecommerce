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
                option: "Red, Small",
                price: 59.99,
                stock: 10,
                _id: "65ee78d04cfbe7e546c10545",
            },
            {
                option: "Red, Large",
                price: 59.99,
                stock: 5,
                _id: "65ee78d04cfbe7e546c10546",
            },
            {
                option: "Blue, Small",
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
// 6630cc6217b27ddd2a9cc769
// 662785b7c7382ba59dd04cb1 customer
const ProductDetailPage = (props) => {
    const { id } = useParams();

    const [productDetails, setProductDetails] = useState({});
    const [userID, setUserID] = useState("");
    const [productReviews, setProductReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    const [profilePicture, setProfilePicture] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        // Retrieve user data from localStorage
        const storedUser = localStorage.getItem("user");

        if (storedUser) {
            // Parse the JSON string back into an object

            const userObject = JSON.parse(storedUser);
            // console.log("User data found in localStorage:", userObject);

            // Now you can access properties of the user object
            // console.log("User ID:", userObject.user._id);
            // console.log("First Name:", userObject.user.firstName);
            // console.log("Last Name:", userObject.user.lastName);
            // console.log("Email:", userObject.user.email);
            // console.log("Role:", userObject.user.role);

            setUserID(userObject.user._id);
            // Access other properties as needed

            // Set the user object in your component state if necessary
            // setUser(userObject);
        } else {
            console.log("User data not found in localStorage.");
        }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    useEffect(() => {
        const fetchData = async () => {
            const root = `${rootUrl}/products/${id}`;

            try {
                const response = await axios.get(root);

                console.log("response", response);
                setProductDetails(response.data.product);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        console.log("cookie", document.cookie);

        fetchData();
    }, [id]);

    const location = useLocation();
    const currentPath = location.pathname;

    const [quantity, setQuantity] = useState(1);
    const [isOpenWriteReview, setIsOpenWriteReview] = useState(false);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
    };

    console.log(currentPath);

    const variations = {};
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

    const handleSubmitReview = () => {
        console.log("Submit review");
        try {
            axios.post("http://localhost:5000/api/v1/reviews", {
                product: id,
                title: "title",
                comment: "review",
                rating: 4,
            });
        } catch (error) {
            console.error(error);
        }
    };

    const handleWriteReview = () => {
        console.log("Write a review");
        setIsOpenWriteReview(!isOpenWriteReview);
    };

    const handleVariationPick = (variation) => {
        console.log("Variation picked", variation);
    };

    const options2 = [
        { value: "option4", label: "Option 4" },
        { value: "option5", label: "Option 5" },
        { value: "option6", label: "Option 6" },
    ];

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
                            productDetails.variation > 0 && (
                                <ProductVariation
                                    id={"component2"}
                                    options={productDetails.variation}
                                    handleVariationPick={handleVariationPick}
                                    variationClass={
                                        productDetails.variationClass
                                    }
                                />
                            )
                        )}
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
                        {/* <p className="text-[#211c6a]"> */}
                        {productDetails.description}
                        {/* </p> */}
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
                    <RatingOverview handleWriteReview={handleWriteReview} />
                </div>

                <hr className="w-full rounded border-t-1 border-black border-opacity-25 mb-4"></hr>

                <div className="flex flex-col">
                    {isOpenWriteReview && <WriteReview />}

                    <div>
                        <Review />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

// https://www.youtube.com/watch?v=8pKjULHzs0s

export default ProductDetailPage;
