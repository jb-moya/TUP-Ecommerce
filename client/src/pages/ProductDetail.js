import React, { useEffect } from "react";
import NavBar from "../components/NavBar.js";
// import "../customBootstrap/css/bootstrap.min.css";
import ImageSwiper from "../components/Swiper.js";
import {
    Container,
    Row,
    Col,
    Stack,
    Button,
    Image,
    ProgressBar,
    InputGroup,
    Form,
    ButtonGroup,
} from "react-bootstrap";
import StarRating from "../components/StarRating.js";

import image from "../components/images/lake-louise-51543_1280.jpg";
import RatingOverview from "../components/RatingOverview.js";
import ProductVariation from "../components/ProductVariation.js";
import { useLocation } from "react-router-dom";
import BreadCrumb from "../components/BreadCrumb.js";
import { FaStar } from "react-icons/fa";
import Review from "../components/Review.js";
import OrderQuantity from "../components/OrderQuantity.js";
import { rootUrl } from "../App.js";

import axios from "axios";
axios.defaults.withCredentials = true;

const ProductDetailPage = (props) => {
    const location = useLocation();
    const currentPath = location.pathname;

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
        // fetchData();
    }, []);

    const options1 = [
        { value: "option1", label: "Option 1" },
        { value: "option2", label: "Option 2" },
        { value: "option3", label: "Option 3" },
        { value: "option4", label: "Option 4" },
        { value: "option5", label: "Option 5" },
        { value: "option6", label: "Option 6" },
        { value: "option7", label: "Option 7" },
        { value: "option8", label: "Option 8" },
        { value: "option9", label: "Option 9" },
        { value: "option10", label: "Option 10" },
        { value: "option11", label: "Option 11" },
    ];

    const options2 = [
        { value: "option4", label: "Option 4" },
        { value: "option5", label: "Option 5" },
        { value: "option6", label: "Option 6" },
    ];

    return (
        <div className="px-28">
            <NavBar />

            <div className="w-[1100px] flex-wrap flex mx-auto justify-center px-2 py-6 bg-white rounded-md shadow-md">
                <div className="w-5/12 pl-8">
                    <ImageSwiper />
                </div>

                <div className="w-7/12">
                    <div className="w-full flex h-min">
                        <div className="w-7/12">
                            <div className="text-3xl px-8 font-bold text-[#211c6a]">
                                MIDO
                            </div>
                            <div className="px-8 text-base font-light leading-none">
                                Pero MIDO talaga 'to ni Aleng Mare, inarbor lang
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
                        <ProductVariation
                            id={"component1"}
                            options={options1}
                            variationClass={"Color"}
                        />
                        <ProductVariation
                            id={"component2"}
                            options={options2}
                            variationClass={"Model and Size"}
                        />
                    </div>
                    <div className="mt-8">
                        <OrderQuantity maximum={999} />
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

                    <div className="w-full">
                        <div className="px-8 font-semibold text-sm leading-relaxed text-[#211c6a]">
                            Product Details
                        </div>
                        <div className="px-8">
                            Medyo gamit na. 4 years na ata to ewan ko. Marami
                            rin gumagamit, sabay sabay kasi kami hehe ULUL
                            afasdf asdjflk;jasdlk;fj as;ldkfj
                        </div>
                    </div>
                </div>

                <div className="w-full flex justify-around">
                    <div>
                        <RatingOverview />
                    </div>
                </div>
                <div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nulla debitis, voluptates voluptate illo distinctio sint.
                    Officiis deleniti temporibus quia vel, libero exercitationem
                    sequi! Mollitia molestias ipsa quis tenetur quae possimus?
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Hic odio accusamus qui corporis rerum alias provident
                    commodi totam ratione inventore, dolorem id ea porro fugit!
                    Optio vero iste quos adipisci quia repellendus sint et
                    sapiente earum quo rem recusandae, blanditiis laudantium
                    nulla ut dignissimos beatae officia facere sunt laboriosam?
                    Maiores.
                </div>
            </div>
        </div>

        /* <Container className="product-detail">
                <BreadCrumb currentPath={currentPath} />
                <Row className="first-container main-container">
                    <Col className="image-container" xs={5}>
                        <Col className="main-image">
                            <ImageSwiper />
                        </Col>
                    </Col>
                    <Col>
                        <Row className="details">
                            <Stack direction="vertical" gap={4}>
                                <Stack direction="horizontal" gap={3}>
                                    <Stack>
                                        <div className="product-name">
                                            MIDO NAMEN
                                        </div>
                                        <div className="product-sub-name">
                                            Pero MIDO talaga 'to ni Aleng Mare,
                                            inarbor lang
                                        </div>
                                    </Stack>
                                    <div className="ms-auto" />
                                    <div className="col-md-4 text-end">
                                        <Stack className="">
                                            <div className="product-price p-0 w-600">
                                                ₱ 199,999.99
                                            </div>
                                            <div className="star-rating p-0">
                                                <div className="rating">
                                                    3.5
                                                </div>
                                                <StarRating
                                                    defaultRating={3}
                                                    disableAction={true}
                                                />
                                            </div>
                                            <div className="rating-num">
                                                12 Ratings
                                            </div>
                                            <div className="sold-count">
                                                1.1k Sold
                                            </div>
                                        </Stack>
                                    </div>
                                </Stack>

                                <ProductVariation
                                    id="component1"
                                    options={options1}
                                />
                                <ProductVariation
                                    id="component2"
                                    options={options2}
                                />

                                <OrderQuantity maximum={999} />

                                <Stack
                                    className="customer-buttons mx-auto"
                                    gap={3}
                                    direction="horizontal"
                                >
                                    <Button
                                        size="lg"
                                        className="add-to-cart"
                                        variant="secondary"
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button
                                        className="buy-now"
                                        size="lg"
                                        variant="primary"
                                    >
                                        Buy Now
                                    </Button>
                                </Stack>

                                <hr></hr>
                                <div className="w-600 s-16 p-0">
                                    Product Details
                                </div>
                                <div className="product-description p-0">
                                    Medyo gamit na. 4 years na ata to ewan ko.
                                    Marami rin gumagamit, sabay sabay kasi kami
                                    hehe ULUL afasdf asdjflk;jasdlk;fj as;ldkfj
                                </div>
                            </Stack>
                        </Row>
                    </Col>
                </Row>

                <Row className="main-container seller-details-container">
                    <Stack className="" direction="horizontal" gap={3}>
                        <div className="circle">
                            <Image
                                className="profile"
                                src={image}
                                roundedCircle
                                fluid
                            />
                        </div>

                        <div>
                            <Stack className="seller-details s-16" gap={2}>
                                <div>Shop ni Aleng Mare</div>
                                <Button
                                    size="sm"
                                    className="view-seller"
                                    variant="primary"
                                >
                                    View Seller
                                </Button>
                            </Stack>
                        </div>
                    </Stack>
                </Row>

                <Row className="main-container product-ratings justify-content-md-center">
                    <Col xs lg="2" className="title w-600 s-16">
                        Product Ratings
                    </Col>

                    <Row>
                        <RatingOverview />
                    </Row>

                    <div className="custom-horizontal-separator"></div>

                    <Review />
                </Row>
            </Container> */
    );
};

// https://www.youtube.com/watch?v=8pKjULHzs0s

export default ProductDetailPage;
