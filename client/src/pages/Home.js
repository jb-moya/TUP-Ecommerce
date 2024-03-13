import React, { useEffect, useState } from "react";
// import LogInForm from "../components/StudentLogInForm.js";
import ProductCard from "../components/ProductCard.js";
import NavBar from "../components/NavBar.js";
import Button from "../components/Button.js";
import axios from "axios";

const Home = () => {
    // const [backendData, setBackendData] = useState({});

    // const fakeProductId = ["1", "2", "3", "4", "5"];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchProduct = await axios.get(
                    "http://localhost:5000/api"
                );
                console.log(fetchProduct.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <div>
            <NavBar />
            {/* 
            {fakeProductId.map((product, i) => (
                <ProductCard productID={product} />
            ))} */}

            {/* {typeof backendData.product === "undefined"
                ? "Loading..."
                : backendData.product.map((product, i) => (
                      <h1>{product}</h1>
                      //   <ProductCard product={product} /> */}
            {/* ))} */}

            {/* <LogInForm /> */}
        </div>
    );
};

export default Home;
