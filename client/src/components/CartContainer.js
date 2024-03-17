import React from "react";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";
import { Button, Stack } from "react-bootstrap";
import { clearCart } from "../features/cart/cartSlice.js";
const CartContainer = () => {
    const dispatch = useDispatch();

    const { cartItems, total, amount } = useSelector((store) => store.cart);

    if (amount < 1) {
        return <h2>Your cart is empty</h2>;
    }

    return (
        <div className="cart-container">
            <h1>Your Cart</h1>
            <Stack gap={3}>
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}
            </Stack>

            <h2>Total: {total}</h2>
            <h3>Amount: {amount}</h3>
            <Button variant="secondary" onClick={() => dispatch(clearCart())}>
                Clear Cart
            </Button>
            {/* <button onClick={() => dispatch(clearCart())}>clearCart</button> */}
        </div>
    );
};

export default CartContainer;
