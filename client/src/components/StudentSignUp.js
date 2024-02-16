import React, { useState } from "react";

const SignUp = () => {
    const [studentId, setStudentId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [error, setError] = useState(null);

    const handleSignUp = async () => {
        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    student_id: studentId,
                    name,
                    email_address: email,
                    contact,
                    password_hash: password,
                }),
            });

            if (response.ok) {
                setError(null);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Student ID"
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
            />
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="Confirm Password"
            />

            <button onClick={handleSignUp}>Sign Up</button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default SignUp;
