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
    getAllItems,
    getStateCart,
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
    const [userData, setUserData] = useState("");
    const [finalData, setFinalData] = useState([]);
    const [valueShipping, setValueShipping] = useState(0);
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

    //      fName: 'a', lName: 'b', address: 'c', city: 'd', country: 'USA', …}
    //      address :  "c"
    //      city :  "d"
    //      country :  "USA"
    //      zipcode :  "11"
    //      eWalletName :  "11"
    //      eWalletNumber :  "11"
    //      fName :  "a"
    //      lName :  "b"
    //      shippingMethod :  "Door-to-Door Delivery"
 
    //      address: "1";
    //      city: "1";
    //      country: "USA";
    //      zipcode: "1";
    //      fName: "1";
    //      lName: "1";
    //      shippingMethod: "Self-PickUp";

    function imgUrl() {
        const id = rand(1, 200);
        // // console.log(id);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
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
        if (currentStep === 3) {
            setValueShipping(89);
        } else {
            setValueShipping(0);
        }

        if (currentStep === 4) {
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
