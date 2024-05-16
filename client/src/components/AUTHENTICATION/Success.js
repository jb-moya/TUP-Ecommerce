import React from "react";
import { useNavigate } from "react-router-dom";

export const RegistrationSuccess = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleGoBackClick = () => {
        navigate("/");
    };
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-75 z-50">
            <div className="bg-white p-4 rounded-xl">
                <p className="text-center text-green-600 text-lg font-semibold">
                    Registration Successful!
                </p>
                <button
                    className="block mx-auto mt-4 px-4 py-2 rounded-xl text-white font-semibold mb-1 bg-[#211C6A]  hover:bg-[#3C35AB]"
                    onClick={handleLoginClick}
                >
                    Log-In
                </button>
                <button
                    className="block mx-auto mt-4 px-4 py-2 border-none underline text-based text-[#211C6A] font-light hover:text-black"
                    onClick={handleGoBackClick}
                >
                    Go back
                </button>
            </div>
        </div>
    );
};
