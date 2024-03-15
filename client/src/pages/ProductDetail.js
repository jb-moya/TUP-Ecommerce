import React from "react";
import NavBar from "../components/NavBar.js";
import ProductDetail from "../components/ProductDetail.js";
// import "../customBootstrap/css/bootstrap.min.css";
import ImageSwiper from "../components/Swiper.js";
import { Container, Row, Col, Stack, Button, Image } from "react-bootstrap";
import StarRating from "../components/StarRating.js";

import image from "../components/images/lake-louise-51543_1280.jpg";
import RatingOverview from "../components/RatingOverview.js";
import ProductVariation from "../components/ProductVariation.js";

const ProductDetailPage = (props) => {
    return (
        <div className="product-detail-page">
            <NavBar />

            <Container className="product-detail">
                <Row className="main-container">
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
                                            DILDO NAMEN
                                        </div>
                                        <div className="product-sub-name">
                                            Pero Dildo talaga 'to ni Aleng Mare,
                                            inarbor lang
                                        </div>
                                    </Stack>
                                    <div className="ms-auto" />
                                    <div className="col-md-4 text-end">
                                        <Stack className="">
                                            <div className="product-price p-0">
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

                                <Stack
                                    className="quantity-stack"
                                    direction="horizontal"
                                    gap={4}
                                >
                                    <ProductVariation />
                                </Stack>

                                <Stack
                                    className="quantity-stack"
                                    direction="horizontal"
                                    gap={4}
                                >
                                    <div className="font">Quantity: </div>
                                    <div className="quantity">
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            step="1"
                                            defaultValue="1"
                                        />
                                    </div>
                                    <div className="poppins">
                                        999 stocks available
                                    </div>
                                </Stack>

                                <Stack
                                    className="customer-buttons mx-auto"
                                    gap={3}
                                    direction="horizontal"
                                >
                                    <Button
                                        size="lg"
                                        className="add-to-cart"
                                        variant="primary"
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
                                    ajsdl;kfjasdlk;fjsd asjdfl;kasjdflkjasd
                                    fjasdfjas dfjas dfjassdajf sdajfs
                                    dajfdfsdfdlkfjsdafl;ksdjfkld;fjsdl;k asdf
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Sed do eiusmod tempor
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
                    <Col xs lg="2" className="w-600 s-16">
                        Product Ratings
                    </Col>

                    <Row>
                        <Stack direction="horizontal">
                            <div className="p-1">
                                <RatingOverview />
                            </div>
                            <div className="vr" />
                            <div className="p-1"></div>
                        </Stack>
                    </Row>
                </Row>
            </Container>

            {/* <Container className="main-container product-ratings" fluid="lg">
                <Row>
                    <Col>1 of 2</Col>
                </Row>
                <Row>
                    <Col>2 of 2</Col>
                    {/* <Col>1 of 3</Col>
                    <Col>2 of 3</Col>
                    <Col>3 of 3</Col>
                </Row>
            </Container> */}
        </div>
    );
};

// https://www.youtube.com/watch?v=8pKjULHzs0s

export default ProductDetailPage;
