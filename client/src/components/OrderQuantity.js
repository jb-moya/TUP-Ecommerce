import React, { useState } from "react";

import { Stack, Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";
import { useDispatch } from "react-redux";

const OrderQuantity = ({ id = null, maximum }) => {
    if (id === null) {
        // throw new Error("id is required");
    }

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleMinus = () => {
        if (quantity === 1) return;

        setQuantity(quantity - 1);
    };

    const handlePlus = () => {
        if (quantity === maximum) return;

        setQuantity(quantity + 1);
    };

    const handleQuantityChange = (e) => {
        const value = e.target.value;
        const parsedValue = parseInt(value);

        if (parsedValue < 1) {
            setQuantity(1);
        } else if (parsedValue > maximum) {
            setQuantity(maximum);
        } else {
            setQuantity(parsedValue);
        }
    };

    return (
        <div className="w-full flex mt-2">
            <div className="w-3/12 pl-8 text-sm break-normal font-medium text-[#211c6a]">
                Quantity:{" "}
            </div>
            <div className="flex pr-2">
                <button
                    className="border border-gray-400 p-2"
                    onClick={handleMinus}
                >
                    <FaMinus size={10} />
                </button>

                <input
                    value={quantity}
                    class="w-12 h-full text-center border border-l-0 border-r-0 border-gray-400"
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
            <div className="leading-none flex items-center">
                <div className="">{maximum} stock available</div>
            </div>
        </div>
    );
};

export default OrderQuantity;
