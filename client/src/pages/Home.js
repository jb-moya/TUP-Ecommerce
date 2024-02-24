import React, { useEffect, useState } from "react";
import LogInForm from "../components/StudentLogInForm.js";
import ProductCard from "../components/ProductCard.js";

export const Home = () => {
    const [backendData, setBackendData] = useState({});

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
            Home
            {typeof backendData.product === "undefined"
                ? "Loading..."
                : backendData.product.map((product, i) => (
                      <ProductCard product={product} />
                  ))}
            <LogInForm />
        </div>
    );
};
