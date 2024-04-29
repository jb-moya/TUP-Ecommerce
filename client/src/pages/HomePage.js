import React, { useEffect, useState } from "react";
// import LogInForm from "../components/StudentLogInForm.js";
import ProductCard from "../components/ProductCard.js";
import {NavBar, NavbarUser} from "../components/NavBar.js";
import CustomButton from "../components/Button.js";
import axios from "axios";
import Footer from "../components/Footer.js";
import { ProgressBar, Container, Row, Col } from "react-bootstrap";
import HomeFrame from "../components/HomeFrame.js";




const Home = () => {

    const isLoggedIn = true;
    
    return (
        <div>
            {isLoggedIn ? <NavbarUser /> : <NavBar />}
            <HomeFrame />
            <Footer />
        </div>
    );
};

export default Home;





    // // const [backendData, setBackendData] = useState({});

    // // const fakeProductId = ["1", "2", "3", "4", "5"];

    // useEffect(() => {
    //     const fetchProduct = async () => {
    //         try {
    //             const fetchProduct = await axios.get(
    //                 "http://localhost:5000/api"
    //             );
    //             console.log(fetchProduct.data);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     };

    //     fetchProduct();
    // }, []);


// <ProgressBar now={60} />
//             <Container className="">
//                 <Row>
//                     <ProgressBar now={60} />
//                 </Row>

//                 <Col>
//                     <ProgressBar now={60} />
//                     <ProgressBar now={60} />
//                 </Col>
//                 <ProgressBar now={60} />
//             </Container>
//             {/* 
//             {fakeProductId.map((product, i) => (
//                 <ProductCard productID={product} />
//             ))} */}

//             {/* {typeof backendData.product === "undefined"
//                 ? "Loading..."
//                 : backendData.product.map((product, i) => (
//                       <h1>{product}</h1>
//                       //   <ProductCard product={product} /> */}
//             {/* ))} */}

//             {/* <LogInForm /> */}

//             {/* <Footer /> */}
