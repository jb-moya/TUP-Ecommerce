import React from "react";
import { useSelector } from "react-redux";
import CartContainer from "../components/CartContainer";
import { Container } from "react-bootstrap";
const Cart = () => {
    return (
        <Container>
            <CartContainer />
        </Container>
    );
};

export default Cart;
