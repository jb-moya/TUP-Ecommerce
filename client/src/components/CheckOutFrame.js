import React, { useState, useEffect } from 'react';
import CheckOutStepper from './CheckOutStepper/CheckOutStepper';
import CheckOutStepperControl from './CheckOutStepper/CheckOutStepperControl';
import Address from './CheckOutSteps/Address';
import Payment from './CheckOutSteps/Payment';
import Shipping from './CheckOutSteps/Shipping';
import Final from './CheckOutSteps/Final';
import { CheckOutStepperContext } from './contexts/CheckOutStepperContext';

export const CheckOutFrame = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [userData, setUserData] = useState('');
    const [finalData, setFinalData] = useState([]);
    const steps = [
        "Address",
        "Shipping",
        "Payment",
        "Complete"
    ]

    const displaySteps = (step) => {
        switch (step) {
            case 1:
                return <Address />
            case 2:
                return <Shipping />
            case 3:
                return <Payment />
            case 4:
                return <Final />
            default:
        }

    }

    const handleClick = (direction) => {
        let newStep = currentStep;

        direction === "next" ? newStep++ : newStep--;
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    function imgUrl() {
        const id = rand(1, 200);
        // console.log(id);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const [valueShipping, setValueShipping] = useState(1) 

    useEffect(() => {
        if (currentStep === 3) {
          setValueShipping("₱89");
        } else {
          setValueShipping("Calculate at the next step");
        }
      }, [currentStep]);

   
    return (
        <div className='flex flex-col text-[#211C6A] items-center justify-center pt-[96px]'>
            <div className='flex w-full justify-between p-4 max-w-[1240px] mx-auto select-none z-1 mt-10'>
                {/* Left Side */}
                <div className='flex flex-col w-[500px]'>
                    <h1 className='text-3xl font-bold '>Check Out</h1>
                    <div className='container horizontal mt-5'>
                        {/* Stepper */}
                        <CheckOutStepper
                            steps={steps}
                            currentStep={currentStep} />


                        {/* Display Components */}
                        <div className="my-8">
                            <CheckOutStepperContext.Provider value={{
                                userData,
                                setUserData,
                                finalData,
                                setFinalData,
                            }}>
                                {displaySteps(currentStep)}
                            </CheckOutStepperContext.Provider>
                        </div>
                    </div>

                    {/* Navigation Control */}
                    {currentStep !== steps.length &&
                        <CheckOutStepperControl
                            handleClick={handleClick}
                            currentStep={currentStep}
                            steps={steps}

                        />
                    }

                </div>


                {/* Cart */}
                <div className='flex flex-col mt-4 w-[500px] p-4'>
                    <div className='text-lg mb-4'>
                        Your Cart
                    </div>
                    <div>
                        <div className="flex">
                            <img
                                className="w-[150px] h-[150px]"
                                src={imgUrl()}
                                alt="Logo Here"
                                loading="lazy"
                            />
                            <div className="m-4 flex flex-col justify-between w-full">
                                <h2 className='font-semibold'>GrayBots Men's TShirt</h2>
                                <p className='text-sm'>Size: L </p>
                                <p className='text-sm'>Quantity 1: </p>
                                {/* Add more option if needed */}
                                <h1 className='font-semibold text-xl'>₱150</h1>
                            </div>
                            <button className='text-gray-400 text-xs flex flex-col justify-end p-4 hover:text-black underline' >
                                Remove
                            </button>
                        </div>
                        <hr className="border-[#211C6A] my-4"></hr>

                        <div className="flex">
                            <img
                                className="w-[150px] h-[150px]"
                                src={imgUrl()}
                                alt="Logo Here"
                                loading="lazy"
                            />
                            <div className="m-4 flex flex-col justify-between w-full">
                                <h2 className='font-semibold'>GrayBots Men's TShirt</h2>
                                <p className='text-sm'>Size: L </p>
                                <p className='text-sm'>Quantity 1: </p>
                                {/* Add more option if needed */}
                                <h1 className='font-semibold text-xl'>₱150</h1>
                            </div>
                            <button className='text-gray-400 text-xs flex flex-col justify-end p-4 hover:text-black underline' >
                                Remove
                            </button>
                        </div>
                        <hr className="border-[#211C6A] my-4"></hr>
                    </div>
                    <div className='flex flex-col'>
                        <div className='flex w-full justify-between'>
                            <p>Subtotal:</p>
                            <p>₱300</p>
                        </div>
                        <div className='flex w-full justify-between'>
                            <p>Shipping:</p>
                            <p>{valueShipping}</p>
                        </div>
                        <hr className="border-[#211C6A] my-4"></hr>
                        <div className='flex w-full justify-between'>
                            <p>Total:</p>
                            <p>₱389</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}