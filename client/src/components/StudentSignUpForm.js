import React, { useState, useEffect } from "react";
import axios from "axios";
import NameValidator from "../validator/NameValidator.js";
import StudentIDValidator from "../validator/StudentIDValidator.js";
import ContactValidator from "../validator/ContactValidator.js";
import { TUPEmailValidator } from "../validator/EmailValidator.js";

import InputField from "./InputField.js";

const SignUpForm = () => {
    const mockCredentials = {
        student_id: "TUPM-21-1664",
        name: "John Doe",
        email_address: "jb@tup.edu.ph",
        contact: "09123456789",
        password: "password",
    };

    const [studentId, setStudentId] = useState(mockCredentials.student_id);
    const [name, setName] = useState(mockCredentials.name);
    const [email, setEmail] = useState(mockCredentials.email_address);
    const [contactNumber, setContactNumber] = useState(mockCredentials.contact);

    const [password, setPassword] = useState(mockCredentials.password);
    const [passwordConfirm, setPasswordConfirm] = useState(
        mockCredentials.password
    );

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [nameError, setNameError] = useState(null);
    const [studentIDError, setStudentIDError] = useState(null);
    const [contactError, setContactError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState(null);

    const handleSignUp = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await axios.post("http://localhost:5000/customer/signup", {
                student_id: studentId,
                name: name,
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
            validator.validate(value);
            setter(value);
            errorSetter(null);
        } catch (error) {
            setter(value);
            errorSetter(`${errorPrefix}: ${error.message}`);
        }
    };

    const handleNameChange = (e) => {
        handleInputChange(
            e.target.value,
            NameValidator,
            setName,
            setNameError,
            "name"
        );
    };

    const handleStudentIDChange = (e) => {
        handleInputChange(
            e.target.value,
            StudentIDValidator,
            setStudentId,
            setStudentIDError,
            "student_id"
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
            TUPEmailValidator,
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
            <InputField
                type="text"
                value={studentId}
                onChange={handleStudentIDChange}
                placeholder="Student ID"
                setError={studentIDError}
            />

            <InputField
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
                setError={nameError}
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
