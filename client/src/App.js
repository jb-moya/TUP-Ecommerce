// import "./App.css";
import React, { useState } from "react";

// import "./customBootstrap/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUpPage.js";
import LogIn from "./pages/LogInPage.js";
import Home from "./pages/HomePage.js";
import About from "./pages/AboutPage.js";
import Cart from "./pages/CartPage.js";
import ProductDetail from "./pages/ProductDetailPage.js";
import Organization from "./pages/OrganizationPage.js";
import NotFound from "./pages/NotFoundPage.js";

import ConfirmModel from "./components/Modal.js";
const rootUrl = "http://localhost:5000/api/v1";

function App() {
    // const [modalShow, setModalShow] = React.useState(false);
    // const [show, setShow] = useState(false);

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <div className="box-border">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/product" element={<ProductDetail />} />
                    <Route path="/org" element={<Organization  />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
export { rootUrl };
