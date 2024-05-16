import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Stepper from './SellerRegistrationStepper/Stepper';
import StepperControl from './SellerRegistrationStepper/StepperControl';
import { StepperContext } from './contexts/StepperContext';
import { ShopInformation } from './SellerRegistrationSteps/ShopInformation';
import { Details } from './SellerRegistrationSteps/Details';
import { Final } from './SellerRegistrationSteps/Final';

export const SellerRegistrationFrame = () => {

    const [step1, setStep1] = useState(0); // 0 for SellerRegistrationFrame, 1 for SellerRegistrationFrame1
    const handleNextStep = () => {
        setStep1(1); // Set step to 1 to render SellerRegistrationFrame1
    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    if (step1 === 0) {
        return (
            <div className='flex flex-col text-[#211C6A] items-center justify-center pt-[96px]'>
                <div className='flex w-full h-screen max-w-[1240px] mx-auto select-none z-1'>
                    <div className='flex flex-col shadow-md bg-white w-full h-[500px] rounded-md items-center'>
                        <img className="w-[250px] h-[250px] p-4 bg-cover rounded-full" src={imgUrl()} alt="" />
                        <h1 className='font-bold m-4 text-[20px]'>
                            Welcome to the Seller Registration Process!
                        </h1>
                        <p className='m-2 text-[15px] w-[400px] text-center'>Begin your journey as a seller by registering with the essential details needed to get started.</p>
                        <div className='flex items-center justify-center m-4 select-none'>
                            <button onClick={handleNextStep} className='border rounded-lg border-[#211C6A] text-[#211C6A] hover:bg-[#e8e8e8] text-[12px] font-semibold p-[10px] w-[150px]'>
                                Start Registration
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        // Render SellerRegistrationFrame1 when step is 1
        return <SellerRegistrationFrame1 />;
    }
};

export const SellerRegistrationFrame1 = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const [userData, setUserData] = useState({
        role: 'seller',
    });
    const [finalData, setFinalData] = useState([]);

    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const steps = [
        "Shop Information",
        "Business Information",
        "Complete"
    ]

    // useEffect(() => {
    //     setUserData((prevUserData) => ({
    //         ...prevUserData,
    //         role: 'seller',
    //     }));
    // }, []);

    const displaySteps = (step) => {
        switch(step){
            case 1: 
                return <ShopInformation />
            case 2: 
                return <Details />
            case 3:
                return <Final />
            default:
        }

    }
    
    const handleClick = (direction) => {
        let newStep = currentStep;

        if (direction === 'next') {
            // Check if any required field is empty
            if ( !userData.orgName || !userData.email || !userData.phoneNum || !userData.password || !userData.confirmPassword ) {
                setErrorMessage('Please fill out all required fields.');
                setShowModal(true);
                return;
            } else if (userData.password !== userData.confirmPassword) {
                setErrorMessage('Passwords do not match.');
                setShowModal(true);
                return;
            }
        }
    
        direction === 'next' ? (newStep += 1) : (newStep -= 1);
        newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    
        if (newStep === steps.length && direction === 'next') {
            
            if ( !userData.repName || !userData.repPos || !userData.repEmail || !userData.description || !userData.accreditationDoc ) {
                newStep -= 1;
                setCurrentStep(newStep);
                setErrorMessage('Please fill out all required fields.');
                setShowModal(true);
                return
            } else {
                axios.post('http://localhost:5000/api/v1/auth/register', userData)
                    .then((response) => {
                        console.log('Registration submitted successfully:', response.data);
                        window.alert('Registration submitted successfully!');
                    })
                    .catch((error) => {
                        // Handle error, e.g., show error message to the user
                        console.error('Error submitting registration:', error);
                        window.alert('Error submitting registration. Please try again later.');
                    });
            }
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className='flex flex-col text-[#211C6A] items-center justify-center pt-[96px]'>

            {/* Modal for displaying error message */}
            {showModal && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center">
                    {/* <div className="fixed inset-0 bg-gray-500 opacity-75"></div> */}
                    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-300">
                        <h2 className="text-xl font-bold mb-4">Error</h2>
                        <p className="text-red-500 mb-4">{errorMessage}</p>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={closeModal}>Close</button>
                    </div>
                    
                </div>
            )}

            <div className='bg-white rounded-md shadow-md w-full px-10 max-w-[1000px] mx-auto select-none z-1'>
                <div className='container horizontal mt-5'>
                {/* Stepper */}
                     <Stepper 
                     steps = {steps}
                     currentStep = {currentStep}/>

                      {/* Display Components */}

                      <div className="my-10 p-10">
                        <StepperContext.Provider value={{
                            userData,
                            setUserData,
                            finalData,
                            setFinalData,
                        }}>
                            {displaySteps(currentStep)}
                        </StepperContext.Provider>
                      </div>
                </div>
              
                {/* Navigation Control */}
                {currentStep !== steps.length &&
                <StepperControl
                    handleClick={handleClick}
                    currentStep={currentStep}
                    steps={steps}
                
                />
                }   
            </div>
        </div>
    )
}

