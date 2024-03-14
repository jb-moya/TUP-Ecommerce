import React from "react";
import NavBar from "../components/NavBar.js";
import ProductDetail from "../components/ProductDetail.js";
// import "../customBootstrap/css/bootstrap.min.css";
import ImageSwiper from "../components/Swiper.js";
import { Container, Row, Col, Stack } from "react-bootstrap";

const ProductDetailPage = (props) => {
    return (
        <div className="product-detail-page">
            <NavBar />

            <Container className="product-detail">
                <Row>
                    <Col className="image-container" xs={4}>
                        {/* 1 of 2 */}
                        <Col className="main-image">
                            <ImageSwiper />
                        </Col>
                    </Col>
                    <Col>
                        <Row className="details">
                            <Stack direction="horizontal" gap={3}>
                                <div className="product-name">
                                    DILDO NI LOLA MARE DILDO NI LOLA MARE DILDO
                                    DILDO NI LOLA MARE NI LOLA MARE
                                    asdfjlkasdjas;ldkfj l;sakdjf ;lsakdjf
                                    l;ksdjaf l;ksadjf
                                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                                </div>
                                <div className="vr ms-auto" />
                                {/* <div className="product-price p-2">
                                    PHP 999.99
                                </div> */}
                                <div className="product-price">
                                    {/* PHP 999.99 */}
                                    <Stack className="">
                                        <div className="p-0">DILDO</div>
                                        {/* <div className="vr ms-auto" /> */}
                                        <div className="p-0">
                                            PHP 999111111111111.99
                                        </div>
                                    </Stack>
                                </div>
                            </Stack>
                        </Row>
                    </Col>
                </Row>
                <Row></Row>
            </Container>

            {/* <ProductDetail /> */}
        </div>
    );
};

// https://www.youtube.com/watch?v=8pKjULHzs0s

export default ProductDetailPage;
