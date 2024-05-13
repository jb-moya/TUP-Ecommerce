import React, { useState } from 'react';
import { MdDashboard } from "react-icons/md";
import { BiPurchaseTag } from "react-icons/bi";
import { IoBag } from "react-icons/io5";
import { RiAdvertisementFill } from "react-icons/ri";
import {DashboardFrame} from "./DashboardFrame.js"
import { Orders } from './Orders.js';
import Products from './Products.js';

const SellerSettingsNew = () => {
    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    const [selectedButton, setSelectedButton] = useState(1); // Changed initial value to 1 for Dashboard

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };

    return (
        <div className='flex text-[#211C6A] pt-[96px]'>
            <div className='flex w-full max-w-[1240px] h-full mx-auto p-4 '>
                <div className='w-[300px] flex flex-col m-4 bg-white shadow-md'>
                    <div className='flex justify-center items-center my-4 p-2'>
                        <img
                            className='rounded-full h-[60px] w-[60px]'
                            src={imgUrl()}
                            alt="Logo Here"
                        />

                        <div className='flex justify-center items-center text-sm font-semibold py-2 px-4'>
                            Organization Name
                        </div>
                    </div>

                    <div className="w-full flex justify-center">
                        <hr className="border-t border-gray-300 w-5/6" />
                    </div>

                    {/*Dashboard*/}
                    <button onClick={() => handleButtonClick(1)} className={`flex flex-col hover:bg-[#211C6A] hover:opacity-50 transition ease-in-out duration-200 hover:text-white mt-4 ${selectedButton === 1 ? 'bg-[#211C6A] text-white' : ''}`}>
                        <div className='flex items-center mx-8 '>
                            <MdDashboard
                                size={20} />
                            <p className=' p-4 font-medium text-sm'>Dashboard</p>
                        </div>
                    </button>

                    {/* Orders */}
                    <button onClick={() => handleButtonClick(2)} className={`flex flex-col hover:bg-[#211C6A] hover:opacity-50 transition ease-in-out duration-200 hover:text-white ${selectedButton === 2 ? 'bg-[#211C6A] text-white' : ''}`}>
                        <div className='flex items-center mx-8 '>
                            <BiPurchaseTag
                                size={20} />
                            <p className=' p-4 font-medium text-sm'>Orders</p>
                        </div>
                    </button>

                    {/* Product */}
                    <button onClick={() => handleButtonClick(3)} className={`flex flex-col hover:bg-[#211C6A] hover:opacity-50 transition ease-in-out duration-200 hover:text-white ${selectedButton === 3 ? 'bg-[#211C6A] text-white' : ''}`}>
                        <div className='flex items-center mx-8 '>
                            <IoBag
                                size={20} />
                            <p className=' p-4 font-medium text-sm'>Product</p>
                        </div>
                    </button>

                    {/* Advertisement */}
                    <button onClick={() => handleButtonClick(4)} className={`flex flex-col hover:bg-[#211C6A] hover:opacity-50 transition ease-in-out duration-200 hover:text-white ${selectedButton === 4 ? 'bg-[#211C6A] text-white' : ''}`}>
                        <div className='flex items-center mx-8 '>
                            <RiAdvertisementFill
                                size={20} />
                            <p className=' p-4 font-medium text-sm'>Advertisement</p>
                        </div>
                    </button>
                </div>

                {/* Render content based on selectedButton */}
                <div className='font-semibold p-4 max-w-[900px] w-full'>
                    {selectedButton === 1 && (
                        <DashboardFrame />

                    )}
                    {selectedButton === 2 && (
                        <Orders />
                    )}
                    {selectedButton === 3 && (
                        <Products />
                    )}
                    {selectedButton === 4 && (
                        <div>Content for Advertisement</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SellerSettingsNew;
