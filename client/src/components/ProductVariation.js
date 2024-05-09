import React, { useState } from "react";
import { ButtonGroup, ToggleButton } from "react-bootstrap";
import { Stack } from "react-bootstrap";

const ToggleButtonsComponent = ({
    id,
    options,
    handleVariationPick,
    variationClass,
    setSelectedVariation,
}) => {
    const [selectedOption, setSelectedOption] = useState(options[0]._id);

    const handleOptionChange = (option, optionID) => {
        setSelectedOption(optionID);
        setSelectedVariation(option);
        handleVariationPick(optionID);
    };

    // // console.log("options", options);
    // // console.log("options", options[0].name);

    return (
        <div className="w-full flex mt-4">
            <div className="w-3/12 pl-8 pr-4 text-sm break-normal line-clamp-1 self-center font-medium text-[#211c6a]">
                {variationClass ? variationClass : "Variation"}
            </div>
            <form className="w-9/12 flex flex-wrap pr-8">
                {options.map((option, idx) => (
                    <div
                        key={idx}
                        className={`${
                            selectedOption === option._id
                                ? "bg-[#59b5c3] text-white"
                                : "text-gray-600"
                        } mb-2 rounded mr-2 h-min py-1 border-[#59b4c3]  border-2 hover:border-violet-500  hover:text-violet-500`}
                    >
                        <label key={idx} className="p-3 w-14 cursor-pointer">
                            <input
                                type="radio"
                                name="option"
                                className={`hidden whitespace-nowrap`}
                                value={option._id.toString()}
                                checked={selectedOption === option._id}
                                onChange={() =>
                                    handleOptionChange(option, option._id)
                                }
                            />
                            {option.name}
                        </label>
                    </div>
                ))}
            </form>
        </div>
    );
};

export default ToggleButtonsComponent;
