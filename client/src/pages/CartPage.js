import React from "react";
import { useSelector } from "react-redux";
import CartContainer from "../components/CartContainer";
import {NavBar} from "../components/NavBar.js";
import Footer from "../components/Footer";
import CheckOut from "../components/CheckOut";

const Cart = () => {
    return (
        <div className="mt-32">
            <NavBar />
            <div className="w-[1100px]  flex-wrap flex mx-auto justify-center px-2 py-6 bg-white rounded-md shadow-md">
                <CartContainer />
                <CheckOut />
            </div>
            <Footer />
        </div>
    );
};

export default Cart;
