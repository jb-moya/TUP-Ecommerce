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
    ];

    const options2 = [
        { value: "option4", label: "Option 4" },
        { value: "option5", label: "Option 5" },
        { value: "option6", label: "Option 6" },
    ];

    return (
        <div className="product-detail-page">
            <NavBar />

            <Container className="product-detail">
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

                {/* <img src={image} alt="" /> */}
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
            </Container>
        </div>
    );
};

// https://www.youtube.com/watch?v=8pKjULHzs0s

export default ProductDetailPage;
