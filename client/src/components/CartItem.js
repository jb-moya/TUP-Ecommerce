import React from "react";
import OrderQuantity from "./OrderQuantity";
import { Stack, Button } from "react-bootstrap";
import {
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    setQuantity,
    toggleCheck,
} from "../features/cart/cartSlice";
import { deleteItemFromDB } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const NoImage = () => {
    return (
        <div className="w-full h-full bg-slate-200 flex text-[#abb7c5] justify-center items-center rounded">
            Unavailable Image
        </div>
    );
};

const ItemStock = ({ stock }) => {
    const InStockStyle = "text-green-500";
    const OutOfStockStyle = "text-red-500";

    return (
        <div className={stock === 0 ? OutOfStockStyle : InStockStyle}>
            {stock === 0 ? "Out of Stock" : `${stock} In Stock`}
        </div>
    );
};

const CartItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    // // console.log("cartItem pak", cartItem, cartItem._id);

    const handleQuantityChange = (newQuantity) => {
        dispatch(setQuantity({ id: cartItem._id, quantity: newQuantity }));
    };

    const handleCheck = () => {
        dispatch(toggleCheck({ id: cartItem._id }));
    };

    return (
        <div className="grid grid-cols-12 auto-rows-min gap-2 items-center text-center leading-none mx-4">
            <div className="col-span-8 flex self-start">
                <input
                    className="w-4 h-4 mr-4 self-center"
                    onClick={handleCheck}
                    type="checkbox"
                    readOnly
                    checked={cartItem.checked}
                />
                <div className="w-32 h-32 mr-4 rounded">
                    {cartItem.productDetails.image.length !== 0 ? (
                        <img
                            className="w-full h-full object-cover rounded"
                            src={cartItem.productDetails.image[0]}
                            alt={cartItem.productDetails.name}
                        />
                    ) : (
                        <NoImage />
                    )}
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="font-medium text-lg text-left leading-tight">
                        {cartItem.name}
                    </div>

                    <div className="text-left leading-6">
                        {cartItem.productDetails.description}
                    </div>
                    <div className="text-left leading-6 text-sm">
                        {cartItem.variation
                            ? cartItem.productDetails.variation[0].name
                            : ""}
                    </div>

                    <div className="flex flex-1 items-end">
                        <button
                            className="px-[2px] py-[1px] w-max text-[#211c6a] hover:text-violet-500 border hover:border-violet-500"
                            onClick={() => {
                                dispatch(removeItem({ id: cartItem._id }));
                                dispatch(deleteItemFromDB(cartItem._id));
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-span-4 grid grid-cols-12 self-start items-baseline">
                <div className="col-span-4">
                    {cartItem.productDetails.price !== -1
                        ? cartItem.productDetails.price
                        : cartItem.productDetails.variation[0].price}
                </div>
                <div className="col-span-4">
                    <OrderQuantity
                        maximum={
                            cartItem.productDetails.stock
                                ? cartItem.productDetails.stock
                                : cartItem.productDetails.variation[0].stock
                        }
                        quantity={cartItem.quantity}
                        onQuantityChange={handleQuantityChange}
                    />
                    <div className="mt-2">
                        <ItemStock
                            stock={
                                cartItem.productDetails.stock
                                    ? cartItem.productDetails.stock
                                    : cartItem.productDetails.variation[0].stock
                            }
                        />
                    </div>
                </div>
                <div className="col-span-4">
                    {(
                        (cartItem.productDetails.price !== -1
                            ? cartItem.productDetails.price
                            : cartItem.productDetails.variation[0].price) *
                        cartItem.quantity
                    ).toFixed(2)}
                </div>
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
        </div>
    );
};

export default CartItem;
