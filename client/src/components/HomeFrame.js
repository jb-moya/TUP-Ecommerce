import React from 'react';
import cartCartoon from "../Assets/CartoonCart.png";
import basketCartoon from "../Assets/Basket.png";
import bagCartoon from "../Assets/Bag.png";
import hangerCartoon from "../Assets/Hanger.png";
import { MdComputer } from "react-icons/md";
import { FaStopwatch } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';


const HomeFrame = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route
    navigate('/signup');
  };
  return (
    <div className='text-white items-center bg-[#211C6A] pt-[96px]'>
     
      <div class="hidden md:block absolute top-0 right-0 w-[690px] h-[600px] bg-[#EFEFEF] rounded-bl-full"></div>
      <img className='absolute h-[400px] w-[400px] left-[900px] top-[200px]' src={cartCartoon} loading="lazy" />
      <img className='absolute h-[100px] w-[100px] left-[1290px] top-[500px]' src={basketCartoon} loading="lazy" />
      <img className='absolute h-[100px] w-[100px] left-[1320px] top-[200px]' src={bagCartoon} loading="lazy" />
      <img className='absolute h-[100px] w-[100px] left-[1090px] top-[100px]' src={hangerCartoon} loading="lazy" />

      <div className='flex w-full h-[600px] max-w-[1240px] mx-auto select-none items-center z-1'>
        <div className='hidden md:flex flex-col mt-[-100px]'>
          <h1 className='font-bold text-4xl'>
            Elevate Your University Experience
          </h1>
          <p className='max-w-[640px] text-justify'>
            <br />
            Gear up, students! Shop our exclusive university organization merch now. <br />
            Show your school pride and support your peers with every purchase. <br />
            <br />
            Let's elevate our campus experience together!
          </p>
          <button onClick={handleClick} className='rounded-2xl text-white mt-4 hover:bg-[#5DBAFF] font-semibold bg-[#9180E5] p-[10px] w-[100px]'>
                Sign Up
            </button>
        </div>

        <div className='hidden md:block absolute left-[35%] right-[35%] top-[590px]'>
          <div className='flex items-center justify-between mb-3'>
            <MdComputer size={50} />
            <hr className="border-t-2 border-white w-[120px] z-50 mx-2 " />
            <FaStopwatch size={50} />
            <hr className="border-t-2 border-white w-[120px] z-50 mx-2" />
            <FaMapLocationDot size={50} />
          </div>
          <div className='flex items-center justify-between font-light'>
            <p >Order</p>
            <p className='ml-[15px]'>Fast Process</p>
            <p>Pick-Up</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default HomeFrame;
