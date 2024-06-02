import React, { useState } from "react";
import TMCLogo from "../Assets/Logo.png";
import InputField from "./InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LoginFailure } from "./AUTHENTICATION/Failure";
import { useDispatch } from "react-redux";
import { logIn } from "../features/user/userSlice";
axios.defaults.withCredentials = true;

const LoadingSVG = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 200"
            class="h-5 w-5 mr-3"
        >
            <radialGradient
                id="a12"
                cx=".66"
                fx=".66"
                cy=".3125"
                fy=".3125"
                gradientTransform="scale(1.5)"
            >
                <stop offset="0" stop-color="#FF156D"></stop>
                <stop offset=".3" stop-color="#FF156D" stop-opacity=".9"></stop>
                <stop offset=".6" stop-color="#FF156D" stop-opacity=".6"></stop>
                <stop offset=".8" stop-color="#FF156D" stop-opacity=".3"></stop>
                <stop offset="1" stop-color="#FF156D" stop-opacity="0"></stop>
            </radialGradient>
            <circle
                transform-origin="center"
                fill="none"
                stroke="url(#a12)"
                stroke-width="15"
                stroke-linecap="round"
                stroke-dasharray="200 1000"
                stroke-dashoffset="0"
                cx="100"
                cy="100"
                r="70"
            >
                <animateTransform
                    type="rotate"
                    attributeName="transform"
                    calcMode="spline"
                    dur="2"
                    values="360;0"
                    keyTimes="0;1"
                    keySplines="0 0 1 1"
                    repeatCount="indefinite"
                ></animateTransform>
            </circle>
            <circle
                transform-origin="center"
                fill="none"
                opacity=".2"
                stroke="#FF156D"
                stroke-width="15"
                stroke-linecap="round"
                cx="100"
                cy="100"
                r="70"
            ></circle>
        </svg>
    );
};

const LogInForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "tupstore1@gmail.com",
        password: "sample01",
        // email: "",
        // password: "",
    });

    const [showPassword, setPassword] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleShowPassword = () => {
        setPassword(!showPassword);
    };

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const resultAction = await dispatch(logIn(formData));
            // const user = resultAction;
            // console.log("user", user);
            if (logIn.fulfilled.match(resultAction)) {
                navigate("/", { replace: true });
            } else {
                console.error("Login error:", resultAction);
                setLoginErrorMessage(resultAction.payload);
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoginErrorMessage("An unknown error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleClick = () => {
        navigate("/signup");
    };

    return (
        <div className="text-[#211C6A] items-center mt-[96px]">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col max-w-[800px] w-full h-full mx-auto text-center items-center select-none"
            >
                <img
                    className="w-56 h-56"
                    src={TMCLogo}
                    alt=""
                    loading="lazy"
                />

                <h2 className="w-96 text-2xl mt-[-26px] font-bold p-2">
                    Login
                </h2>
                <h4 className="w-[420px] mb-4">
                    {" "}
                    Hey, welcome back! Ready to score some awesome deals? Let's
                    dive in and find the perfect ones for you!
                </h4>

                {loginErrorMessage && (
                    <LoginFailure errorMessage={loginErrorMessage} />
                )}

                <div className="flex-start flex-col mt-[5px] w-[560px] text-left px-4 items-center">
                    <h3 className="font-bold pb-1 px-2">Email Address</h3>
                    <InputField
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                    />
                    <div className="flex items-center w-full justify-between px-2">
                        <h3 className="font-bold pb-1">Password</h3>
                        <span onClick={handleShowPassword}>
                            {!showPassword ? (
                                <FaEyeSlash size={20} />
                            ) : (
                                <FaEye size={20} />
                            )}
                        </span>
                    </div>
                    <InputField
                        type={!showPassword ? "Password" : "text"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                </div>

                <div className="flex flex-col mt-4 items-center w-[560px] px-2">
                    <button className="rounded-xl text-white font-semibold mb-3 bg-[#211C6A] p-[14px] w-[530px] hover:bg-[#3C35AB]">
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <LoadingSVG />
                                <span>Logging in...</span>
                            </div>
                        ) : (
                            "LOGIN"
                        )}
                    </button>

                    <button
                        onClick={handleClick}
                        className="rounded-xl border border-gray-400 text-[#211C6A]  hover:bg-gray-200 font-semibold mb-3 bg-[#EFEFEF] p-[14px] w-[530px]"
                    >
                        CREATE AN ACCOUNT
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogInForm;
