import React, { useState } from 'react'
import { FaPlus, FaTrash } from "react-icons/fa";


export default function Products() {
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
        <div className="flex mx-auto select-none items-center ">
            <div className="flex flex-col w-full">
                <div className="text-3xl pl-4 font-bold text-[#211C6A] w-full mb-4">
                    My Products
                </div>
                <ul className='flex border-b-2 border-gray-200 w-full px-4 text-gray-500'>
                    <li onClick={() => handleButtonClick(1)} className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 1 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        All
                    </li>
                    <li onClick={() => handleButtonClick(2)} className={`p-4  mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 2 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Live
                    </li>
                    <li onClick={() => handleButtonClick(3)} className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 3 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Sold Out
                    </li>
                    <li onClick={() => handleButtonClick(4)} className={`p-4 mr-4  cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 4 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Suspended 1
                    </li>
                    <li onClick={() => handleButtonClick(5)} className={`p-4 mr-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 5 ? 'border-b-[#211C6A] border-b-2 text-[#211C6A]' : ''}`}>
                        Unlisted
                    </li>
                </ul>

                <div className='flex flex-row w-full items-center justify-between'>
                    <input
                        className=' appearance-none outline-none bg-transparent border border-[#211C6A] px-4 py-2 rounded-md w-[250px] mt-4 text-sm ml-6'
                        placeholder='Input Product Name'
                    />

                    <div className='text-sm flex items-center mt-4 ml-6'>
                        <div className='flex items-center text-sm'>
                            Category
                            <select className="ml-4 border border-[#211C6A] w-[400px] rounded-md p-2 bg-transparent outline-none">
                                <option value="option1">Category 1</option>
                                <option value="option2">Category 2</option>
                                <option value="option3">Category 3</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className='flex flex-row w-full items-center justify-between'>
                    <div className='text-sm flex items-center mt-4 ml-6 '>
                        <div>Stock</div>
                        <input className='rounded-md border border-[#211C6A] px-4 py-2 mx-4 w-24 text-gray-500 appearance-none outline-none bg-transparent'
                            placeholder="Input"
                        />
                        ~
                        <input className='rounded-md border border-[#211C6A] px-4 py-2 mx-4 w-24 text-gray-500 appearance-none outline-none bg-transparent'
                            placeholder="Input"
                        />
                    </div>

                    <div className='text-sm flex items-center mt-4 ml-6'>
                        <div>Sales</div>
                        <input className='rounded-md border border-[#211C6A] px-4 py-2 mx-4 w-24 text-gray-500 appearance-none outline-none bg-transparent'
                            placeholder="Input"
                        />
                        ~
                        <input className='rounded-md border border-[#211C6A] px-4 py-2 w-24 ml-4 text-gray-500 appearance-none outline-none bg-transparent'
                            placeholder="Input"
                        />
                    </div>
                </div>

                <div className='mt-6 ml-6 text-sm'>
                    <button className='p-2 bg-[#211C6A] text-white rounded-md hover:bg-opacity-50 w-24 transition ease-in-out duration-300'>
                        Search
                    </button>
                    <button className='p-2 bg-transparent text-[#211C6A] hover:bg-gray-300 border w-24  border-[#211C6A] rounded-md ml-4'>
                        Reset
                    </button>

                </div>

                <div className='flex flex-col mt-10 ml-6'>
                    <div className='flex  justify-between items-center'>
                        <div className='text-xl font-semibold'>5 Products</div>

                        <div className='flex justify-between items-center'>
                            <div className='flex items-center justify-center bg-[#211C6A] text-white rounded-md mr-4 px-4 py-3 cursor-pointer hover:bg-opacity-50 transition ease-in-out duration-300'>
                                <FaPlus
                                    className='mr-2' />
                                Add a New Product
                            </div>
                            <div className='flex items-center justify-center bg-red-600 text-white rounded-md px-4 py-3 cursor-pointer hover:bg-opacity-50 transition ease-in-out duration-300'>
                                <FaTrash
                                    className='mr-2' />
                                Delete Product
                            </div>
                        </div>
                    </div>


                    <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-sm">
                        <thead>
                            <tr className="text-left bg-gray-300">
                                <th className="p-2"><input type="checkbox" /></th> {/* Moved the Select header here */}
                                <th className="p-2">Product Name</th>
                                <th className="p-2">Stocks</th>
                                <th className="p-2 text-center">Variation Class</th>
                                <th className="p-2">Description</th>
                                <th className="p-2">Category</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            <tr className="border-t text-xs">
                                <td className="p-2"><input type="checkbox" /></td> {/* Moved the checkbox column here */}
                                <td className="p-2 flex items-center">
                                    <img src={imgUrl()} className="w-12 h-12" />
                                    <div className="ml-4">TShirt ni Gaspar</div>
                                </td>
                                <td className="p-2">10</td>
                                <td className="p-2">Variation 1</td>
                                <td className="p-2 text-left">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</td>
                                <td className="p-2">Clothing</td>
                                <td className="p-2">Edit | Delete</td>
                            </tr>
                            <tr className="border-t text-xs">
                                <td className="p-2"><input type="checkbox" /></td> {/* Moved the checkbox column here */}
                                <td className="p-2 flex items-center">
                                    <img src={imgUrl()} className="w-12 h-12" />
                                    <div className="text-xs ml-4">TShirt ni Gaspar</div>
                                </td>
                                <td className="p-2">5</td>
                                <td className="p-2">Variation 2</td>
                                <td className="p-2 text-left">Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</td>
                                <td className="p-2">Clothing</td>
                                <td className="p-2">Edit | Delete</td>
                            </tr>
                        </tbody>
                    </table>



                </div>

            </div>

        </div>
    )
}
