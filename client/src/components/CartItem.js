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
        <Stack>
            <div>{name}</div>
            <div>Price: ${price}</div>
            <div>sub_name: {sub_name}</div>
            <div>quantity: {quantity}</div>
            <Button
                variant="secondary"
                onClick={() => {
                    dispatch(removeItem({ id }));
                }}
            >
                remove
            </Button>
            <Button
                variant="secondary"
                onClick={() => {
                    dispatch(increaseQuantity({ id }));
                }}
            >
                increase
            </Button>

            <Button
                variant="secondary"
                onClick={() => {
                    if (quantity === 1) {
                        dispatch(removeItem({ id }));
                        return;
                    }

                    dispatch(decreaseQuantity({ id }));
                }}
            >
                decrease
            </Button>

            {/* <OrderQuantity id={id} maximum={quantity} /> */}
            <Button variant="secondary"></Button>
        </Stack>
    );
};

export default CartItem;