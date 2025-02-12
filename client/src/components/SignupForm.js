import React, { useEffect, useState } from "react";
import TMCLogo from "../Assets/Logo.png";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import convertToBase64 from "./utils/convertToBase64";
import defaultPP from "../Assets/defaultPP.png";
import { RegistrationSuccess } from "./AUTHENTICATION/Success";
import { RegistrationFailure } from "./AUTHENTICATION/Failure";
import { WarningMessage } from "./AUTHENTICATION/Warning";

const SignupForm = () => {
    const [testImage, SetTestImage] = useState(null);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
        role: 'customer',
        image: '',
    });

    useEffect(() => {
        const fetchImage = async () => {
            const response = await fetch(defaultPP);
            const blob = await response.blob();

            const base64 = await convertToBase64(blob);
            SetTestImage(base64);
            setFormData({
                ...formData,
                image: base64,
            });
        };
        fetchImage();
    }, []);

    const [showPassword, setPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);

    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [registrationErrorMessage, setRegistrationErrorMessage] =
        useState("");

    const [fieldEmpty, checkFieldEmpty] = useState(false);
    const [passwordsMatch, checkPasswordsMatch] = useState(true);
    const [passwordLength, checkPasswordLength] = useState(true);

    const handleShowPassword = () => {
        setPassword(!showPassword);
    };

    const handleConfirmShowPassword = () => {
        setConfirmPassword(!showConfirmPassword);
    };
    const navigate = useNavigate();

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(formData);
        if (
            formData.firstName === "" ||
            formData.lastName === "" ||
            formData.dateOfBirth === "" ||
            formData.email === "" ||
            formData.contactNumber === "" ||
            formData.password === "" ||
            formData.confirmPassword === ""
        ) {
            checkFieldEmpty(true);
            window.scrollTo({ top: 0, behavior: "smooth" });

            return;
        }

        if (formData.password !== formData.confirmPassword) {
            checkPasswordsMatch(false);
            return;
        }

        if (formData.password.length < 6) {
            checkPasswordLength(false);
            return;
        }

        // console.log("OK!");
        axios
            .post("http://localhost:5000/api/v1/auth/register", formData)
            .then((res) => {
                setRegistrationSuccess(true);
            })
            .catch((err) => {
                if (
                    err.response &&
                    err.response.data &&
                    err.response.data.error
                ) {
                    setRegistrationErrorMessage(err.response.data.error);
                } else {
                    setRegistrationErrorMessage(
                        "An error occurred. Please try again."
                    );
                }
            });
    };

    const handleClick = () => {
        // Navigate to the desired route
        navigate("/login");
    };

    const handleTryAgainClick = () => {
        setRegistrationErrorMessage(""); // Reset the errorMessage state
    };

    return (
        <div className="text-[#211C6A] mt-[96px]">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col max-w-[800px] h-full w-full mx-auto text-center items-center select-none"
            >
                <img
                    className="w-40 h-40"
                    src={TMCLogo}
                    alt=""
                    loading="lazy"
                />

                <h2 className="w-96 text-2xl mt-[-26px] font-bold p-2">
                    Creating Your Account
                </h2>
                <h4 className="w-[420px]">
                    {" "}
                    Welcome to our platform! Sign up now for exclusive deals and
                    seamless shopping. Join us today!
                </h4>

                {fieldEmpty && (
                    <WarningMessage
                        message="All fields are required"
                        onClose={() => checkFieldEmpty(false)}
                    />
                )}

                <div className="flex-start flex-col mt-5 w-[560px] text-left px-4 items-center">
                    <h3 className="font-bold pb-1 px-2">First Name</h3>
                    <InputField
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="Enter your first name"
                    />
                    <h3 className="font-bold pb-1 px-2">Last Name</h3>
                    <InputField
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Enter your last name"
                    />
                    <h3 className="font-bold pb-1 px-2">Date of Birth</h3>
                    <InputField
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        placeholder="Enter your date of birth"
                    />
                    <h3 className="font-bold pb-1 px-2">Email Address</h3>
                    <InputField
                        type="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email address"
                    />
                    <h3 className="font-bold pb-1 px-2">Contact Number</h3>
                    <InputField
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
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
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />
                    <div className="flex items-center w-full justify-between px-2">
                        <h3 className="font-bold pb-1">Confirm Password</h3>
                        <span onClick={handleConfirmShowPassword}>
                            {!showConfirmPassword ? (
                                <FaEyeSlash size={20} />
                            ) : (
                                <FaEye size={20} />
                            )}
                        </span>
                    </div>
                    <InputField
                        type={!showConfirmPassword ? "Password" : "text"}
                        name="confirmPassword"
                        onChange={handleChange}
                        placeholder="Confirm your password"
                    />
                </div>

                {!passwordsMatch && (
                    <WarningMessage
                        message="Passwords do not match"
                        onClose={() => checkPasswordsMatch(true)}
                    />
                )}

                {!passwordLength && (
                    <WarningMessage
                        message="Password must be of minimum 6 characters length"
                        onClose={() => checkPasswordLength(true)}
                    />
                )}

                <div className="flex flex-col mt-4 items-center w-[560px] px-2">
                    <button
                        type="submit"
                        className="rounded-xl text-white font-semibold mb-1 bg-[#211C6A] p-[14px] w-[530px] hover:bg-[#3C35AB]"
                    >
                        CREATE ACCOUNT
                    </button>

                    <button
                        onClick={handleClick}
                        className=" border-none underline text-based text-[#211C6A] font-light p-[14px] w-[530px] hover:text-black"
                    >
                        Already Have An Account?
                    </button>
                </div>
            </form>
            {registrationSuccess && <RegistrationSuccess />}
            {registrationErrorMessage && (
                <RegistrationFailure
                    errorMessage={registrationErrorMessage}
                    onTryAgainClick={handleTryAgainClick}
                />
            )}
        </div>
    );
};

export default SignupForm;
