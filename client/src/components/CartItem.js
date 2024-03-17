import React from "react";
import OrderQuantity from "./OrderQuantity";
import { Stack, Button } from "react-bootstrap";

import { useDispatch } from "react-redux";
const CartItem = ({ id, name, sub_name, price, quantity }) => {
    // const dispatch = useDispatch();

    return (
        <Stack>
            <div>{name}</div>
            <div>Price: ${price}</div>
            <div>sub_name: {sub_name}</div>
            <div>quantity: {quantity}</div>
            <Button variant="secondary">delete</Button>
            <OrderQuantity id={id} maximum={quantity} />
            <Button variant="secondary"></Button>
        </Stack>
    );
};

export default CartItem;
