import React from 'react'
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebook, FaInstagram} from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-[#211C6A] w-full h-[300px] items-center mt-5'>
  <div className="flex select-none overflow-hidden max-w-[1240px] px-4 h-full text-white justify-between items-center font-bold mx-auto text-nowrap flex-wrap">
    <div className='flex w-full justify-between flex-wrap'>
       {/* Right Footer Container */}
       <div className="flex flex-col justify-between">
          <h1 className="text-xl sm:text-2xl md:text-3xl">REPRESENT YOUR</h1>
          <h1 className="text-xl sm:text-2xl md:text-3xl">SCHOOL ORGANIZATION</h1>
          <div className='flex items-center'>
              <h1 className="text-lg sm:text-xl md:text-2xl">IN</h1>
              <h1 className='text-[#5DBAFF] ml-[4px] text-lg sm:text-xl md:text-2xl'>STYLE</h1>
              <h1 className="text-lg sm:text-xl md:text-2xl">!</h1>
          </div>
          <div className='flex items-center mt-2 sm:mt-4'>
              <MdOutlineEmail />
              <p className='font-thin ml-[4px] text-sm sm:text-base'>@tupmerchco</p>
          </div>    
      </div>
      {/* Left Footer Container */}
      <div className="flex flex-col justify-between mt-4 sm:mt-0">
          <div className='flex justify-end mb-[30px]'>
            <FaFacebook size={36} className='mx-2' />
            <FaInstagram  size={36}/>
          </div>
          <div className='flex justify-end items-center font-thin'>
            <p className='mx-2 text-sm sm:text-base'>Privacy Policy</p>
            <p className='mx-2 text-sm sm:text-base'>Terms & Conditions</p>
          </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Footer