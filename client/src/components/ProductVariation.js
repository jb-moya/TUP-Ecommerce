import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";

import { Stack } from "react-bootstrap";

const ToggleButtonsComponent = ({ id, options }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <Stack className="order-quantity-stack" direction="horizontal">
            <div className="variation-class">fasdfsadjkl</div>
            <ButtonGroup className={`variation-radio-buttons ${id}`} toggle="true">
                {options.map((option, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${id}-${idx}`} // Use a unique ID for each radio button
                        type="radio"
                        variant="outline-primary"
                        name={`options-${id}`} // Use a unique name for the radio group
                        value={option.value}
                        checked={selectedOption === option.value}
                        onChange={() => handleOptionChange(option.value)}
                    >
                        {option.label}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </Stack>
    );
};

export default ToggleButtonsComponent;
