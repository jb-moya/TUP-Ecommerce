import React, { useEffect, useState } from "react";
import image from "../components/images/lake-louise-51543_1280.jpg";
import { FaEdit } from "react-icons/fa";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";
import ImageHolder from "./utils/imageHolder";
import defaultProfileImage from "../Assets/defaultPP.png";
import convertToBase64 from "./utils/convertToBase64";
import axios from "axios";

export const UserAccountDetails = () => {
    const [postImage, setPostImage] = useState("");
    const [userData, setUserData] = useState({});
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
            const response = await axios.patch(
                "http://localhost:5000/api/v1/user/updateUser",
                newUserData,
                {
                    withCredentials: true,
                }
            );
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const fetchAccountDetails = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/auth/getAccountDetails",
                {
                    withCredentials: true,
                }
            );
            setUserData(response.data.user);
            console.log(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
    
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
    
        const formattedDay = (day < 10) ? `0${day}` : day;
    
        const formattedMonth = (month < 10) ? `0${month}` : month;
    
        const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    
        return formattedDate;
    }
    
    useEffect(() => {
        fetchAccountDetails();
    }, []);

    useEffect(() => {
        setNewUserData({
            ...newUserData,
            firstName: userData.firstName,
            lastName: userData.lastName,
            dateofBirth: userData.dateOfBirth,
            gender: userData.gender,
        });
    }, [userData]);

    useEffect(() => {
        if (userData.image) {
            setPostImage(userData.image);
        }
    }, [userData]);

    const handleEmailChange = (e) => {
        setNewUserData({
            ...newUserData,
            email: e.target.value
        });
    };

    const handleContactNumberChange = (e) => {
        setNewUserData({
            ...newUserData,
            contactNumber: e.target.value
        });
    };

    const handleGenderChange = (e) => {
        setNewUserData({
            ...newUserData,
            gender: e.target.value
        });
    };

    const handleAddressChange = (e) => {
        setNewUserData({
            ...newUserData,
            address: e.target.value
        });
    };

    const handleFileUpload = async (e) => {
        e.preventDefault(); // Prevent the default behavior of the click event
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        // console.log("base64");
        // console.log(base64);

        setPostImage(base64);
    };

    return (
        <div className="flex w=full mx-auto">
            <div className="ml-40 w-[250px] flex-wrap flex flex-col">
                <div className="flex-wrap flex flex-row px-5 py-6 border-gray-300">
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full rounded-full object-cover overflow-hidden"
                            src={
                                userData.image
                                    ? userData.image
                                    : defaultProfileImage
                            }
                            alt=""
                        />
                    </div>
                    <div className="ml-3 w-36 h-10 flex flex-col text-sm">
                        <p className="font-bold truncate">
                            {userData.firstName} {userData.lastName}
                        </p>
                        <div className="flex flex-row text-sm">
                            <FaEdit size={18} />
                            <p className="truncate">Edit profile</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <hr className="border-t border-gray-300 w-5/6" />
                </div>
                <div className="flex flex-row mt-5 px-5 py-6">
                    <div className="w-1/5 flex flex-col justify-center items-center">
                        <div className="mb-24">
                            <MdAccountCircle size={24} />
                        </div>

                        <div className="mb-7">
                            <FaClockRotateLeft size={24} />
                        </div>
                        <div>
                            <FaBell size={24} />
                        </div>
                    </div>
                    <div className="px-3 w-4/5 flex flex-col justify-center text-sm">
                        <a
                            href="/#"
                            className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            My Account
                        </a>
                        <a
                            href="/customeraccount"
                            className="mb-1 p-1 bg-[#211C6A] text-white"
                        >
                            Profile
                        </a>
                        <a
                            href="/customeraccount=password"
                            className="mb-3 p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Set Password
                        </a>
                        <a
                            href="/#"
                            className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Purchase History
                        </a>
                        <a
                            href="/notifications"
                            className="p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Notifications
                        </a>
                    </div>
                </div>
            </div>

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
                                <p className="w-11/12 mb-5 h-6"> {/* NAME IS IMMUTABLE */}
                                    {userData.firstName} {userData.lastName}
                                </p>
                            </div>
                            <div>
                                <input
                                    className="w-11/12 mb-5 h-6 border"
                                    type="text"
                                    value={newUserData.email !== undefined ? newUserData.email : userData.email}
                                    placeholder={`${userData.email}`}
                                    onChange={handleEmailChange}
                                />
                            </div>
                            <div>
                                <input
                                    className="w-11/12 mb-5 h-6 border"
                                    type="text"
                                    value={newUserData.contactNumber !== undefined ? newUserData.contactNumber : userData.contactNumber}
                                    placeholder={userData.contactNumber ? userData.contactNumber : "No Phone Number"}
                                    onChange={handleContactNumberChange}
                                />
                            </div>
                            <div>
                                <input
                                    className="w-11/12 mb-5 h-6 border"
                                    type="text"
                                    value={newUserData.address !== undefined ? newUserData.address : userData.address}
                                    placeholder={userData.address ? userData.address : "N/A"}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <div className="mb-5 text-sm">
                                <div>
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="male"
                                        checked={newUserData.gender === 'male'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="male"> Male</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="female"
                                        checked={newUserData.gender === 'female'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="female"> Female</label>
                                </div>
                                <div>
                                    <input 
                                        type="radio" 
                                        name="gender" 
                                        value="others" 
                                        checked={newUserData.gender === 'others'}
                                        onChange={handleGenderChange}
                                    />
                                    <label htmlFor="others"> Others</label>
                                </div>
                            </div>
                            <div>
                                <p className="w-11/12 mb-5 h-6">
                                    {formatDate(userData.dateOfBirth)}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-[270px] h-2/3 flex flex-col py-6 border-l border-gray-300 justify-center items-center">
                        {/* <div className="w-20 h-20">
                            <img
                                className="w-full h-full rounded-full object-cover overflow-hidden"
                                src={image}
                                alt=""
                            />
                        </div> */}
                        <ImageHolder
                            source={ postImage }
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
                        className="mt-3 w-[120px] py-1 rounded cursor-pointer bg-[rgba(33, 28, 106)] border hover:border-violet-500 hover:bg-[#211C6A] hover:text-white hover:font-bold focus:ring-opacity-50 text-md"
                        onClick={updateAccountDetails}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export const UserPassword = () => {

    const [userData, setUserData] = useState({});


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    const handleConfirm = async () => {
        if (newPassword1 === newPassword2 && newPassword1 !== '' && newPassword2 !== '') {
            console.log('Passwords match!');
            await updatePassword();
        } else {
            console.log('Passwords do not match!');
            alert('Passwords do not match!');
        }
    };

    const updatePassword = async () => {
        try {
            const response = await axios.patch(
                "http://localhost:5000/api/v1/user/updateUserPassword",
                {   
                    currentPassword: currentPassword,
                    newPassword: newPassword1,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(response.status)
            if (response.status === 200) {
                console.log(response.data.msg);
                alert(response.data.msg);
            } else {
                console.log(response.data.error);
                alert(response.data.error);
            }
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Error updating password:', error);
        }
    };

    const fetchAccountDetails = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5000/api/v1/auth/getAccountDetails",
                {
                    withCredentials: true,
                }
            );
            setUserData(response.data.user);
            console.log(response.data.user);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchAccountDetails();
    }, []);

    return (
        <div className="flex">
            <div className="ml-40 w-[250px] flex-wrap flex flex-col">
                <div className="flex-wrap flex flex-row px-5 py-6 border-gray-300">
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full rounded-full object-cover overflow-hidden"
                            src={
                                userData.image
                                    ? userData.image
                                    : defaultProfileImage
                            }
                            alt=""
                        />
                    </div>
                    <div className="ml-3 w-36 h-10 flex flex-col text-sm">
                        <p className="font-bold truncate">
                            {userData.firstName} {userData.lastName}
                        </p>
                        <div className="flex flex-row text-sm">
                            <FaEdit size={18} />
                            <p className="truncate">Edit profile</p>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    <hr className="border-t border-gray-300 w-5/6" />
                </div>
                <div className="flex flex-row mt-5 px-5 py-6">
                    <div className="w-1/5 flex flex-col justify-center items-center">
                        <div className="mb-24">
                            <MdAccountCircle size={24} />
                        </div>

                        <div className="mb-7">
                            <FaClockRotateLeft size={24} />
                        </div>
                        <div>
                            <FaBell size={24} />
                        </div>
                    </div>
                    <div className="px-3 w-4/5 flex flex-col justify-center text-sm">
                        <a
                            href="/#"
                            className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            My Account
                        </a>
                        <a
                            href="/customeraccount"
                            className="mb-1 p-1 hover:bg-[#211C6A] hover:text-white "
                        >
                            Profile
                        </a>
                        <a
                            href="/customeraccount=password"
                            className="mb-3 p-1 bg-[#211C6A] text-white"
                        >
                            Set Password
                        </a>
                        <a
                            href="/#"
                            className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Purchase History
                        </a>
                        <a
                            href="/notifications"
                            className="p-1 hover:bg-[#211C6A] hover:text-white"
                        >
                            Notifications
                        </a>
                    </div>
                </div>
            </div>

            <div className="w-[950px] flex-wrap flex flex-col px-10 py-6 bg-white">
                <p className="text-xl">My Password</p>
                <p className="text-sm">Update and set password</p>
                <hr className="border-t border-gray-300 my-4" />
                <div className="w-1/1 flex-wrap flex">
                    <div className="w-1/4 flex flex-col px-5 py-6 text-sm">
                        <p className="mb-6">Current Password</p>
                        <p className="mb-6">New Password</p>
                        <p>Confirm New Password</p>
                    </div>
                    <div className="w-3/4 flex flex-wrap flex-col px-5 py-6">
                        <div className="flex flex-row">
                            <input
                                className="w-1/2 mb-4 h-6 border text-sm px-1"
                                type="Password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                className="w-1/2 mb-4 h-6 border text-sm px-1"
                                type="Password"
                                value={newPassword1}
                                onChange={(e) => setNewPassword1(e.target.value)}
                            />
                        </div>
                        <div>
                            <input 
                                className="w-1/2 h-6 border text-sm px-1" 
                                type="Password" 
                                value={newPassword2}
                                onChange={(e) => setNewPassword2(e.target.value)}
                            />
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