import React from "react";
import { FaSearch } from "react-icons/fa";
import { CiShop } from "react-icons/ci";

const PurchaseHistory = () => {

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }


    return (
        <div className="flex flex-col text-[#211C6A] w-[850px]">
            <div className="flex justify-between">
                <div className=" my-4 text-lg font-bold ">
                    My Purchase History
                </div>
                <div className="flex flex-row items-center h-full justify-center">
                    <div className='flex justify-end text-[#211C6A]  '>
                        <select className='border border-[#211C6A] rounded-md h-9 w-32 px-2 outline-none text-sm' defaultValue='Filter By'>
                            <option value='popular'>Filter by</option>
                            <option value='latest'>Price</option>
                            <option value='latest'>Date</option>
                        </select>
                    </div>
                    <div className="relative">
                        <input
                            className="mx-4 bg-white border border-[#211C6A] rounded-md py-2 px-4 pl-10 text-sm appearance-none outline-none "
                            placeholder="Search"
                        />
                        <FaSearch className="absolute top-[10px] left-8 text-[#211C6A]" />
                    </div>
                </div>
            </div>

            <div className="flex bg-white w-full mb-4">
                <div className="flex flex-row justify-between w-full p-4">
                    <div className="flex flex-row w-full">
                        <img className="h-[100px] w-[100px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className="flex flex-col px-4 py-2">
                            <h1 className="text-lg">
                                TShirt ni Gaspar at ni Kokey
                            </h1>
                            <div className="flex flex-col justify-between h-full">
                                <h1 className="text-xs">
                                    Quantity: 2
                                </h1>
                                <p className="text-sm">
                                    Order Total: ₱200
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[130px] justify-between">
                        <button className="flex border hover:bg-gray-200  border-[#211C6A] text-[#211C6A] text-xs items-center justify-center h-10 rounded-md">
                            <CiShop size={25} 
                            className="mr-2"/> View Shop
                        </button>
                        <button className="flex bg-[#211C6A] hover:bg-opacity-70   text-white items-center justify-center h-10 text-sm p-4 rounded-md">
                            Buy Again
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex bg-white w-full mb-4">
                <div className="flex flex-row justify-between w-full p-4">
                    <div className="flex flex-row w-full">
                        <img className="h-[100px] w-[100px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className="flex flex-col px-4 py-2">
                            <h1 className="text-lg">
                                TShirt ni Gaspar at ni Kokey
                            </h1>
                            <div className="flex flex-col justify-between h-full">
                                <h1 className="text-xs">
                                    Quantity: 2
                                </h1>
                                <p className="text-sm">
                                    Order Total: ₱200
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[130px] justify-between">
                        <button className="flex border hover:bg-gray-200  border-[#211C6A] text-[#211C6A] text-xs items-center justify-center h-10 rounded-md">
                            <CiShop size={25} 
                            className="mr-2"/> View Shop
                        </button>
                        <button className="flex bg-[#211C6A] hover:bg-opacity-70   text-white items-center justify-center h-10 text-sm p-4 rounded-md">
                            Buy Again
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex bg-white w-full mb-4">
                <div className="flex flex-row justify-between w-full p-4">
                    <div className="flex flex-row w-full">
                        <img className="h-[100px] w-[100px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className="flex flex-col px-4 py-2">
                            <h1 className="text-lg">
                                TShirt ni Gaspar at ni Kokey
                            </h1>
                            <div className="flex flex-col justify-between h-full">
                                <h1 className="text-xs">
                                    Quantity: 2
                                </h1>
                                <p className="text-sm">
                                    Order Total: ₱200
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col w-[130px] justify-between">
                        <button className="flex border hover:bg-gray-200  border-[#211C6A] text-[#211C6A] text-xs items-center justify-center h-10 rounded-md">
                            <CiShop size={25} 
                            className="mr-2"/> View Shop
                        </button>
                        <button className="flex bg-[#211C6A] hover:bg-opacity-70   text-white items-center justify-center h-10 text-sm p-4 rounded-md">
                            Buy Again
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default PurchaseHistory;
