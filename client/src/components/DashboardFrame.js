import React from 'react'
import { FaShoppingCart } from "react-icons/fa";
import { IoMdCash } from "react-icons/io";
import { TbBasketCancel } from "react-icons/tb";

export const DashboardFrame = () => {
    return (
        <div>
            <div className='flex max-w-[1240px] pt-[90px] mx-auto select-none items-center p-4'>
                <div className='flex flex-col m-4 w-full'>
                    <div className='text-3xl font-bold text-[#211C6A] w-full mb-4'>
                        Dashboard
                    </div>

                    <div className='flex flex-row w-full justify-between mb-4 px-2'>
                        <div className='w-[380px] h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-md'>
                            <div className='flex items-center justify-between  p-6 text-white w-full'>
                                <div className='flex flex-col'>
                                    <h2 className='text-3xl mb-2'>458</h2>
                                    <p className='text-sm'>Items Delivered</p>
                                </div>
                                <FaShoppingCart  
                                className='mr-4'
                                size={40}/>
                            </div>
                        </div>

                        <div className='w-[380px] h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-md'>

                        <div className='flex items-center justify-between  p-6 text-white w-full'>
                                <div className='flex flex-col'>
                                    <h2 className='text-3xl mb-2'>69</h2>
                                    <p className='text-sm'>Items Refunded</p>
                                </div>
                                <IoMdCash  
                                className='mr-4'
                                size={40}/>
                            </div>

                        </div>

                        <div className='w-[380px] h-[150px] bg-gradient-to-br from-[#b1ade6] to-[#211C6A] rounded-md'>

                        <div className='flex items-center justify-between  p-6 text-white w-full'>
                                <div className='flex flex-col'>
                                    <h2 className='text-3xl mb-2'>203</h2>
                                    <p className='text-sm'>Cancelled Orders</p>
                                </div>
                                <TbBasketCancel  
                                className='mr-4'
                                size={40}/>
                            </div>
                        </div>


                    </div>

                    <div className='bg-white w-full shadow-md p-6'>
                        <div className='text-lg font-bold text-[#211C6A] w-full px-2'>
                            Sales
                        </div>
                        <hr className="border-[#211C6A] "></hr>

                        <select
                            className="pl-4 pr-24 h-12 w-full text-[#211C6A] border border-[#211C6A] appearance-none outline-none my-4"
                            defaultValue=""
                        >
                            <option value="" disabled hidden>Filters</option>
                            <option value="popular">Sort By Increasing</option>
                            <option value="latest">Sort By Decreasing</option>
                        </select>

                        <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full">
                            <thead>
                                <tr className='text-left'>
                                    <th className="p-2">Product ID</th>
                                    <th className="p-2">Product Name</th>
                                    <th className="p-2">Quantity</th>
                                    <th className="p-2">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Here you can map your data and generate rows */}
                                <tr className='border-t'>
                                    <td className="p-2">123</td>
                                    <td className="p-2">Product 1</td>
                                    <td className="p-2">5</td>
                                    <td className="p-2">10.00</td>
                                </tr>
                                <tr className='border-t'>
                                    <td className="p-2">456</td>
                                    <td className="p-2">Product 2</td>
                                    <td className="p-2">3</td>
                                    <td className="p-2">15.00</td>
                                </tr>
                                <tr className='border-t'>
                                    <td className="p-2">456</td>
                                    <td className="p-2">Product 2</td>
                                    <td className="p-2">3</td>
                                    <td className="p-2">15.00</td>
                                </tr>
                                <tr className='border-t'>
                                    <td className="p-2">456</td>
                                    <td className="p-2">Product 2</td>
                                    <td className="p-2">3</td>
                                    <td className="p-2">15.00</td>
                                </tr>
                                <tr className='border-t'>
                                    <td className="p-2">456</td>
                                    <td className="p-2">Product 2</td>
                                    <td className="p-2">3</td>
                                    <td className="p-2">15.00</td>
                                </tr>
                                <tr className='border-t'>
                                    <td className="p-2">456</td>
                                    <td className="p-2">Product 2</td>
                                    <td className="p-2">3</td>
                                    <td className="p-2">15.00</td>
                                </tr>
                                {/* More rows can be added dynamically based on your data */}
                            </tbody>
                        </table>



                    </div>

                </div>
            </div>
        </div>
    )
}
