import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ImageSwiper = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const imageUrls = [
        "https://swiperjs.com/demos/images/nature-1.jpg",
        "https://swiperjs.com/demos/images/nature-2.jpg",
        "https://swiperjs.com/demos/images/nature-3.jpg",
        "https://swiperjs.com/demos/images/nature-4.jpg",
        "https://swiperjs.com/demos/images/nature-5.jpg",
        "https://swiperjs.com/demos/images/nature-6.jpg",
        "https://swiperjs.com/demos/images/nature-7.jpg",
        "https://swiperjs.com/demos/images/nature-8.jpg",
        "https://swiperjs.com/demos/images/nature-9.jpg",
        "https://swiperjs.com/demos/images/nature-10.jpg",
    ];

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={true}
                spaceBetween={2}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-[500px] bg-[#572828] rounded-xl"
            >
                {imageUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <img src={url} alt="" className="h-full rounded-xl" />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onClick={setThumbsSwiper}
                // onSwiper={setThumbsSwiper}
                spaceBetween={2}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper h-[100px] rounded-xl mt-2"
            >
                {imageUrls.map((url, index) => (
                    <SwiperSlide
                        key={index}
                        // className="w-full h-[550px] object-cover"
                    >
                        <img
                            src={url}
                            alt=""
                            className="h-full p-1 rounded-xl"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ImageSwiper;
