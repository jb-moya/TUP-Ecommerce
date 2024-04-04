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
        // dispatch(getAllItems());
    }, []);

    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR
    // JOBSTER IS THE ANSWERRRRRRRRRRRRRRRRRRRRR

    useEffect(() => {
        // dispatch(getAllItems());
        dispatch(calculateTotals());
    }, [cartItems]);

    if (amount < 1) {
        return (
            <div className="flex items-center justify-center h-[600px]">
                <div className="">Your cart is empty</div>
            </div>
        );
    }

    return (
        <>
            <div className="w-full mx-4 grid grid-cols-12 gap-2 items-center text-center leading-none">
                <div className="col-span-full font-semibold text-xl text-[#211c6a] text-left">
                    <div>Shopping Cart</div>
                </div>
                <div className="col-span-8 flex items-center text-gray-500">
                    <div className="pl-8">Products</div>
                </div>
                <div className="col-span-4 grid grid-cols-12 text-gray-500">
                    <div className="col-span-4">Unit Price</div>
                    <div className="col-span-4">Quantity</div>
                    <div className="col-span-4 ">Total Price</div>
                </div>
            </div>

            <hr className="col-span-full my-2"></hr>

            <div className="min-h-[650px]">
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}
            </div>

            {/* <h2>Total: {total}</h2>
                <h3>Amount: {amount}</h3> */}

            {/* <button onClick={() => setModalShow(true)}>Clear Cart</button> */}

            {/* <ConfirmModel
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onConfirm={() => dispatch(clearCart())}
                /> */}
        </>
    );
};

export default CartContainer;
