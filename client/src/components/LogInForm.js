import React, { useState } from "react";
import TMCLogo from "../Assets/Logo.png";
import InputField from "./InputField";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LoginFailure } from "./AUTHENTICATION/Failure";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../features/user/userSlice";
import { logIn } from "../features/user/userSlice";
axios.defaults.withCredentials = true;
const LogInForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "sample1@gmail.com",
        password: "sample01",
        // email: "",
        // password: "",
    });

    const [showPassword, setPassword] = useState(false);
    const [loginErrorMessage, setLoginErrorMessage] = useState("");

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
            await dispatch(logIn(formData));
            navigate("/", { replace: true });
        } catch (error) {
            console.error("Login error:", error);
        }

        // axios
        //     .post("http://localhost:5000/api/v1/auth/login", formData)
        //     .then((response) => {
        //         localStorage.setItem("isLoggedIn", "true");
        //         // console.log(
        //             "Logged in successfullyyy",
        //             localStorage.getItem("isLoggedIn")
        //         );

        //         return response.data;
        //     })
        //     .then((responseData) => {
        //         // console.log("HEHE", responseData);

        //         return axios.get(
        //             "http://localhost:5000/api/v1/auth/getAccountDetails"
        //         );
        //     })
        //     .then((getResponse) => {
        //         const userDataWithoutPassword = { ...getResponse.data };
        //         delete userDataWithoutPassword.user.password;
        //         // store all to local storage
        //         localStorage.setItem(
        //             "user",
        //             JSON.stringify(userDataWithoutPassword)
        //         );

        //         // store all to redux
        //         dispatch(setUser(userDataWithoutPassword.user));

        //         setTimeout(() => {
        //             navigate("/"); // GO TO HOME PAGE
        //         }, 1000);
        //     })
        //     .catch((err) => {
        //         if (
        //             err.response &&
        //             err.response.data &&
        //             err.response.data.error
        //         ) {
        //             setLoginErrorMessage(err.response.data.error);
        //         } else {
        //             setLoginErrorMessage(
        //                 "An error occurred. Please try again."
        //             );
        //         }
        //     });
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
                    <button className="rounded-2xl text-white font-semibold mb-3 bg-[#211C6A] p-[14px] w-[530px] hover:bg-[#3C35AB]">
                        LOGIN
                    </button>

                    <button
                        onClick={handleClick}
                        className="rounded-2xl border border-gray-400 text-[#211C6A]  hover:bg-gray-200 font-semibold mb-3 bg-[#EFEFEF] p-[14px] w-[530px]"
                    >
                        CREATE AN ACCOUNT
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LogInForm;
