import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { Stack } from "react-bootstrap";

const ToggleButtonsComponent = ({ id, options, variationClass }) => {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionChange = (value) => {
        setSelectedOption(value);
    };

    return (
        <div className="w-full flex mt-4">
            <div className="w-3/12 pl-8 pr-4 text-sm break-normal self-center font-medium text-[#211c6a]">
                {variationClass}
            </div>
            <form className="w-9/12 flex flex-wrap pr-8">
                {options.map((option, idx) => (
                    <div
                        className={`${
                            selectedOption === option.value
                                ? "bg-[#59b5c3] text-white"
                                : "text-gray-600"
                        } mb-2 rounded mr-2 h-min py-1 border-[#59b4c3]  border-2 hover:border-violet-500  hover:text-violet-500`}
                    >
                        <label key={idx} className="p-3 cursor-pointer">
                            <input
                                type="radio"
                                name="option"
                                className={`hidden whitespace-nowrap `}
                                value={option.value}
                                checked={selectedOption === option.value}
                                onChange={() =>
                                    handleOptionChange(option.value)
                                }
                            />
                            {option.label}
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default ToggleButtonsComponent;
