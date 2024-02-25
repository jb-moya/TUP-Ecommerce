import React, { useEffect, useState } from "react";
// import LogInForm from "../components/StudentLogInForm.js";
import ProductCard from "../components/ProductCard.js";
import NavBar from "../components/NavBar.js";

const Home = () => {
    const [backendData, setBackendData] = useState({});

    const fakeProductId = ["1", "2", "3", "4", "5"];

    useEffect(() => {
        fetch("/api")
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => setBackendData(data))
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div>
            <NavBar />

            {fakeProductId.map((product, i) => (
                <ProductCard productID={product} />
            ))}

            {/* {typeof backendData.product === "undefined"
                ? "Loading..."
                : backendData.product.map((product, i) => (
                      <ProductCard product={product} />
                  ))} */}
            {/* <LogInForm /> */}
        </div>
    );
};

export default Home;