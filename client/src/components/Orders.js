import React, { useState } from 'react'
import { CiDeliveryTruck } from "react-icons/ci";

export const Orders = () => {


    const [selectedButton, setSelectedButton] = useState(1); // Changed initial value to 1 for Dashboard

    const handleButtonClick = (buttonNumber) => {
        setSelectedButton(buttonNumber);
    };


    const [selectedButton1, setSelectedButton1] = useState(1); // Changed initial value to 1 for Dashboard

    const handleButtonClick1 = (buttonNumber1) => {
        setSelectedButton1(buttonNumber1);
    };

    return (
        <div className="flex mx-auto select-none items-center ">
            <div className="flex flex-col w-full">
                <div className="text-3xl pl-4 font-bold text-[#211C6A] w-full mb-4">
                    My Orders
                </div>
                <ul className='flex border-b-2 border-gray-200 w-full px-4 justify-between text-gray-500'>
                    <li onClick={() => handleButtonClick(1)} className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 1 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        All
                    </li>
                    <li onClick={() => handleButtonClick(2)} className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 2 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Unpaid
                    </li>
                    <li onClick={() => handleButtonClick(3)} className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 3 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        To Ship
                    </li>
                    <li onClick={() => handleButtonClick(4)} className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 4 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Shipping
                    </li>
                    <li onClick={() => handleButtonClick(5)} className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 5 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Completed
                    </li>
                    <li onClick={() => handleButtonClick(6)} className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 6 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Cancellation
                    </li>
                    <li onClick={() => handleButtonClick(7)} className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 7 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Return/Refund
                    </li>
                </ul>

                <div className='flex flex-row w-full items-center justify-between'>
                    <input
                        className=' appearance-none outline-none bg-transparent border border-[#211C6A] px-4 py-2 rounded-md w-[250px] mt-4 text-sm ml-6'
                        placeholder='Search Orders'
                    />

                    <div className='text-sm flex items-center mt-4 ml-6'>
                        <div>Order Creation Date:</div>
                        <input className='rounded-md border border-[#211C6A] px-4 py-2 mx-4 text-gray-500'
                            type="date" />
                        -
                        <input className='rounded-md border border-[#211C6A] px-4 py-2 mx-4 text-gray-500'
                            type="date" />
                    </div>
                </div>

                <div className='flex border-b-2 border-gray-200 px-4 justify-between w-full text-gray-500  text-sm mt-16'>
                    <ul className='flex w-[370px] justify-between pl-2 mb-2 '>
                        <li onClick={() => handleButtonClick1(1)} className={`p-4 px-6 cursor-pointer  hover:bg-[#211C6A] hover:text-white hover:rounded-md border-[#211C6A] transition ease-in-out duration-200 ${selectedButton1 === 1 ? ' bg-[#211C6A] rounded-md border-b-[#EFEFEF] text-white' : ''}`}>
                            All 0
                        </li>

                        <li onClick={() => handleButtonClick1(2)} className={`p-4 px-6 cursor-pointer border-[#211C6A]  hover:bg-[#211C6A] hover:text-white hover:rounded-md transition ease-in-out duration-200 ${selectedButton1 === 2 ? ' bg-[#211C6A] rounded-md border-b-[#EFEFEF] text-white' : ''}`}>
                            To Process 0
                        </li>

                        <li onClick={() => handleButtonClick1(3)} className={`p-4 px-6 cursor-pointer border-[#211C6A] hover:bg-[#211C6A] hover:text-white hover:rounded-md  transition ease-in-out duration-200 ${selectedButton1 === 3 ? ' bg-[#211C6A] rounded-md border-b-[#EFEFEF] text-white' : ''}`}>
                            Processed 0
                        </li>
                    </ul>
                </div>

                <div className='flex justify-between mt-2 p-4 '>
                    <div className='text-lg'>
                        Orders
                    </div>
                    <div className='flex items-center'>
                        <div className='flex items-center text-sm'>
                            Sort By:
                            <select className="ml-2 border border-[#211C6A] rounded-md p-2 bg-transparent outline-none ">
                                <option value="option1">Orders Confirmed</option>
                                <option value="option2">Option 2</option>
                                <option value="option3">Option 3</option>
                            </select>
                        </div>
                        <div className='px-4 py-2 rounded-md flex justify-center items-center text-white bg-[#211C6A] text-sm ml-4 cursor-pointer hover:text-[#211C6A] hover:bg-gray-300 transition ease-in-out duration-300'>
                            <CiDeliveryTruck size={20} className='' />
                            <div className='ml-2'>Ship My Orders</div>
                        </div>
                    </div>
                </div>

                <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-sm ">
                    <thead>
                        <tr className="text-left bg-gray-300">
                            <th className="p-2" colSpan="4">Product(s)</th>
                            <th className="p-2">Order Total</th>
                            <th className="p-2">Status</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t">
                            <td className="p-2" colSpan="4"> {/* Spanning two columns */}
                                Tshirt ni Gaspar
                            </td>
                            <td className="p-2">
                                P100
                            </td>
                            <td className="p-2">
                                Shipping
                            </td>
                            <td className="p-2">
                                
                            </td>
                        </tr>

                        
                    </tbody>
                </table>
            </div>


        </div>
    )
}
