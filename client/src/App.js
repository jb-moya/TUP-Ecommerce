// import "./App.css";
import React, { useState } from "react";
// import "./customBootstrap/css/bootstrap.min.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./pages/SignUp.js";
import LogIn from "./pages/LogIn.js";
import Home from "./pages/Home.js";
import Cart from "./pages/Cart.js";
import ProductDetail from "./pages/ProductDetail.js";
import NotFound from "./pages/NotFound.js";

import ConfirmModel from "./components/Modal.js";
const rootUrl = "http://localhost:5000/api/v1";

function App() {
    const [modalShow, setModalShow] = React.useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="box-border">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/product" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
export { rootUrl };
