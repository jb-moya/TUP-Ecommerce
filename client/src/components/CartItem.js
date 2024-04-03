import React from "react";
import OrderQuantity from "./OrderQuantity";
import { Stack, Button } from "react-bootstrap";
import {
    decreaseQuantity,
    increaseQuantity,
    removeItem,
} from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
const CartItem = ({ id, name, sub_name, price, quantity }) => {
    const dispatch = useDispatch();

    return (
        <>
            <div className="col-span-8 flex items-center">
                <input className="w-4 h-4 mr-4" type="checkbox" />
                <div>{name}</div>
            </div>
            <div className="col-span-4 grid grid-cols-12 items-center">
                <div className="col-span-4">{price}</div>
                <div className="col-span-4">
                    <OrderQuantity maximum={999} />
                </div>
                <div className="col-span-4">hehe</div>
            </div>

            <hr className="col-span-full my-2"></hr>

            {/* <div>Price: ${price}</div> */}
            {/* <div>sub_name: {sub_name}</div> */}
            {/* <div>quantity: {quantity}</div> */}
            {/* <button
                className="border border-red-500 p-1"
                onClick={() => {
                    dispatch(removeItem({ id }));
                }}
            >
                remove
            </button>
            <button
                className="border border-red-500 p-1"
                onClick={() => {
                    dispatch(increaseQuantity({ id }));
                }}
            >
                increase
            </button>

            <button
                className="border border-red-500 p-1"
                onClick={() => {
                    if (quantity === 1) {
                        dispatch(removeItem({ id }));
                        return;
                    }

                    dispatch(decreaseQuantity({ id }));
                }}
            >
                decrease
            </button> */}

            {/* <OrderQuantity id={id} maximum={quantity} /> */}
            {/* <button className="border border-red-500 p-1"></button> */}
        </>
    );
};

export default CartItem;
