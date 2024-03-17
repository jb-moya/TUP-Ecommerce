import React, { useState } from "react";

import { Stack, Button, Form } from "react-bootstrap";
import { FaMinus, FaPlus } from "react-icons/fa";

const OrderQuantity = ({ id = null, maximum }) => {
    const [quantity, setQuantity] = useState(1);

    const handleMinus = () => {
        if (quantity === 1) return;

        setQuantity(quantity - 1);
    };

    const handlePlus = () => {
        if (quantity === maximum) return;

        setQuantity(quantity + 1);
    };

    return (
        <Stack className="order-quantity-stack" direction="horizontal" gap={4}>
            <div className="font">Quantity: </div>
            <Stack direction="horizontal">
                <Button
                    className="minus-button"
                    variant="outline-secondary"
                    onClick={handleMinus}
                >
                    <FaMinus />
                </Button>

                <Form.Control
                    value={quantity}
                    className="quantity-input"
                    placeholder="0"
                    aria-label="0"
                    onChange={(e) => {
                        if (e.target.value <= maximum) {
                            setQuantity(e.target.value);
                        }
                    }}
                    // aria-describedby="basic-addon1"
                />

                <Button
                    className="plus-button"
                    variant="outline-secondary"
                    onClick={handlePlus}
                >
                    <FaPlus />
                </Button>
            </Stack>
            <div className="poppins">{maximum} stocks available</div>
        </Stack>
    );
};

export default OrderQuantity;
