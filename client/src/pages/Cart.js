import React from "react";
import { useSelector } from "react-redux";
import CartContainer from "../components/CartContainer";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const Cart = () => {
    return (
        <div className="mt-32">
            <NavBar />
            <div className="w-[1100px] flex-wrap flex mx-auto justify-center px-2 py-6 bg-white rounded-md shadow-md">
                <CartContainer />
                {/* <CartContainer /> */}
                {/* <CartContainer /> */}
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
