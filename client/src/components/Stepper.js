import React, { useEffect, useState, useRef } from 'react';

const Stepper = ({ steps, currentStep }) => {
    const [newStep, setNewStep] = useState([]);
    const stepRef = useRef();

    const updateStep = (stepNumber, steps) => {
        const newSteps = [...steps];
        let count = 0;

        while (count < newSteps.length) {
            // current step
            if (count === stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: true,
                    selected: true,
                    complete: true,
                };
                count++;
            }
            // step completed
            else if (count < stepNumber) {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: true,
                    complete: true,
                };
                count++;
            }
            // step pending
            else {
                newSteps[count] = {
                    ...newSteps[count],
                    highlighted: false,
                    selected: false,
                    complete: false,
                };
                count++;
            }
        }
        return newSteps;
    };

    useEffect(() => {
        const stepsState = steps.map((step, index) => ({
            description: step,
            completed: false,
            highlighted: index === 0,
            selected: index === 0,
        }));
        stepRef.current = stepsState;
        const current = updateStep(currentStep - 1, stepRef.current);
        setNewStep(current);
    }, [steps, currentStep]);

    const displaySteps = newStep.map((step, index) => (
        <div
            key={index}
            className={
                index !== newStep.length - 1
                    ? 'w-full flex items-center'
                    : 'flex items-center'
            }>
            <div className='relative flex flex-col items-center text-[#211C6A]'>
                <div
                    className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300 h-12 w-12 flex items-center justify-center py-3 ${
                        step.selected
                            ? 'bg-[#211C6A] text-white font-bold border border-[#211C6A]'
                            : ''
                    }`}>
                    {/* Display Number */}
                    {step.complete ? (
                        <span className='text-white font-bold text-xl'>
                            &#10003;
                        </span>
                    ) : (
                        index + 1
                    )}
                </div>

                <div
                    className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
                        step.highlighted ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                    {/* Display Description */}
                    {step.description}
                </div>
            </div>
            <div
                className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                    step.complete ? 'border-[#211C6A]' : 'border-gray-300'
                }`}>
                {/* Display Line */}
            </div>
        </div>
    ));

    return (
        <div className='mx-4 p-4 flex justify-between items-center'>
            {displaySteps}
        </div>
    );
};

export default Stepper;
