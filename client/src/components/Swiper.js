import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const ImageSwiper = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <>
            <Swiper
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#fff",
                }}
                loop={images.length > 1}
                spaceBetween={2}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="h-[500px] rounded-xl"
            >
                {images.map((base64, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={base64}
                            alt=""
                            className="h-full rounded-xl object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <Swiper
                onClick={setThumbsSwiper}
                spaceBetween={2}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper h-[100px] rounded-xl mt-2"
            >
                {images.map((base64, index) => (
                    <SwiperSlide key={index}>
                        <img
                            src={base64}
                            alt=""
                            className="h-full p-1 rounded-xl object-cover"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default ImageSwiper;
