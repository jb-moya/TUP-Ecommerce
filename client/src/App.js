import React, { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard.js";
import "./App.css";
import SignUpForm from "./components/StudentSignUpForm.js";
import LogInForm from "./components/StudentLogInForm.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignUp } from "./pages/SignUp.js";
import { LogIn } from "./pages/LogIn.js";

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
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                </Routes>
            </BrowserRouter>

            {typeof backendData.product === "undefined"
                ? "Loading..."
                : backendData.product.map((product, i) => (
                      <ProductCard product={product} />
                  ))}

            <SignUpForm />
            <LogInForm />
        </div>
    );
}

export default App;
