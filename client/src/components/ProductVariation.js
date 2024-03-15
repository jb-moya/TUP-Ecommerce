import React, { useState } from "react";
import { Button, ButtonGroup, ToggleButton } from "react-bootstrap";

const ProductVariation = () => {
    const [checked, setChecked] = useState(false);
    const [radioValue, setRadioValue] = useState("1");

    const radios = [
        { name: "Active", value: "1" },
        { name: "Radio", value: "2" },
        { name: "Radio", value: "3" },
    ];

    return (
        <>
            <div className="w-600 s-16">Color: </div>
            <ButtonGroup className={`variation-radio-buttons`}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant={"outline-primary"}
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </>
    );
};

export default ProductVariation;
