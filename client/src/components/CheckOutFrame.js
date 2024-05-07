import React, { useState, useEffect } from "react";
import CheckOutStepper from "./CheckOutStepper/CheckOutStepper";
import CheckOutStepperControl from "./CheckOutStepper/CheckOutStepperControl";
import Address from "./CheckOutSteps/Address";
import Payment from "./CheckOutSteps/Payment";
import Shipping from "./CheckOutSteps/Shipping";
import Final from "./CheckOutSteps/Final";
import { CheckOutStepperContext } from "./contexts/CheckOutStepperContext";
import { useDispatch, useSelector } from "react-redux";
import {
    clearCart,
    calculateTotals,
    getAllItems,
    getStateCart,
} from "../features/cart/cartSlice.js";
import logoUnsaturated from "../Assets/LogoUnSaturated.png";

const cartItemComponent = ({ cartItem }) => {
    return (
        <>
            <div className="flex">
                <img
                    className="w-[150px] h-[150px] object-cover"
                    src={
                        cartItem.productDetails.image.length !== 0
                            ? cartItem.productDetails.image[0]
                            : logoUnsaturated
                    }
                    alt="Logo Here"
                    loading="lazy"
                />
                <div className="m-4 flex flex-col justify-between w-full">
                    <h2 className="font-semibold">
                        {cartItem.productDetails.name}
                    </h2>
                    <p className="text-sm">
                        {cartItem.variation
                            ? cartItem.productDetails.variation[0].name
                            : ""}
                    </p>
                    <p className="text-sm">Quantity: {cartItem.quantity}</p>
                    {/* Add more option if needed */}
                    <h1 className="font-semibold text-xl">
                        ₱
                        {(
                            (cartItem.productDetails.price !== -1
                                ? cartItem.productDetails.price
                                : cartItem.productDetails.variation[0].price) *
                            cartItem.quantity
                        ).toFixed(2)}
                    </h1>
                </div>
                {/* <button className="text-gray-400 text-xs flex flex-col justify-end p-4 hover:text-black underline">
                Remove
            </button> */}
            </div>
            <hr className="border-[#211C6A] my-4"></hr>
        </>
    );
};

export const CheckOutFrame = () => {
    const dispatch = useDispatch();
    const [currentStep, setCurrentStep] = useState(1);
    const { cartItems, total, amount } = useSelector((store) => store.cart);
    const [userData, setUserData] = useState("");
    const [finalData, setFinalData] = useState([]);
    const steps = ["Address", "Shipping", "Payment", "Complete"];

    const displaySteps = (step) => {
        switch (step) {
            case 1:
                return <Address />;
            case 2:
                return <Shipping />;
            case 3:
                return <Payment />;
            case 4:
                return <Final />;
            default:
        }
    };

    const handleClick = (direction) => {
        let newStep = currentStep;

        direction === "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    function imgUrl() {
        const id = rand(1, 200);
        // console.log(id);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const [valueShipping, setValueShipping] = useState(0);

    useEffect(() => {
        if (currentStep === 3) {
            setValueShipping(89);
        } else {
            setValueShipping(0);
        }
    }, [currentStep]);

    return (
        <div className="flex flex-col text-[#211C6A] items-center justify-center pt-[96px]">
            <div className="flex w-full justify-between p-4 max-w-[1240px] mx-auto select-none z-1 mt-10">
                {/* Left Side */}
                <div className="flex flex-col w-[500px]">
                    <h1 className="text-3xl font-bold ">Check Out</h1>
                    <div className="container horizontal mt-5">
                        {/* Stepper */}
                        <CheckOutStepper
                            steps={steps}
                            currentStep={currentStep}
                        />

                        {/* Display Components */}
                        <div className="my-8">
                            <CheckOutStepperContext.Provider
                                value={{
                                    userData,
                                    setUserData,
                                    finalData,
                                    setFinalData,
                                }}
                            >
                                {displaySteps(currentStep)}
                            </CheckOutStepperContext.Provider>
                        </div>
                    </div>

                    {/* Navigation Control */}
                    {currentStep !== steps.length && (
                        <CheckOutStepperControl
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                    )}
                </div>

                {/* Cart */}
                <div className="flex flex-col mt-4 w-[500px] p-4">
                    <div className="text-lg mb-4">Your Cart</div>
                    <div>
                        {cartItems.map((item) => (
                            <div key={item._id}>
                                {cartItemComponent({ cartItem: item })}
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col">
                        <div className="flex w-full justify-between">
                            <p>Subtotal:</p>
                            <p>₱ {total}</p>
                        </div>
                        <div className="flex w-full justify-between">
                            <p>Shipping:</p>
                            <p>
                                {valueShipping !== 0
                                    ? "₱ " + valueShipping
                                    : "Calculate at the next step"}
                            </p>
                        </div>
                        <hr className="border-[#211C6A] my-4"></hr>
                        <div className="flex w-full justify-between">
                            <p>Total:</p>
                            <p>₱ 
                                {valueShipping !== 0 ? total + valueShipping : total}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
