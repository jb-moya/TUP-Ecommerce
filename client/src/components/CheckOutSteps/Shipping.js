import React, { useContext } from "react";
import { CheckOutStepperContext } from "../contexts/CheckOutStepperContext";

const Shipping = () => {
    const { userData, setUserData } = useContext(CheckOutStepperContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    return (
        <div>
            <div className="bg-white my-2 p-1 flex border border-[#211C6A] rounded-lg relative">
                <h1 className="text-gray-300 font-extralight text-center">Shipping Method</h1>
                <select
                    onChange={handleChange}
                    value={userData["shippingMethod"] || ""}
                    name="shippingMethod"
                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800 bg-transparent "
                    required
                >
                    <option value="Door-to-Door Delivery">
                        Door-to-Door Delivery
                    </option>
                    <option value="Self-PickUp">Self-Pickup</option>
                    {/* Add more options as needed */}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                        className="w-4 h-4 fill-current text-gray-600"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 12l-4-4h8l-4 4z" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
