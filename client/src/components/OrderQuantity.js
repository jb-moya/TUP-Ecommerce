import React, { useState } from "react";

import { Stack, Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

const OrderQuantity = ({ id = null, quantity, maximum, onQuantityChange }) => {
    if (id === null) {
        // throw new Error("id is required");
    }

    const handleMinus = () => {
        if (quantity === 1) return;

        onQuantityChange(quantity - 1);
    };


    const handlePlus = () => {
        if (quantity === maximum) return;

        onQuantityChange(quantity + 1);
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        const parsedValue = parseInt(value);

        if (parsedValue < 1) {
            onQuantityChange(1);
        } else if (parsedValue > maximum) {
            onQuantityChange(maximum);
        } else {
            onQuantityChange(parsedValue);
        }
    };

    return (
        <div className="w-full flex justify-center">
            <div className="flex">
                <button
                    className="border border-gray-400 p-2"
                    onClick={handleMinus}
                >
                    <FaMinus size={10} />
                </button>

                <input
                    value={quantity}
                    className="w-12 h-full text-center border border-l-0 border-r-0 border-gray-400"
                    placeholder="0"
                    aria-label="0"
                    onChange={handleQuantityChange}
                    aria-describedby="basic-addon1"
                />

                <button
                    className="border border-gray-400 p-2"
                    onClick={handlePlus}
                >
                    <FaPlus size={10} />
                </button>
            </div>
        </div>
    );
};

export default OrderQuantity;
