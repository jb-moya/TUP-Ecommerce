import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

import { FreeMode, Pagination } from "swiper/modules";
import { ProductSample } from "./contants/productlist";


const ItemsList = () => {
  return (
    <div className='h-[555px]'>
    <Swiper
              breakpoints={{
                  340: {
                      slidesPerView: 2, // Show 3 slides at a time
                      slidesPerColumn: 2, // 2 rows
                      spaceBetween: 10,
                  },
                  700: {
                      slidesPerView: 5,
                      slidesPerColumn: 2, // 2 rows
                      spaceBetween: 10,
                  },
              }}
              freeMode={true}
              pagination={{
                  clickable: true,
              }}
              modules={[FreeMode, Pagination]}
              className="max-w-[90%] lg:max-w-[100%] mt-[30px] h-screen max-h-[90%] lg:max-h-[100%]"
          >
            {ProductSample.map((item) => (
             
             <SwiperSlide key={item.title}>
             <div className="flex flex-row gap-6 mx-auto mb-2 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[195px] w-[195px] lg:h-[200px] lg:w-[200px] overflow-hidden cursor-pointer">
             <div className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
                     style={{
                         backgroundImage: `url(${item.backgroundImage})`,
                     }}
                 />
                 <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
             </div>
             <h1 className='font-bold pl-[20px]'>{item.title}</h1>
             <h4 className='pl-[20px] mb-2 text-[15px]'>{item.price}</h4 >
           
           
             <div className="flex flex-row gap-6 mx-auto mb-2 group relative shadow-lg text-white rounded-xl px-6 py-8 h-[195px] w-[195px] lg:h-[200px] lg:w-[200px] overflow-hidden cursor-pointer">
             <div className="absolute inset-0 bg-cover bg-center flex items-center justify-center"
                     style={{
                         backgroundImage: `url(${item.backgroundImage})`,
                     }}
                 />
                 <div className="absolute inset-0 bg-black opacity-10 group-hover:opacity-50" />
             </div>
             <h1 className='font-bold pl-[20px]'>{item.title}</h1>
             <h4 className='pl-[20px] mb-2 text-[15px]'>{item.price}</h4 >
             
         </SwiperSlide>
         
                  
              ))}
          </Swiper>
          
</div>
  )
}

export default ItemsList