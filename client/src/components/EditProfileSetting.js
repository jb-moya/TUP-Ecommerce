import React, { useEffect, useState } from "react";
import ImageHolder from "./utils/imageHolder";
import convertToBase64 from "./utils/convertToBase64";
import axios from "axios";
import { setUser } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

axios.defaults.withCredentials = true;

const EditProfileDetails = () => {
    const dispatch = useDispatch();
    const [postImage, setPostImage] = useState("");
    const { user } = useSelector((state) => state.user);
    const [newUserData, setNewUserData] = useState({
        contactNumber: "",
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phoneNumber: "",
        dateofBirth: "",
        gender: "",
        image: "",
    });
    const updateAccountDetails = async () => {
        try {
            let dataToSend = newUserData;
            if (postImage !== user.image) {
                dataToSend = { ...dataToSend, image: postImage };
            }
            const response = await axios.patch(
                "http://localhost:5000/api/v1/user/updateUser",
                dataToSend
            );

            const updatedUser = response.data.user;
            dispatch(setUser(updatedUser));

            // console.log(response.data);
            window.location.reload();
        } catch (error) {
            // console.log(error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);

        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const formattedDay = day < 10 ? `0${day}` : day;

        const formattedMonth = month < 10 ? `0${month}` : month;

        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

        return formattedDate;
    }

    useEffect(() => {
        setNewUserData({
            ...newUserData,
            firstName: user.firstName,
            lastName: user.lastName,
            dateofBirth: user.dateOfBirth,
            gender: user.gender,
        });
    }, [user]);
    useEffect(() => {
        if (user.image) {
            setPostImage(user.image);
        }
    }, [user]);

    const handleEmailChange = (e) => {
        setNewUserData({
            ...newUserData,
            email: e.target.value,
        });
    };

    const handleContactNumberChange = (e) => {
        setNewUserData({
            ...newUserData,
            contactNumber: e.target.value,
        });
    };

    const handleGenderChange = (e) => {
        setNewUserData({
            ...newUserData,
            gender: e.target.value,
        });
    };

    const handleAddressChange = (e) => {
        setNewUserData({
            ...newUserData,
            address: e.target.value,
        });
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage(base64);

        updateLocalStorageImage();
    };

    const updateLocalStorageImage = () => {
        user.image = postImage;
        const userLocal = JSON.parse(localStorage.getItem("user"));
        localStorage.setItem("user", JSON.stringify(userLocal));
    };
    return (
        <div className="w-[950px] flex-wrap flex flex-col px-10 py-6 bg-white">
            <p className="text-xl">My Profile</p>
            <p className="text-sm">Manage and protect your account</p>
            <hr className="border-t border-gray-300 my-4" />
            <br></br>
            <div className="flex  ">
                <div className="w-[600px] flex-wrap flex">
                    <div className="w-1/4 flex flex-col px-5 py-6 text-sm justify-end">
                        <p className="mb-6">Name</p>
                        <p className="mb-6">Email</p>
                        <p className="mb-6">Phone Number</p>
                        <p className="mb-6">Address</p>
                        <p className="mb-16">Gender</p>
                        <p className="mb-6">Date of Birth</p>
                        <p className="mb-3"></p>
                    </div>
                    <div className="w-3/4 flex-wrap flex flex-col px-5 py-6">
                        <div>
                            <p className="w-11/12 mb-5 h-6">
                                {" "}
                                {/* NAME IS IMMUTABLE */}
                                {user && user.firstName
                                    ? user.firstName
                                    : "..."}{" "}
                                {user && user.lastName ? user.lastName : "..."}
                            </p>
                        </div>
                        <div>
                            <input
                                className="w-11/12 mb-5 h-6 border"
                                type="text"
                                value={
                                    newUserData.email !== undefined
                                        ? newUserData.email
                                        : user && user.email
                                        ? user.email
                                        : "No Email"
                                }
                                placeholder={`${
                                    user && user.email ? user.email : "No Email"
                                }`}
                                onChange={handleEmailChange}
                            />
                        </div>
                        <div>
                            <input
                                className="w-11/12 mb-5 h-6 border"
                                type="text"
                                value={
                                    newUserData.contactNumber !== undefined
                                        ? newUserData.contactNumber
                                        : user && user.contactNumber
                                        ? user.contactNumber
                                        : "No Phone Number"
                                }
                                placeholder={
                                    user && user.contactNumber
                                        ? user.contactNumber
                                        : "No Phone Number"
                                }
                                onChange={handleContactNumberChange}
                            />
                        </div>
                        <div>
                            <input
                                className="w-11/12 mb-5 h-6 border"
                                type="text"
                                value={
                                    newUserData.address !== undefined
                                        ? newUserData.address
                                        : user && user.address
                                        ? user.address
                                        : "N/A"
                                }
                                placeholder={
                                    user && user.address ? user.address : "N/A"
                                }
                                onChange={handleAddressChange}
                            />
                        </div>
                        <div className="mb-5 text-sm">
                            <div>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={newUserData.gender === "male"}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="male"> Male</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={newUserData.gender === "female"}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="female"> Female</label>
                            </div>
                            <div>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="others"
                                    checked={newUserData.gender === "others"}
                                    onChange={handleGenderChange}
                                />
                                <label htmlFor="others"> Others</label>
                            </div>
                        </div>
                        <div>
                            <p className="w-11/12 mb-5 h-6">
                                {user &&
                                    user.dateOfBirth &&
                                    formatDate(user.dateOfBirth)}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-[270px] h-2/3 flex flex-col py-6 border-l border-gray-300 justify-center items-center">
                    <ImageHolder
                        source={postImage}
                        handleFileUpload={handleFileUpload}
                    />
                    <div className="w-full flex flex-col px-7 py-6 truncate text-sm text-gray-500 justify-center items-center">
                        <p>File size: max 1 MB</p>
                        <p>File extension: .JPEG, .PNG, .JPG</p>
                    </div>
                </div>
            </div>
            <div>
                <button
                    className="mt-3 w-[120px] py-1 rounded-lg cursor-pointer bg-[rgba(33, 28, 106)] border hover:border-violet-500 hover:bg-[#211C6A] hover:text-white hover:font-bold focus:ring-opacity-50 text-md"
                    onClick={updateAccountDetails}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default EditProfileDetails;
