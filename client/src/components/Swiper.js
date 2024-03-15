import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ImageSwiper = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

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
                className="mySwiper2"
            >
                <SwiperSlide className="image-container main-image tite">
                    <img
                        src="https://swiperjs.com/demos/images/nature-1.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-2.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-3.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-4.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-5.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-6.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-7.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-8.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-9.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container main-image">
                    <img
                        src="https://swiperjs.com/demos/images/nature-10.jpg"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>

            <Swiper
                onClick={setThumbsSwiper}
                // onSwiper={setThumbsSwiper}
                spaceBetween={2}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-1.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-2.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-3.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-4.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-5.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-6.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-7.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-8.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-9.jpg"
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide className="image-container">
                    <img
                        src="https://swiperjs.com/demos/images/nature-10.jpg"
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default ImageSwiper;
