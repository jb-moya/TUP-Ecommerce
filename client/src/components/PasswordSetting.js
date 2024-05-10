import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../features/user/userSlice";
import defaultProfileImage from "../Assets/defaultPP.png";
import { FaEdit, FaBell } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";

const PasswordSetting = () => {
    const dispatch = useDispatch();
    const { user, isUpdatePasswordSuccess, updatePasswordMessage } =
        useSelector((state) => state.user);
    const [currentPassword, setCurrentPassword] = useState("");
    const [attemptedUpdatingPassword, setAttemptedUpdatingPassword] =
        useState(false);
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [response, setResponse] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [matchError, setMatchError] = useState("");

    const handleConfirm = async () => {
        if (
            newPassword1 === newPassword2 &&
            newPassword1 !== "" &&
            newPassword2 !== ""
        ) {
            console.log("currentPassword", currentPassword);
            console.log("newPassword1", newPassword1);
            dispatch(
                updatePassword({
                    currentPassword: currentPassword,
                    newPassword: newPassword1,
                })
            );
            setAttemptedUpdatingPassword(true);
            console.log("isUpdatePasswordSuccess", isUpdatePasswordSuccess);
            console.log("updatePasswordMessage", updatePasswordMessage);
        } else if (newPassword1 === "" && newPassword2 === "") {
            setResponse("Input fields are empty");
        } else if (newPassword1 !== newPassword2) {
            setResponse("Passwords do not match");
        }
    };

    const handlePassword1Change = (e) => {
        const password = e.target.value;
        if (password.length < 6) {
            if (password.length > 0) {
                setPasswordError("Password must be at least 6 characters long");
            }
        } else {
            setPasswordError("");
        }
        setNewPassword1(password);
    };

    const handlePassword2Change = (e) => {
        const password2 = e.target.value;
        if (password2 !== newPassword1) {
            setMatchError("Passwords do not match");
        } else {
            setMatchError("");
        }
        setNewPassword2(password2);
    };

    const handleClosePrompt = () => {
        setAttemptedUpdatingPassword(false);
        setResponse("");
    };

    function Prompt({ message, onClose }) {
        return (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
                <div className="bg-white p-2 rounded-lg text-center">
                    <p className="text-base">{message}</p>
                    <button
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex">
            {attemptedUpdatingPassword && isUpdatePasswordSuccess && (
                <Prompt
                    message={
                        response ||
                        updatePasswordMessage.msg ||
                        updatePasswordMessage.error
                    }
                    onClose={handleClosePrompt}
                />
            )}

            <div className="w-[950px] flex-wrap flex flex-col px-10 py-6 bg-white">
                <p className="text-xl">My Password</p>
                <p className="text-sm">Update and set password</p>
                <hr className="border-t border-gray-300 my-4" />
                <div className="h-[165px] flex-wrap flex mb-5">
                    <div className="w-3/12 flex flex-col px-5 py-6 text-sm">
                        <p className="mb-6">Current Password</p>
                        <p className="mb-6">New Password</p>
                        <p>Confirm New Password</p>
                    </div>
                    <div className="w-9/12 flex flex-wrap flex-col px-5 py-6">
                        <div className="flex flex-row">
                            <input
                                className="w-1/2 mb-4 h-6 border text-sm px-1"
                                type="Password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                            />
                        </div>
                        <div className="flex items-center mb-4">
                            <input
                                className="w-1/2 h-6 border text-sm px-1 mr-2"
                                type="password"
                                value={newPassword1}
                                onChange={handlePassword1Change}
                            />
                            {passwordError && (
                                <p className="text-red-500 text-xs">
                                    {passwordError}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center">
                            <input
                                className="w-1/2 h-6 border text-sm px-1 mr-2"
                                type="password"
                                value={newPassword2}
                                onChange={handlePassword2Change}
                            />
                            {matchError && (
                                <p className="text-red-500 px-2 text-xs">
                                    {matchError}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div>
                    <button
                        type="button"
                        className="w-[120px] rounded cursor-pointer bg-[rgba(33, 28, 106)] border hover:border-violet-500 hover:bg-[#211C6A] hover:text-white hover:font-bold focus:ring-opacity-50 text-md"
                        onClick={handleConfirm}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PasswordSetting;