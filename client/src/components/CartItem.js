import React from "react";
import OrderQuantity from "./OrderQuantity";
import { Stack, Button } from "react-bootstrap";
import {
    decreaseQuantity,
    increaseQuantity,
    removeItem,
    setQuantity,
} from "../features/cart/cartSlice";
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

const CartItem = ({ id, name, sub_name, price, quantity, checked, image = null }) => {
    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity) => {
        dispatch(setQuantity({ id, quantity: newQuantity }));
    };

    const handleCheck = () => {
        dispatch(setQuantity({ id, checked: !checked }));
    };

    return (
        <div className="grid grid-cols-12 auto-rows-min gap-2 items-center text-center leading-none mx-4">
            <div className="col-span-8 flex self-start">
                <input className="w-4 h-4 mr-4 self-center" type="checkbox" checked={checked}/>
                <div className="w-32 h-32 mr-4 rounded">
                    {image ? (
                        <img
                            className="w-full h-full object-cover"
                            src={image}
                            alt={name}
                        />
                    ) : (
                        <NoImage />
                    )}
                </div>
                <div className="flex flex-1 flex-col">
                    <div className="font-medium text-lg text-left leading-tight">
                        {name} Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Distinctio, ut. Neque, tempora! Amet
                        ex ea voluptates sapiente nobis molestias laudantium?
                    </div>

                    <div className="text-left leading-6">{name} as;l j kj</div>

                    <div className="flex flex-1 items-end">
                        <button
                            className="px-[2px] py-[1px] w-max text-[#211c6a] hover:text-violet-500 border hover:border-violet-500"
                            onClick={() => {
                                dispatch(removeItem({ id }));
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-span-4 grid grid-cols-12 self-start items-baseline">
                <div className="col-span-4">{price}</div>
                <div className="col-span-4">
                    <OrderQuantity
                        maximum={999}
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                    />
                    <div className="mt-2">
                        <ItemStock stock={1} />
                    </div>
                </div>
                <div className="col-span-4">{price * quantity}</div>
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
