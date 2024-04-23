import React from "react";
import image from "../components/images/lake-louise-51543_1280.jpg";
import { FaEdit } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";
import { FaBell } from "react-icons/fa";

export const UserAccountDetails = () => {
    return (
        <div className="flex">
            <div className="ml-40 w-[250px] flex-wrap flex flex-col">
                <div className="flex-wrap flex flex-row px-5 py-6 border-gray-300">
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full rounded-full object-cover overflow-hidden"
                            src={image}
                            alt=""
                        />
                    </div>
                    <div className="ml-3 w-36 h-10 flex flex-col text-sm">
                        <p className="font-bold truncate">Alden Recharge Electric Boogaloo</p>
                        <div className="flex flex-row text-sm">
                            <FaEdit size={18}/>
                            <p className="truncate">Edit profile</p>
                        </div>
                    </div>
                       
                </div>
                <div className="w-full flex justify-center">
                    <hr className="border-t border-gray-300 w-5/6" />    
                </div>
                <div className="flex flex-row mt-5 px-5 py-6" >
                    <div className="w-1/5 flex flex-col justify-center items-center">
                        <div className="mb-24">
                            <MdAccountCircle size={24}/>
                        </div>

                        <div className="mb-7">
                            <FaClockRotateLeft size={24}/>
                        </div>
                        <div>
                            <FaBell size={24}/>
                        </div>
                    </div>
                    <div className="px-3 w-4/5 flex flex-col justify-center text-sm">
                        <a href="" className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white">
                            My Account
                            </a>
                        <a href="/customeraccount" className="mb-1 p-1 bg-[#211C6A] text-white">
                            Profile
                        </a>
                        <a href="/customeraccount=password" className="mb-3 p-1 hover:bg-[#211C6A] hover:text-white">Set 
                            Password
                        </a>
                        <a href="" className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white">
                            Purchase History
                        </a>
                        <a href="/notifications" className="p-1 hover:bg-[#211C6A] hover:text-white">Notifications</a>
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
                    <p className="mb-6">Address</p>
                    <p className="mb-6">Email</p>
                    <p className="mb-6">Phone Number</p>
                    <p className="mb-16">Gender</p>
                    <p className="mb-6">Date of Birth</p>
                    <p className="mb-3"></p>
                    </div>
                    <div className="w-3/4 flex-wrap flex flex-col px-5 py-6">
                    <div>
                        <input className="w-11/12 mb-5 h-6 border" type="text" />
                    </div>
                    <div>
                        <input className="w-11/12 mb-5 h-6 border" type="text" />
                    </div>
                    <div>
                        <input className="w-11/12 mb-5 h-6 border" type="text" />
                    </div>
                    <div>
                        <input className="w-11/12 mb-5 h-6 border" type="text" />
                    </div>
                    <div className="mb-5 text-sm">
                        <div>
                        <input type="radio" value="option1"/>
                        <label for="option1"> Male</label>
                        </div>
                        <div>
                        <input type="radio" value="option2"/>
                        <label for="option2"> Female</label>
                        </div>
                        <div>
                        <input type="radio" value="option3"/>
                        <label for="option3"> Others</label>
                        </div>
                    </div>
                    <div>
                        <input className="w-11/12 mb-5 h-6 border" type="text" />
                    </div>
                    </div>
                </div>
                <div className="w-[270px] h-2/3 flex flex-col py-6 border-l border-gray-300 justify-center items-center">
                    <div className="w-20 h-20">
                    <img
                        className="w-full h-full rounded-full object-cover overflow-hidden"
                        src={image}
                        alt=""
                    />
                    </div>
                    <button className="mt-3 w-[120px] py-1 rounded text-base cursor-pointer bg-gray-50 border hover:border-violet-500 focus:ring-opacity-50 text-sm">
                    Select Image
                    </button>
                    <div className="w-full flex flex-col px-7 py-6 truncate text-sm text-gray-500 justify-center items-center">
                    <p>File size: max 1 MB</p>
                    <p>File extension: .JPEG, .PNG</p>
                    </div>
                </div>
                </div>
                <div>
                <button className="mt-3 w-[120px] py-1 rounded cursor-pointer bg-[rgba(33, 28, 106)] border hover:border-violet-500 hover:bg-[#211C6A] hover:text-white hover:font-bold focus:ring-opacity-50 text-md">
                    Save
                </button>
                </div>
            </div>
        </div>
    );
};

export const UserPassword = () => {
    return (
        <div className="flex">
            <div className="ml-40 w-[250px] flex-wrap flex flex-col">
                <div className="flex-wrap flex flex-row px-5 py-6 border-gray-300">
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full rounded-full object-cover overflow-hidden"
                            src={image}
                            alt=""
                        />
                    </div>
                    <div className="ml-3 w-36 h-10 flex flex-col text-sm">
                        <p className="font-bold truncate">Alden Recharge Electric Boogaloo</p>
                        <div className="flex flex-row text-sm">
                            <FaEdit size={18}/>
                            <p className="truncate">Edit profile</p>
                        </div>
                    </div>
                       
                </div>
                <div className="w-full flex justify-center">
                    <hr className="border-t border-gray-300 w-5/6" />    
                </div>
                <div className="flex flex-row mt-5 px-5 py-6" >
                    <div className="w-1/5 flex flex-col justify-center items-center">
                        <div className="mb-24">
                            <MdAccountCircle size={24}/>
                        </div>

                        <div className="mb-7">
                            <FaClockRotateLeft size={24}/>
                        </div>
                        <div>
                            <FaBell size={24}/>
                        </div>
                    </div>
                    <div className="px-3 w-4/5 flex flex-col justify-center text-sm">
                        <a href="" className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white">
                            My Account
                            </a>
                        <a href="/customeraccount" className="mb-1 p-1 hover:bg-[#211C6A] hover:text-white ">
                            Profile
                        </a>
                        <a href="/customeraccount=password" className="mb-3 p-1 bg-[#211C6A] text-white">Set 
                            Password
                        </a>
                        <a href="" className="mb-5 p-1 hover:bg-[#211C6A] hover:text-white">
                            Purchase History
                        </a>
                        <a href="/notifications" className="p-1 hover:bg-[#211C6A] hover:text-white">Notifications</a>
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
                    <div className="w-3/4 flex-wrap flex flex-wrap flex-col px-5 py-6">
                        <div>
                            <input className="w-1/2 mb-4 h-6 border" type="text" />
                        </div>
                        <div>
                            <input className="w-1/2 mb-4 h-6 border" type="text" />
                        </div>
                        <div>
                            <input className="w-1/2 h-6 border" type="text" />
                        </div>
                    </div>
                </div>
                <div>
                    <button className="w-[120px] rounded cursor-pointer bg-[rgba(33, 28, 106)] border hover:border-violet-500 hover:bg-[#211C6A] hover:text-white hover:font-bold focus:ring-opacity-50 text-md">
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};