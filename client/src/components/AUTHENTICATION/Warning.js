import React from 'react';

export const WarningMessage = ({ message, onClose }) => {
    return (
        <div className="flex items-center justify-between bg-red-500 rounded border border-red-300 mt-4 p-2">
            <div className='font-bold text-white mr-6'>{message}</div>
            <button onClick={onClose} className="focus:outline-none font-bold ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3.646 3.646a.5.5 0 01.708 0L10 9.293l5.646-5.647a.5.5 0 01.708.708L10.707 10l5.647 5.646a.5.5 0 01-.708.708L10 10.707l-5.646 5.647a.5.5 0 01-.708-.708L9.293 10 3.646 4.354a.5.5 0 010-.708z" clipRule="evenodd" />
                </svg>
            </button>
        </div>
    );
};
