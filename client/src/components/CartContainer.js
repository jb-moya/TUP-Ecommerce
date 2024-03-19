import React, { useEffect } from "react";
import CartItem from "./CartItem";

import { useDispatch, useSelector } from "react-redux";
import { Button, Stack } from "react-bootstrap";
import {
    clearCart,
    calculateTotals,
    getAllItems,
} from "../features/cart/cartSlice.js";
import ConfirmModel from "./Modal.js";
const CartContainer = () => {
    const dispatch = useDispatch();

    const { cartItems, total, amount } = useSelector((store) => store.cart);
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        dispatch(getAllItems());
    }, []);

    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR

    useEffect(() => {
        dispatch(getAllItems());
        dispatch(calculateTotals());
    }, [cartItems]);

    if (amount < 1) {
        return <h2>Your cart is empty</h2>;
    }

    return (
        <>
            <div className="cart-container">
                <h1>Your Cart</h1>
                <Stack gap={3}>
                    {cartItems.map((item) => {
                        return <CartItem key={item.id} {...item} />;
                    })}
                </Stack>

                <h2>Total: {total}</h2>
                <h3>Amount: {amount}</h3>

                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Clear Cart
                </Button>

                <ConfirmModel
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onConfirm={() => dispatch(clearCart())}
                />
            </div>
        </>
    );
};

export default CartContainer;
