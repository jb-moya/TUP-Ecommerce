import "../CSS/LoginSignForm.css";
import LogoFrame from "./LogoFrame.js";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

import InputField from "../InputField";
import { rootUrl } from "../../App.js";
import Cookies from "universal-cookie";

const LoginFrame = () => {
    const [email, setEmail] = useState("seller@gmail.com");
    const [password, setPassword] = useState("seller");
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        console.log("email", email);
        console.log("password", password);
    }, [email, password]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) return;
        const user = { email, password };

        console.log("submitting");
        try {
            const url = `${rootUrl}/auth/login`;

            console.log("url", url);
            console.log(navigator.cookieEnabled);
            console.log(navigator.cookieEnabled);
            console.log(navigator.cookieEnabled);
            console.log(navigator.cookieEnabled);
            console.log(navigator.cookieEnabled);

            const response = await axios.post(url, user);
            console.log(response);

            const cookies = new Cookies();

            cookies.set("token", response.data.token, {
                signed: true,
                path: "/",
            });

            setPassword("");
            setEmail("");

            console.log(
                `User with email: ${email} and password: ${password} has been logged in`
            );
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTesting = async () => {
        const url = `${rootUrl}/api/v1`;
        // const url = `/api/v1`;
        await fetch(url);
    };
    const fetchLogout = async () => {
        const url = `${rootUrl}/api/v1/auth/logout`;
        // const url = `/api/v1/auth/logout`;
        await fetch(url);
    };

    return (
        <form className="info-frame">
            <LogoFrame />

            <div className="input-frames-padding">
                <InputField
                    value={email}
                    title="Email Address"
                    type="Email"
                    onChange={handleEmailChange}
                    placeholder="Enter your email address"
                />

                <div className="passwordContainer">
                    <FontAwesomeIcon
                        icon={showPassword ? faEyeSlash : faEye}
                        onClick={togglePasswordVisibility}
                        className="password-icon"
                    />
                    <span
                        className="password-toggle-text"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </span>
                </div>
                <InputField
                    value={password}
                    title="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={handlePasswordChange}
                    placeholder="Enter your preferred password"
                />
            </div>

            <div className="frame-container">
                <button className="login-container" onClick={handleSubmit}>
                    <b className="login5">LOGIN</b>
                </button>
                <button className="create-an-account-wrapper">
                    <b className="create-an-account">CREATE AN ACCOUNT</b>
                </button>
            </div>
        </form>
    );
};

export default LoginFrame;
