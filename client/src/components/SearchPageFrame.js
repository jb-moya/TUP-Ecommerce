import React from 'react'
import { useNavigate } from 'react-router-dom';

export const SearchPageFrame = () => {

    const navigate = useNavigate();

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    const handleSeeMore = () => {
        // Navigate to the desired route
        navigate('/');
    };


    return (
        <div>
            <div className='flex max-w-[1240px] pt-[90px] mx-auto select-none p-4 mt-4 text-[#211C6A] '>
                {/* Right Container */}
                <div className='flex flex-col h-full w-[250px] p-2'>
                    <div className='font-bold text-3xl '>
                        Filters
                    </div>
                    <hr className="border-t border-gray-300" />
                    <div className='flex flex-col'>
                        <div className='py-4 px-2 font-semibold text-lg'>
                            Price Range
                        </div>
                        <div className='flex flex-row items-center'>
                            <input
                                className='border border-gray-300 appearance-none outline-none w-[80px] px-2 py-1 text-sm text-gray-800'
                                type="number"
                                placeholder='₱ MIN' />
                            <hr className='border border-gray-300 flex-grow mx-2'></hr>
                            <input
                                className='border border-gray-300 appearance-none outline-none w-[80px] px-2 py-1  text-sm text-gray-800'
                                type="number"
                                placeholder='₱ MAX' />
                        </div>
                    </div>
                </div>

                {/* Left Container */}
                <div className='flex flex-col w-full'>
                    <div className='font-bold text-[30px] py-2 px-2'>
                        Search results for "Tshirt"
                    </div>
                    <div className='flex justify-end text-[#211C6A] mb-4 mr-4'>
                        <select className='border border-[#211C6A] h-10 w-40' defaultValue='popular'>
                            <option value='popular'>Sort By Popular</option>
                            <option value='latest'>Sort By Latest</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className='grid grid-cols-3 gap-9 m-4'>
                        <div className='flex flex-col w-[300px]'>
                            <img className="h-[300px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                            <div className='flex items-center justify-between pt-2'>
                                <p className='font-semibold'>TShirt ni Gaspar</p>
                                <p>M</p>
                            </div>
                            <p>₱190</p>
                        </div>
                        <div className='flex flex-col w-[300px]'>
                            <img className="h-[300px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                            <div className='flex items-center justify-between pt-2'>
                                <p className='font-semibold'>TShirt ni Gaspar</p>
                                <p>M</p>
                            </div>
                            <p>₱190</p>
                        </div>
                        <div className='flex flex-col w-[300px]'>
                            <img className="h-[300px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                            <div className='flex items-center justify-between pt-2'>
                                <p className='font-semibold'>TShirt ni Gaspar</p>
                                <p>M</p>
                            </div>
                            <p>₱190</p>
                        </div>
                        <div className='flex flex-col w-[300px]'>
                            <img className="h-[300px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                            <div className='flex items-center justify-between pt-2'>
                                <p className='font-semibold'>TShirt ni Gaspar</p>
                                <p>M</p>
                            </div>
                            <p>₱190</p>
                        </div>
                        <div className='flex flex-col w-[300px]'>
                            <img className="h-[300px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                            <div className='flex items-center justify-between pt-2'>
                                <p className='font-semibold'>TShirt ni Gaspar</p>
                                <p>M</p>
                            </div>
                            <p>₱190</p>
                        </div>
                        <div className='flex flex-col w-[300px]'>
                            <img className="h-[300px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                            <div className='flex items-center justify-between pt-2'>
                                <p className='font-semibold'>TShirt ni Gaspar</p>
                                <p>M</p>
                            </div>
                            <p>₱190</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-center m-4 select-none'>
                    <button onClick={handleSeeMore} className='border border-[#211C6A] text-[#211C6A] hover:bg-[#e8e8e8] font-semibold p-[10px] w-[150px]'>
                            See More
                    </button>
                </div>
                </div>
            </div>

        </div>
    )
}
