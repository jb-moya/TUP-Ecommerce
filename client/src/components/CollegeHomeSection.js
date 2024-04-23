import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";
import { ServiceData } from "./contants";

const CollegeHomeSection = ({ title }) => {
    return (
        <div className="flex items-center justify-center flex-col h-[600px] bg-[#EFEFEF]">
            <h1 className="text-[#211C6A] font-extrabold mt-[20px] mb-12 text-[30px] md:text-[50px] sm:text-[40px]">
                {title}
            </h1>
            <Swiper
                breakpoints={{
                    340: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    700: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                }}
                freeMode={true}
                pagination={{
                    clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="max-w-[90%] lg:max-w-[70%] "
            >
                {ServiceData.map((item) => (
                    <SwiperSlide
                        key={item.title}
                    >
                        <div className="flex flex-col gap-6 mx-auto mb-12 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[220px] w-[295px] lg:h-[350px] lg:w-[300px] overflow-hidden cursor-pointer">
                            <div
                                className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
                                style={{
                                    backgroundImage: `url(${item.backgroundImage})`,
                                }}
                            />
                            <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
                            <div className="relative flex flex-col gap-3">
                                <item.icon className="text-blue-600 group-hover:text-blue-400 w-[32px] h-[32px]" />
                                <h1 className="text-xl lg:text-2xl">
                                    {item.title}{" "}
                                </h1>
                                <p className="lg:text-[18px]">
                                    {item.content}{" "}
                                </p>
                            </div>
                            <RxArrowTopRight className="absolute bottom-5 left-5 w-[35px] h-[35px] text-white group-hover:text-blue-500 group-hover:rotate-45 duration-100" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default CollegeHomeSection;
