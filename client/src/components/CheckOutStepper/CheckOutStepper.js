import React, { useEffect, useState, useRef } from 'react';

const CheckOutStepper = ({ steps, currentStep }) => {
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


    const displaySteps = newStep.map((step) => (
        <div>
            <div
                className={`text-center w-24 text-xs font-medium uppercase ${step.highlighted ? 'text-gray-900' : 'text-gray-400'
                    }`}>
                {/* Display Description */}
                {step.description}
                <hr className='border border-black opacity-10 mt-2'></hr>
            </div>
        </div>
    ));

    return (
        <div className='flex  justify-between items-center '>
            {displaySteps}
        </div>
    );
};

export default CheckOutStepper;
