import React from "react";
import { useSelector } from "react-redux";
import CartContainer from "../components/CartContainer";
import { Container } from "react-bootstrap";
import NavBar from "../components/NavBar";

const Cart = () => {
    return (
        <>
            <NavBar />
            <Container>
                <CartContainer />
            </Container>
        </>
    );
};

export default Cart;
