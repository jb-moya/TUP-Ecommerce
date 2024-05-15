import React, { useContext, useEffect, useState } from "react";
import { CheckOutStepperContext } from "../contexts/CheckOutStepperContext";
import GcashLogo from "../../Assets/GCASHLOGO.png";

const Payment = () => {
    const [clickedButton, setClickedButton] = useState(0);

    const buttonClicked = (index) => {
        setClickedButton(index);
    };

    const { userData, setUserData } = useContext(CheckOutStepperContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    useEffect(() => {
        setUserData((prevUserData) => ({
            ...prevUserData,
            paymentMethod: clickedButton === 0 ? "GCash" : "Cash on Delivery",
        }));
    }, [clickedButton, setUserData]);

    return (
        <div>
            <div>
                <div className="my-4">Payment Method</div>
                <ul className="flex text-20 w-full h-70 justify-center">
                    <li className="p-4">
                        <button
                            className={`text-${
                                clickedButton === 0 ? "blue" : "gray"
                            }-500 flex items-center justify-center rounded border w-[200px] h-[50px] ${
                                clickedButton === 0
                                    ? "border-[#211C6A]"
                                    : "border-gray-500"
                            }  transform ${
                                clickedButton === 0 ? "scale-110" : ""
                            }  duration-300 ease-in-out`}
                            onClick={() => buttonClicked(0)}
                        >
                            <img
                                src={GcashLogo}
                                className="h-[30px]"
                                alt="Logo Here"
                                loading="lazy"
                            />
                        </button>
                    </li>
                    <li className="p-4">
                        <button
                            className={`text-${
                                clickedButton === 1 ? "blue" : "gray"
                            }-500 border rounded w-[200px] h-[50px] ${
                                clickedButton === 1
                                    ? "border-[#211C6A]"
                                    : "border-gray-500"
                            } transform ${
                                clickedButton === 1 ? "scale-110" : ""
                            }  duration-300 ease-in-out`}
                            onClick={() => buttonClicked(1)}
                        >
                            Cash on Delivery
                        </button>
                    </li>
                </ul>
                <hr className="border-[#211C6A]"></hr>

                <div className="flex mt-4">
                    {clickedButton === 0 && (
                        <div className="w-full">
                            <div className="w-full mr-2">
                                <div className="bg-white my-2 p-1 flex border border-[#211C6A] rounded">
                                    <input
                                        onChange={handleChange}
                                        value={userData["eWalletName"] || ""}
                                        name="eWalletName"
                                        placeholder="Gcash Name"
                                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                    />
                                </div>
                                <div className="w-full mr-2">
                                    <div className="bg-white my-2 p-1 flex border border-[#211C6A] rounded">
                                        <input
                                            onChange={handleChange}
                                            value={
                                                userData["eWalletNumber"] || ""
                                            }
                                            name="eWalletNumber"
                                            placeholder="GCash Number"
                                            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {clickedButton === 1 && (
                        <div className="font-semibold p-4">
                            Delivery Method: Cash on Delivery
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Payment;
