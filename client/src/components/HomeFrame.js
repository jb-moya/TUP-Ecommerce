import React from 'react';
import { useNavigate } from 'react-router-dom';


// Logo

import Logo1 from '../OrganizationAssets/logoipsum-329.svg'
import Logo2 from '../OrganizationAssets/logoipsum-330.svg'
import Logo3 from '../OrganizationAssets/logoipsum-331.svg'
import Logo4 from '../OrganizationAssets/logoipsum-332.svg'
import Logo5 from '../OrganizationAssets/logoipsum-321.svg'
import Logo6 from '../OrganizationAssets/logoipsum-323.svg'
import Logo7 from '../OrganizationAssets/logoipsum-325.svg'


// Slider

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/autoplay';

const HomeFrame = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        // Navigate to the desired route
        navigate('/signup');
    };

    const handleSeeMore = () => {
        // Navigate to the desired route
        navigate('/');
    };

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    function createSlide() {
        return (
            <SwiperSlide>
                <img className="w-[800px] h-[521px]" src={imgUrl()} alt="" />
            </SwiperSlide>
        );
    }

    return (
        <div className='flex flex-col text-[#211C6A] items-center justify-center pt-[96px]'>

            <div className='flex w-full h-[220px] max-w-[1240px] mx-auto select-none justify-center z-1'>

                <div className='hidden md:flex flex-col items-center mt-4'>
                    <h1 className='font-bold text-4xl'>
                        Elevate Your University Experience
                    </h1>
                    <p className='max-w-[640px] text-center'>
                        <br />
                        Gear up, students! Shop our exclusive university organization merch now. <br />
                        Show your school pride and support your peers with every purchase. <br />
                        Let's elevate our campus experience together!
                    </p>
                    <button onClick={handleClick} className='border border-[#211C6A] text-[#211C6A] mt-5 hover:bg-[#e8e8e8] font-semibold p-[10px] w-[150px]'>
                        Sign Up
                    </button>
                </div>

            </div>

            <div className='flex max-w-[1240px] w-full '>
                <div className=' w-[800px] h-[521px] my-5 mt-4'>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        slidesPerView={1}
                        navigation
                        autoplay={{ delay: 3000 }}
                        pagination={{ clickable: true }}
                    >
                        {createSlide()}
                        {createSlide()}
                        {createSlide()}
                        {createSlide()}
                        {createSlide()}
                    </Swiper>

                </div>

                <div className='flex flex-col w-full h-[521px] my-5 mt-4'>
                    <img className="w-[220x] h-[260.5px] ml-2 mb-2 bg-cover" src={imgUrl()} alt="" />

                    <img className="w-[220x] h-[260.5px] ml-2 bg-cover" src={imgUrl()} alt="" />
                </div>
            </div>

            <div className='flex flex-row justify-between max-w-[1240px] w-[1000px] h-20 mb-4 mx-auto'>

                <img
                    className="w-20 h-20"
                    src={Logo1}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo2}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo3}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo4}
                    alt="Logo Here"
                    loading="lazy"
                />
                <img
                    className="w-20 h-20"
                    src={Logo5}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo6}
                    alt="Logo Here"
                    loading="lazy"
                />

                <img
                    className="w-20 h-20"
                    src={Logo7}
                    alt="Logo Here"
                    loading="lazy"
                />
            </div>

            <div className='h-[350px] max-w-[1240px] w-full mb-4'>
                <div className='grid grid-cols-2  max-w-[1240px] w-full gap-4'>
                    <div className="text-xl font-semibold col-span-2 h-[50px] p-4 ">CATEGORIES</div>
                    <img className="h-[140px] w-full bg-cover " src={imgUrl()} alt="Logo Here" loading="lazy" />
                    <img className="h-[140px] w-full bg-cover " src={imgUrl()} alt="Logo Here" loading="lazy" />
                    <img className="h-[140px] w-full bg-cover " src={imgUrl()} alt="Logo Here" loading="lazy" />
                    <img className="h-[140px] w-full bg-cover " src={imgUrl()} alt="Logo Here" loading="lazy" />
                </div>
            </div>


            <div className='flex flex-col bg-white h-[280px] max-w-[1240px] w-full mb-4 mt-4'>
                <h1 className='font-bold p-4'>
                    TOP PRODUCTS
                </h1>
                <hr className='border-[#211C6A]'></hr>
                <div className='flex justify-between items-center m-4 font-semibold'>
                    <div className='flex flex-col'>
                        <img className="w-[150px] h-[150px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <h2 className='mt-2 mb-2 mr-2'>Lorem Ipsum</h2>
                    </div>
                    <div className='flex flex-col'>
                        <img className="w-[150px] h-[150px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <h2 className='mt-2 mb-2 mr-2'>Lorem Ipsum</h2>
                    </div>
                    <div className='flex flex-col'>
                        <img className="w-[150px] h-[150px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <h2 className='mt-2 mb-2 mr-2'>Lorem Ipsum</h2>
                    </div>
                    <div className='flex flex-col'>
                        <img className="w-[150px] h-[150px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <h2 className='mt-2 mb-2 mr-2'>Lorem Ipsum</h2>
                    </div>
                    <div className='flex flex-col'>
                        <img className="w-[150px] h-[150px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <h2 className='mt-2 mb-2 mr-2'>Lorem Ipsum</h2>
                    </div>
                    <div className='flex flex-col'>
                        <img className="w-[150px] h-[150px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <h2 className='mt-2 mb-2 mr-2'>Lorem Ipsum</h2>
                    </div>
                    <div className='flex flex-col'>
                        <img className="w-[150px] h-[150px]" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <h2 className='mt-2 mb-2 mr-2'>Lorem Ipsum</h2>
                    </div>
                </div>
            </div>

            <div className='flex flex-col bg-white h-[950px] max-w-[1240px] w-full'>
                <h1 className='font-bold p-4'>
                    DISCOVER YOUR PRODUCTS
                </h1>
                <hr className='border-[#211C6A]'></hr>
                <div className='grid grid-cols-6 gap-4 m-4'>
                <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col h-[250px] border border-[#211C6A]">
                        <img className="h-[150px] w-full" src={imgUrl()} alt="Logo Here" loading="lazy" />
                        <div className='flex flex-col m-2 text-sm overflow-hidden'>
                            <p className='line-clamp-2'>
                                Basics Cotton Oversized TShirt for Men 2022 Tshirt Essential Tees
                            </p>
                            <div className='flex mt-4 justify-between'>
                                <p className='text-[#7d74f2]'>₱190</p>
                                <p>1k+ Sold</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center justify-center m-4 select-none'>
                    <button onClick={handleSeeMore} className='border border-[#211C6A] text-[#211C6A] hover:bg-[#e8e8e8] font-semibold p-[10px] w-[150px]'>
                            See More
                    </button>
                </div>
               
            </div>

        </div>
    )
}

export default HomeFrame;
