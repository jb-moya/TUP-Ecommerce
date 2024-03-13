import React, { useState, useEffect } from "react";
import axios from "axios";
import NameValidator from "../validator/NameValidator.js";
// import StudentIDValidator from "../validator/StudentIDValidator.js";
import ContactValidator from "../validator/ContactValidator.js";
import EmailValidator from "../validator/EmailValidator.js";

import InputField from "./InputField.js";

const SignUpForm = () => {
    const mockCredentials = {
        // customer_id: "CID056897",
        last_name: "Doe",
        first_name: "John",
        middle_name: "Dae",
        contact: "09123456789",
        address: "26 Looping Boorts, Brgy. Maharlika, Biringan, Samar",
        birthdate: "06-21-1990",
        email_address: "john_dae_doe@tup.edu.ph",
        password: "password",
    };

    const [last_name, setLastName] = useState(mockCredentials.last_name);
    const [first_name, setFirstName] = useState(mockCredentials.first_name);
    const [middle_name, setMiddleName] = useState(mockCredentials.middle_name);
    
    const [email, setEmail] = useState(mockCredentials.email_address);
    const [contactNumber, setContactNumber] = useState(mockCredentials.contact);

    const [password, setPassword] = useState(mockCredentials.password);
    const [passwordConfirm, setPasswordConfirm] = useState(
        mockCredentials.password
    );

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [lastNameError, setLastNameError] = useState(null);
    const [firstNameError, setFirstNameError] = useState(null);
    const [middleNameError, setMiddleNameError] = useState(null);

    const [contactError, setContactError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState(null);

    const handleSignUp = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await axios.post("http://localhost:5000/customer/signup", {
                last_name: last_name,
                first_name: first_name,
                middle_name: middle_name,
                email_address: email,
                contact_number: contactNumber,
                password: password,
            });

            setError(null);
            setSuccess(true);
        } catch (error) {
            setError(
                error.response?.data?.error || "Unknown Server error occurred"
            );
            setSuccess(false);
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (
        value,
        validator,
        setter,
        errorSetter,
        errorPrefix
    ) => {
        try {
            validator.validate(value, errorPrefix);
            setter(value);
            errorSetter(null);
        } catch (error) {
            setter(value);
            errorSetter(`${errorPrefix}: ${error.message}`);
        }
    };

    const handleLastNameChange = (e) => {
        handleInputChange(
            e.target.value,
            NameValidator,
            setLastName,
            setLastNameError,
            "last name"
        );
    };

    const handleFirstNameChange = (e) => {
        handleInputChange(
            e.target.value,
            NameValidator,
            setFirstName,
            setFirstNameError,
            "first name"
        );
    };

    const handleMiddleNameChange = (e) => {
        handleInputChange(
            e.target.value,
            NameValidator,
            setMiddleName,
            setMiddleNameError,
            "middle name"
        );
    };

    const handleContactChange = (e) => {
        handleInputChange(
            e.target.value,
            ContactValidator,
            setContactNumber,
            setContactError,
            "contact_number"
        );
    };

    const handleEmailChange = (e) => {
        handleInputChange(
            e.target.value,
            EmailValidator,
            setEmail,
            setEmailError,
            "email_address"
        );
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setPasswordConfirm(e.target.value);
    };

    useEffect(() => {
        if (passwordConfirm !== password) {
            setPasswordConfirmError("Passwords do not match");
        } else {
            setPasswordConfirmError(null);
        }
    }, [password, passwordConfirm]);

    return (
        <div>
            <h1>Sign Up</h1>
            {/* <InputField
                type="text"
                value={studentId}
                onChange={handleStudentIDChange}
                placeholder="Student ID"
                setError={studentIDError}
            /> */}

            <InputField
                type="text"
                value={last_name}
                onChange={handleLastNameChange}
                placeholder="Name"
                setError={lastNameError}
            />

            <InputField
                type="text"
                value={first_name}
                onChange={handleFirstNameChange}
                placeholder="Name"
                setError={firstNameError}
            />

            <InputField
                type="text"
                value={middle_name}
                onChange={handleMiddleNameChange}
                placeholder="Name"
                setError={middleNameError}
            />

            <InputField
                type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                setError={emailError}
            />

            <InputField
                type="text"
                value={contactNumber}
                onChange={handleContactChange}
                placeholder="Contact Number"
                setError={contactError}
            />

            <InputField
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
            />

            <InputField
                type="password"
                value={passwordConfirm}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirm Password"
                setError={passwordConfirmError}
            />

            <button
                id="sign-up-button"
                onClick={handleSignUp}
                disabled={isSubmitting}
            >
                Sign Up
            </button>
            {error && <p>{error}</p>}
            {success && <p>Sign Up Successful</p>}
        </div>
    );
};

export default SignUpForm;
