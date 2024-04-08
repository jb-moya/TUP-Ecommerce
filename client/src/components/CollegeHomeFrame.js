import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";

import { RxArrowTopRight } from "react-icons/rx";
import { ServiceData } from "./contants";
import CollegeHomeSection from "./CollegeHomeSection.js";

const CollegeHomeFrame = () => {
    return (
        <div>
            <CollegeHomeSection title="College of Science" />
            <CollegeHomeSection title="College of Engineering" />
            <CollegeHomeSection title="College of Architecture" />
            <CollegeHomeSection title="Non-College Based" />
        </div>
    );
};

export default CollegeHomeFrame;
