import React, { useState, useEffect } from "react";
import CheckOutStepper from "./CheckOutStepper/CheckOutStepper";
import CheckOutStepperControl from "./CheckOutStepper/CheckOutStepperControl";
import Address from "./CheckOutSteps/Address";
import Payment from "./CheckOutSteps/Payment";
import Shipping from "./CheckOutSteps/Shipping";
import Final from "./CheckOutSteps/Final";
import { CheckOutStepperContext } from "./contexts/CheckOutStepperContext";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
    clearCart,
    calculateTotals,
    deleteCart,
    deleteItemFromDB,
    clearCheckedItems,
} from "../features/cart/cartSlice.js";
import logoUnsaturated from "../Assets/LogoUnSaturated.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
axios.defaults.withCredentials = true;

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
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const { cartItems, total, amount } = useSelector((store) => store.cart);

    const [userData, setUserData] = useState({
        address: "",
        fName: "",
        lName: "",
        paymentMethod: "",
        shippingMethod: "",
    });

    const [finalData, setFinalData] = useState([]);
    const [valueShipping, setValueShipping] = useState(0);
    // const steps = ["Shipping", "Address", "Payment", "Complete"];
    const steps = ["Shipping", "Payment", "Complete"];

    const displaySteps = (step) => {
        switch (step) {
            case 1:
                return <Shipping />;
            case 2:
                return <Payment />;
            case 3:
                return <Final />;
            default:
        }
    };

    const handleClick = (direction) => {
        let newStep = currentStep;

        if (direction === "return home") {
            navigate("/");
            return;
        }

        direction === "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    };

    function shippingAddressFilled() {
        return (
            userData.fName &&
            userData.lName &&
            userData.address
        );
    }

    function shippingMethodFilled() {
        return userData.shippingMethod;
    }

    function paymentMethodFilled() {
        // if (userData.paymentMethod === "GCash") {
        //     return userData.eWalletName && userData.eWalletNumber;
        // } else {
        //     return true;
        // }
        return true;
    }

    const makeTransaction = async () => {
        try {
            const record = cartItems
                .filter((item) => item.checked)
                .map((item) => {
                    console.log("ITEMF", item);
                    return {
                        product: item.product,
                        variation:
                            item.productDetails.variation.length !== 0
                                ? item.productDetails.variation[0]._id
                                : null,
                        // shippingMethod: userData.shippingMethod,
                        quantity: item.quantity,
                        totalAmount:
                            item.productDetails.price !== -1
                                ? item.productDetails.price * item.quantity
                                : item.productDetails.variation[0].price *
                                  item.quantity,
                        shippingAddress: `${userData.address}, ${userData.city}, ${userData.country}, ${userData.zipcode}`,
                        shippingMethod: userData.shippingMethod,
                        paymentMethod: userData.paymentMethod,
                    };
                });

            console.log("RECORD", record);

            const response = await axios.post(
                `http://localhost:5000/api/v1/transactions`,
                {
                    cartItems: record,
                }
            );
            console.log("HAHA", response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("currentStep", currentStep);

        if (currentStep === 2) {
            setValueShipping(89);
        } else {
            setValueShipping(0);
        }

        if (currentStep === 3) {
            toast.success("Transaction Successful");
            console.log("cartItems cartItems", cartItems);

            makeTransaction();

            if (cartItems.every((item) => item.checked)) {
                dispatch(clearCart());
                dispatch(deleteCart());
            } else {
                cartItems.forEach((item) => {
                    if (item.checked) {
                        dispatch(deleteItemFromDB(item._id));
                    }
                });
            }

            // update product details in the database. Soon....

            dispatch(clearCheckedItems());
            dispatch(calculateTotals());
            navigate("/");
        }
    }, [currentStep]);

    return (
        <div className="flex flex-col text-[#211C6A] items-center justify-center pt-[96px]">
            <div className="flex w-full justify-between p-4 max-w-[1240px] mx-auto select-none z-1 mt-10">
                <div className="flex flex-col w-[500px]">
                    <h1 className="text-3xl font-bold ">Check Out</h1>
                    <div className="container horizontal mt-5">
                        <CheckOutStepper
                            steps={steps}
                            currentStep={currentStep}
                        />

                        <div className="my-5">
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

                    {currentStep !== steps.length && (
                        <CheckOutStepperControl
                            canProceed={
                                currentStep === 1
                                    ? shippingMethodFilled() && shippingAddressFilled()
                                    : currentStep === 2
                                    ? paymentMethodFilled()
                                    : true
                            }
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}
                        />
                    )}
                </div>

                <div className="flex flex-col mt-4 w-[500px] p-4">
                    <div className="text-lg mb-4">Your Cart</div>
                    <div>
                        {cartItems
                            .filter((item) => item.checked)
                            .map((item) => (
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
                            <p>
                                ₱
                                {valueShipping !== 0
                                    ? total + valueShipping
                                    : total}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
