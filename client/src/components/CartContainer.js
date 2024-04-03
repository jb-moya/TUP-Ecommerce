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

    useEffect(() => {
        dispatch(getAllItems());
        dispatch(calculateTotals());
    }, [cartItems]);

    if (amount < 1) {
        return <h2>Your cart is empty</h2>;
    }

    return (
        <>
            <div className="w-full mx-4 grid grid-cols-12 gap-2 items-center text-center leading-none">
                {/* <div className=""> */}
                <div className="col-span-8 flex items-center text-gray-500">
                    <input className="w-4 h-4 mr-4" type="checkbox" />
                    <div>laptop</div>
                </div>
                <div className="col-span-4 grid grid-cols-12 text-gray-500">
                    <div className="col-span-4">Unit Price</div>
                    <div className="col-span-4">Quantity</div>
                    <div className="col-span-4 ">Total Price</div>
                </div>

                <hr className="col-span-full my-2"></hr>

                {/* </div> */}
                {cartItems.map((item) => {
                    return <CartItem key={item.id} {...item} />;
                })}

                {/* <h2>Total: {total}</h2>
                <h3>Amount: {amount}</h3> */}

                {/* <button onClick={() => setModalShow(true)}>Clear Cart</button> */}

                {/* <ConfirmModel
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    onConfirm={() => dispatch(clearCart())}
                /> */}
            </div>
        </>
    );
};

export default CartContainer;
