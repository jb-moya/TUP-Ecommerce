import React from "react";
import { TbHexagonLetterPFilled } from "react-icons/tb";
import logo from "../Assets/Logo.png";

const LoadingSymbol = ({ showWhen = false, message = "loading" }) => {
    return (
        <>
            {showWhen && (
                <div className="relative flex mx-auto my-auto flex-col items-center">
                    <div className="rotateZ text-2xl">
                        <img
                            src={logo}
                            alt="Logo Here"
                            className="w-20 h-20  saturate-50 opacity-35"
                        />
                    </div>
                    <div className="saturate-50 opacity-35 text-sm absolute bottom-0">
                        {message}
                    </div>
                </div>
            )}
        </>
    );
};

export default LoadingSymbol;
