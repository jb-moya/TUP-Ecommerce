import React from "react";
import { Tooltip } from "react-tooltip";

const CheckOutStepperControl = ({
    canProceed,
    handleClick,
    currentStep,
    steps,
}) => {
    return (
        <div className="container flex flex-col justify-around mt-4 mb-8">
            {/* next button */}
            <Tooltip
                id="my-tooltip"
                style={{
                    backgroundColor: "#211c6a",
                    color: "#fff",
                    borderRadius: "8px",
                }}
            />
            <button
                data-tooltip-id="my-tooltip"
                data-tooltip-content={
                    canProceed ? "" : "Please fill in the required fields first"
                }
                data-tooltip-place="top"
                disabled={!canProceed}
                onClick={() => handleClick("next")}
                className={`mb-4 bg-[#211C6A] text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer
 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
     canProceed ? "" : "opacity-50"
 }`}
                style={{
                    backgroundColor: canProceed ? "#211C6A" : "#ccc",
                    color: canProceed ? "#fff" : "#000",
                    cursor: canProceed ? "pointer" : "not-allowed",
                }}
            >
                {currentStep === 1 ? "Continue to payment" : ""}
                {currentStep === 2 ? "Confirm" : ""}
                {/* {currentStep === 3 ? "Confirm" : ""} */}
            </button>

            {/* back button */}
            <button
                onClick={() => {
                    if (currentStep === 1) {
                        handleClick("return home");
                    } else {
                        handleClick();
                    }
                }}
                className={`bg-white text-[#211C6A] uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-[#211C6A] hover:bg-[#211C6A]  hover:text-white transition duration-200 ease-in-out`}
            >
                Back
            </button>
        </div>
    );
};

export default CheckOutStepperControl;
