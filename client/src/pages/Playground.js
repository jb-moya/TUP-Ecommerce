import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import debounce from "../components/utils/debounce.js";

const handleMinMaxInput = (e, setInputValue, defaultMin = 0) => {
    e.preventDefault();
    
    const { name, value } = e.target;
    
    let newValue = defaultMin;
    if (!isNaN(parseInt(value))) {
        newValue = parseInt(value);
    }
    
    if (newValue < defaultMin) {
        newValue = defaultMin;
    }
    
    // setInputValue([defaultMin, defaultMin]);

    if (name === "min") {
        setInputValue([newValue, defaultMin]);
    } else if (name === "max") {
        setInputValue([defaultMin, newValue]);
    }

    // setInputValue((prevState) => {
    //     if (name === "min") {
    //         return [newValue, prevState[1]];
    //     } else if (name === "max") {
    //         return [prevState[0], newValue];
    //     }
    // });
};

const RangeInput = ({ label, min = 0, handleOnChange, bla }) => {
    return (
        <div className="text-sm flex items-center mt-4">
            <div>{label}</div>
            <input
                className="rounded-md border border-[#211C6A] px-2 py-1 mx-2 w-16 text-gray-500 appearance-none outline-none bg-transparent"
                placeholder="Input"
                type="number"
                min={min}
                onChange={handleOnChange}
            />
            ~
            <input
                className="rounded-md border border-[#211C6A] px-2 py-1 mx-2 w-16 text-gray-500 appearance-none outline-none bg-transparent"
                placeholder="Input"
                type="number"
                min={min}
                onChange={handleOnChange}
            />
        </div>
    );
};

const Playground = () => {
    const [minMaxPrice, setMinMaxPrice] = useState([0, 0]);

    const numericFilters = useMemo(() => {
        const numericFiltersArray = [];

        console.log("minMaxPrice :--", minMaxPrice);

        if (minMaxPrice && minMaxPrice[0] > 0) {
            numericFiltersArray.push(`price>=${minMaxPrice[0]}`);
        }
        if (minMaxPrice && minMaxPrice[1] > 0) {
            numericFiltersArray.push(`price<=${minMaxPrice[1]}`);
        }

        return numericFiltersArray.join(",");
    }, [minMaxPrice]); // Include minMaxPrice directly in the dependency array

    const deplaySetMinMaxPrice = debounce((e) => {
        handleMinMaxInput(e, setMinMaxPrice, 0);
    }, 500);

    useEffect(() => {
        toast.info(`minMaxPrice changed ${minMaxPrice}`);
        console.log("minMaxPrice DITO", minMaxPrice);
    }, [minMaxPrice]);

    return (
        <div className="flex mx-auto select-none items-center ">
            <RangeInput label="Price" handleOnChange={deplaySetMinMaxPrice} />
        </div>
    );
};

export default Playground;
