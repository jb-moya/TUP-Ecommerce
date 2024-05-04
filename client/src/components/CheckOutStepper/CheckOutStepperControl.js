import React from 'react'

const CheckOutStepperControl = ({handleClick, currentStep, steps}) => {
  return (
    <div className='container flex flex-col justify-around mt-4 mb-8'>
    {/* next button */}
    <button 
     onClick={()=> handleClick("next")}
    className='mb-4 bg-[#211C6A] text-white uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer
 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out'>
        {currentStep === 1 ? "Continue to shipping" : ""}
        {currentStep === 2 ? "Continue to payment" : ""}
        {currentStep === 3 ? "Confirm" : ""}
    </button>

     {/* back button */}
     <button
    onClick={()=> handleClick()}
     className={`bg-white text-[#211C6A] uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-[#211C6A] hover:bg-[#211C6A]  hover:text-white transition duration-200 ease-in-out ${currentStep === 1 || currentStep === 2 ? "opacity-50 cursor-not-allowed" : ""}`}>
        Back
    </button>


    </div>
  )
}

export default CheckOutStepperControl