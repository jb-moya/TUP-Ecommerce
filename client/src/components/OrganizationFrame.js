import React from 'react'
import SampleLogo from '../OrganizationAssets/SampleLogo.png'
import { useNavigate } from 'react-router-dom';

const NewOrganizationFrame = () => {

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
            <div className='bg-[#211C6A] h-80'>
                <div className='flex h-full max-w-[1240px] pt-[90px] mx-auto select-none items-center p-4'>
                    <img
                        className='w-[150px] h-[150px] mr-4'
                        src={SampleLogo}
                        alt=''
                        loading='lazy'
                    />
                    <div className='flex flex-col h-[150px] w-[700px] text-white p-4'>
                        <h1 className='font-semibold text-4xl mb-4'>TUP GRAYHAWKS ROBOTICS</h1>
                        <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam sit amet nisl hendrerit blandit et et quam. Curabitur volutpat ultricies odio non tincidunt.</p>
                    </div>
                </div>
            </div>
            <div className='h-[135vh] max-w-[1240px] flex mx-auto m-4 p-4'>
                {/* Right Side */}
                <div className='flex flex-col text-[#211C6A] w-[250px]'>
                    <div class="flex items-center mb-4">
                        <h3 class='font-semibold text-3xl mr-4'>Filters</h3>
                        <span className="text-gray-400 cursor-pointer underline ">Clear Filters</span>
                    </div>
                    <h5 className='font-bold text-lg mb-4'>Categories</h5>
                    <div className='flex flex-col mb-4'>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4"
                            />
                            <span className="ml-2 ">TShirts</span>
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4"
                            />
                            <span className="ml-2 ">ID Laces</span>
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4"
                            />
                            <span className="ml-2 ">Pins</span>
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4"
                            />
                            <span className="ml-2 ">Jackets</span>
                        </label>
                        <label className="flex items-center mb-2">
                            <input
                                type="checkbox"
                                className="form-checkbox h-4 w-4"
                            />
                            <span className="ml-2 ">Pants</span>
                        </label>
                    </div>
                    <h5 className='font-bold mb-4 text-lg'>Colors</h5>
                    <div className='grid grid-cols-5 w-[150px] gap-2'>
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-red-500 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-blue-500 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-green-500 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-orange-500 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-yellow-500 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-stone-600 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-amber-800 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-green-300 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-cyan-400 border border-black" />
                        <div className="w-5 h-5 rounded-full cursor-pointer bg-violet-800 border border-black" />
                    </div>
                </div>
                <div className='flex flex-col w-full'>
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

export default NewOrganizationFrame