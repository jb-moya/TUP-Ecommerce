import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard.js";
import "./App.css";
import SignUp from "./components/StudentSignUp.js";

function App() {
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
            {typeof backendData.product === "undefined"
                ? "Loading..."
                : backendData.product.map((product, i) => (
                      <ProductCard product={product} />
                  ))}

            <SignUp />
        </div>
    );
}

// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKA
// HAYUP KAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKAKA

export default App;
