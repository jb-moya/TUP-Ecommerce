import React, { useEffect } from "react";
import axios, { all } from "axios";
import { useState } from "react";
import convertToBase64 from "./utils/convertToBase64";
import ImageHolder from "./utils/imageHolder";
import { rootUrl } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setImage } from "../features/user/userSlice";
import { toast } from "react-toastify";
import classNames from "classnames";
import { updatePassword } from "../features/user/userSlice";
axios.defaults.withCredentials = true;

const SellerAccountSettings = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    const [postImage, setPostImage] = useState("");
    const [userData, setUserData] = useState({
        orgName: "",
        email: "",
        contactNumbers: "",
        representative: {
            name: "",
            position: "",
            email: "",
        },
        description: "",
    });
    const [newUserData, setNewUserData] = useState({});

    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [newPasswordError, setNewPasswordError] = useState("");
    const [currentPasswordError, setCurrentPasswordError] = useState("");

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(
                `${rootUrl}/user/getAccountDetails`
            );
            console.log(response.data);
            setUserData(response.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("userData", userData);
    }, [userData]);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (user.image) {
            setPostImage(user.image);
        }
    }, [user]);

    const handleFileUpload = async (e) => {
        e.preventDefault();

        if (e.target.files.length === 0) {
            return;
        }

        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage(base64);

        updateLocalStorageImage();
    };

    const updateLocalStorageImage = () => {
        dispatch(setImage(postImage));
        const userLocal = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify(userLocal));
    };

    const handleNameChange = (e) => {
        setNewUserData({ ...newUserData, orgName: e.target.value });
    };

    const handleEmailChange = (e) => {
        setNewUserData({ ...newUserData, email: e.target.value });
    };

    const handleContactNumberChange = (e) => {
        setNewUserData({ ...newUserData, contactNumbers: e.target.value });
    };

    const handleRepNameChange = (e) => {
        setNewUserData({
            ...newUserData,
            representative: {
                ...newUserData.representative,
                name: e.target.value,
            },
        });
    };

    const handleRepPositionChange = (e) => {
        setNewUserData({
            ...newUserData,
            representative: {
                ...newUserData.representative,
                position: e.target.value,
            },
        });
    };

    const handleRepEmailChange = (e) => {
        setNewUserData({
            ...newUserData,
            representative: {
                ...newUserData.representative,
                email: e.target.value,
            },
        });
    };

    const handleDescriptionChange = (e) => {
        setNewUserData({ ...newUserData, description: e.target.value });
    };

    const handleCurremtPasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        if (e.target.value.length === 0) {
            setNewPasswordError("");
            setNewPassword("");
            return;
        }

        setNewPassword(e.target.value);
    };

    useEffect(() => {
        if (newPassword.length < 6 && newPassword.length > 0) {
            setNewPasswordError("Password must be at least 6 characters long");
        } else {
            setNewPasswordError("");
        }

        if (newPassword !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
        } else {
            setConfirmPasswordError("");
        }

        if (!newPassword && !confirmPassword && password) {
            setCurrentPasswordError("Please enter new password and confirm it");
        } else if (!newPassword && confirmPassword && password) {
            setCurrentPasswordError("Please enter new password");
        } else if (newPassword && !confirmPassword && password) {
            setCurrentPasswordError("Please confirm new password");
        } else if (newPassword && confirmPassword && !password) {
            setCurrentPasswordError("Please enter your current password");
        } else {
            setCurrentPasswordError("");
        }
    }, [newPassword, confirmPassword, password]);

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const updateAccountDetails = async () => {
        try {
            console.log("newUserData", newUserData);

            if (postImage) {
                newUserData.image = postImage;
            }

            const response = await axios.patch(
                `${rootUrl}/user/updateUser`,
                newUserData
            );

            const updatedUser = response.data.user;
            console.log("response", updatedUser);
            dispatch(setUser(updatedUser));

            toast.success("Account details updated successfully");

            setUserData(updatedUser);

            // setTimeout(() => {
            //     window.location.reload();
            // }, 1000);
        } catch (error) {
            console.error(error);
            toast.error(
                `Failed to update account details ${error.response?.data?.msg}`
            );
        }
    };

    const handleUpdatePassword = async () => {
        dispatch(
            updatePassword({
                currentPassword: password,
                newPassword: newPassword,
            })
        );
    };

    function canUpdatePassword() {
        return (
            !confirmPasswordError && !newPasswordError && !currentPasswordError
        );
    }

    function allPasswordFieldsFilled() {
        return password && newPassword && confirmPassword;
    }

    function areFieldsEmpty() {
        return (
            !newUserData?.orgName &&
            !newUserData?.email &&
            !newUserData?.contactNumbers &&
            !newUserData?.representative?.name &&
            !newUserData?.representative?.position &&
            !newUserData?.representative?.email &&
            !newUserData?.description &&
            !postImage
        );
    }

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <h1 className="font-semibold">My Account</h1>
            <h2 className="text-sm font-light mb-1">Account Information</h2>
            <hr className="mb-4" />
            <form>
                <div className="w-full h-2/3 flex flex-col py-6 justify-center items-center bg-slate-50 p-2 mb-4 rounded-lg">
                    <ImageHolder
                        source={postImage}
                        handleFileUpload={handleFileUpload}
                    />
                    <div className="w-full flex flex-col px-7 font-light truncate text-sm text-gray-500 justify-center items-center">
                        <p>File size: max 1 MB</p>
                        <p>File extension: .JPEG, .PNG, .JPG</p>
                    </div>
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="w-3/12 font-light text-sm content-center"
                        htmlFor="name"
                    >
                        Organization Name
                    </label>
                    <input
                        placeholder={userData.orgName ? userData.orgName : ""}
                        className="w-9/12 border border-1 font-light p-1"
                        type="text"
                        id="name"
                        name="name"
                        onChange={handleNameChange}
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="content-center w-3/12 font-light text-sm"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        placeholder={userData.email ? userData.email : ""}
                        className="w-9/12 border border-1 font-light p-1"
                        type="text"
                        id="email"
                        name="email"
                        onChange={handleEmailChange}
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="content-center w-3/12 font-light text-sm"
                        htmlFor="contactNumber"
                    >
                        Contact Number
                    </label>
                    <input
                        placeholder={
                            userData.contactNumbers
                                ? userData.contactNumbers[0]
                                : ""
                        }
                        className="w-9/12 border border-1 font-light p-1"
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                        onChange={handleContactNumberChange}
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label className="content-center w-full font-light text-sm">
                        Representative
                    </label>
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="content-center pl-8 w-3/12 font-light text-sm"
                        htmlFor="repName"
                    >
                        Name
                    </label>
                    <input
                        placeholder={
                            userData.representative
                                ? userData.representative.name
                                : ""
                        }
                        className="w-9/12 border border-1 font-light p-1"
                        type="text"
                        id="repName"
                        name="repName"
                        onChange={handleRepNameChange}
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="content-center pl-8 w-3/12 font-light text-sm"
                        htmlFor="position"
                    >
                        Position
                    </label>
                    <input
                        placeholder={
                            userData.representative
                                ? userData.representative.position
                                : ""
                        }
                        className="w-9/12 border border-1 font-light p-1"
                        type="text"
                        id="position"
                        name="position"
                        onChange={handleRepPositionChange}
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="content-center pl-8 w-3/12 font-light text-sm"
                        htmlFor="repEmail"
                    >
                        Email
                    </label>
                    <input
                        placeholder={
                            userData.representative
                                ? userData.representative.email
                                : ""
                        }
                        className="w-9/12 border border-1 font-light p-1"
                        type="text"
                        id="repEmail"
                        name="repEmail"
                        onChange={handleRepEmailChange}
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="content-center w-3/12 font-light text-sm"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        maxLength={1000}
                        placeholder={
                            userData.description ? userData.description : ""
                        }
                        className="w-9/12 border border-1 font-light p-1"
                        type="text"
                        id="description"
                        name="description"
                        onChange={handleDescriptionChange}
                    />
                </div>
                <div className="border border-1 p-4 rounded-md mt-4">
                    <h3 className="text-base font-normal">
                        Change your password
                    </h3>
                    <div className="flex pl-3 py-1">
                        <label
                            className="content-center w-3/12 font-light text-sm"
                            htmlFor="oldPassword"
                        >
                            Old Password
                        </label>
                        <input
                            className="w-6/12 border border-1 font-light p-1"
                            type="password"
                            id="oldPassword"
                            name="oldPassword"
                            onChange={handleCurremtPasswordChange}
                        />
                        <div className="w-3/12 pl-2 content-center">
                            {currentPasswordError ? (
                                <p className="text-red-500 text-xs">
                                    {currentPasswordError}
                                </p>
                            ) : (
                                <div> ... </div>
                            )}
                        </div>
                    </div>
                    <div className="flex pl-3 py-1">
                        <label
                            className="content-center w-3/12 font-light text-sm"
                            htmlFor="password"
                        >
                            New Password
                        </label>
                        <input
                            className="w-6/12 border border-1 font-light p-1"
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            onChange={handleNewPasswordChange}
                        />
                        <div className="w-3/12 pl-2 content-center">
                            {newPasswordError ? (
                                <p className="text-red-500 text-xs">
                                    {newPasswordError}
                                </p>
                            ) : (
                                <div> ... </div>
                            )}
                        </div>
                    </div>
                    <div className="flex pl-3 py-1">
                        <label
                            className="content-center w-3/12 font-light text-sm"
                            htmlFor="confirmPassword"
                        >
                            Confirm Password
                        </label>
                        <input
                            className="w-6/12 border border-1 font-light p-1"
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={handleConfirmPasswordChange}
                        />
                        <div className="w-3/12 pl-2 content-center">
                            {confirmPasswordError ? (
                                <p className="text-red-500 text-xs">
                                    {confirmPasswordError}
                                </p>
                            ) : (
                                <div> ... </div>
                            )}
                        </div>
                    </div>
                </div>
                <button
                    type="button"
                    className={classNames(
                        "bg-blue-500 mt-10 hover:text-white text-white p-2 rounded-lg font-light border border-1",
                        {
                            "cursor-not-allowed opacity-20":
                                !canUpdatePassword() ||
                                (areFieldsEmpty() &&
                                    !allPasswordFieldsFilled()),
                        }
                    )}
                    onClick={() => {
                        if (allPasswordFieldsFilled() && canUpdatePassword()) {
                            toast.info("Updating password");
                            handleUpdatePassword();
                        }

                        if (!areFieldsEmpty()) {
                            updateAccountDetails();
                        }
                    }}
                    disabled={
                        !canUpdatePassword() ||
                        (areFieldsEmpty() && !allPasswordFieldsFilled())
                    }
                >
                    Save Changes{" "}
                </button>
                <span className="pl-3 text-sm font-extralight">
                    {canUpdatePassword() && allPasswordFieldsFilled()
                        ? "(will also update password)"
                        : null}
                </span>
            </form>
        </div>
    );
};

export default SellerAccountSettings;
