import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

export const ProductReviewForm = () => {
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
                <img className="w-[350px] h-[350px]" src={imgUrl()} alt="" />
            </SwiperSlide>
        );
    }

    return (
        <div className='flex flex-col max-w-[1240px] mx-auto mt-[96px] text-[#211C6A] justify-center'>
            <div className='text-5xl font-bold mt-8 text-center'>
                Product Review Form
            </div>
            <div className='bg-white border rounded-xl shadow-md w-full px-10 max-w-[1000px] mx-auto select-none z-1 mt-8'>
                <div className='text-2xl font-bold mt-8'>
                    Product Information
                </div>

                <div className='flex p-4'>
                    <div className='flex flex-col'>
                        <div className=" w-[350px] h-[350px]">
                            <Swiper
                                modules={[Navigation, Pagination, Autoplay]}
                                slidesPerView={1}
                                navigation
                                autoplay={{ delay: 3000 }}
                                pagination={{ clickable: true }}
                                className="rounded-2xl"
                            >
                                {createSlide()}
                                {createSlide()}
                                {createSlide()}
                                {createSlide()}
                                {createSlide()}
                            </Swiper>
                        </div>
                        <div className='flex w-full justify-between mt-4'>
                            <img 
                            src={imgUrl()}
                            className='w-[110px] h-[100px] rounded-xl' />
                            <img 
                            src={imgUrl()}
                            className='w-[110px] h-[100px] rounded-xl' />
                            <img 
                            src={imgUrl()}
                            className='w-[110px] h-[100px] rounded-xl' />
                        </div>

                    </div>
                   
                    <div className='flex flex-col '>
                        <div className='flex px-4 py-4'>
                            <label className='font-semibold mr-4 w-40'>Product Name:</label>
                            <span>TShirt ni Gaspar</span>
                        </div>
                        <div className='flex px-4 pb-4'>
                            <label className='font-semibold mr-4 w-40'>Product Category:</label>
                            <span>Tops</span>
                        </div>
                        <div className='flex px-4 pb-4'>
                            <label className='font-semibold mr-4 w-40'>Price:</label>
                            <span>₱ 150</span>
                        </div>
                        <div className='flex px-4 pb-4'>
                            <label className='font-semibold mr-4 w-40'>Stock:</label>
                            <span>20</span>
                        </div>
                        <div className='flex px-4 pb-4'>
                            <label className='font-semibold mr-4 w-40'>Variation Class:</label>
                            <span>Ano ba to? HAHAHA</span>
                        </div>
                        <div className='flex px-4 pb-4'>
                            <label className='font-semibold mr-4 w-40'>Variation:</label>
                            <span>Ano ba to? HAHAHA</span>
                        </div>
                        <div className='flex flex-col px-4 py-4'>
                            <label className='font-semibold mr-4 w-40'>Description:</label>
                            <span className='pl-8 pt-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s. </span>
                        </div>
                    </div>
                </div>
                        
                <div className='flex  justify-center mt-8'>
                    <a
                        className='bg-green-700 mr-2 text-white uppercase py-2 px-4 w-[200px]  mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-green-500 hover:text-white transition duration-200 ease-in-out'>
                        Approve
                    </a>
                    <a
                        className='bg-red-700 mr-2  text-white uppercase  py-2 px-4  w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-red-500 hover:text-white transition duration-200 ease-in-out'>
                        Disapprove
                    </a>


                    <a
                        className='bg-[#211C6A] text-white uppercase  py-2 px-4 w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out'>
                        Go Back
                    </a>

                </div>






            </div>


        </div>
    )
}
