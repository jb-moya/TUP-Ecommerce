import React, { useState } from "react";
import axios from "axios";
import StudentIDValidator from "validator/StudentIDValidator.js";

import InputField from "./InputField.js";

const LogInForm = () => {
    const mockCredentials = {
        student_id: "TUPM-21-1664",
        password: "password",
    };

    const [studentId, setStudentId] = useState(mockCredentials.student_id);

    const [password, setPassword] = useState(mockCredentials.password);

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [studentIDError, setStudentIDError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    const handleLogIn = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        try {
            await axios.post("http://localhost:5000/signup", {
                student_id: studentId,
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

    const handleStudentIDChange = (e) => {
        handleInputChange(
            e.target.value,
            StudentIDValidator,
            setStudentId,
            setStudentIDError,
            "student_id"
        );
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div>
            <h1>Log-In</h1>
            <InputField
                type="text"
                value={studentId}
                onChange={handleStudentIDChange}
                placeholder="Student ID"
                setError={studentIDError}
            />

            <InputField
                type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
            />

            <button
                id="log-in-button"
                onClick={handleLogIn}
                disabled={isSubmitting}
            >
                Log-In
            </button>
            {error && <p>{error}</p>}
            {success && <p>Log-In Successful</p>}
        </div>
    );
};

export default LogInForm;