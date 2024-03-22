import React, {useState} from 'react'
import TMCLogo from '../Assets/Logo.png'
import { FaEye, FaEyeSlash} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import InputField from './InputField';

const SignupForm = () => {

  const [showPassword, setPassword] = useState(false)

  const handleShowPassword = () =>{
    setPassword(!showPassword)
  }
  
  const [showConfirmPassword, setConfirmPassword] = useState(false)

  const handleConfirmShowPassword = () =>{
    setConfirmPassword(!showConfirmPassword)
  }
  const navigate = useNavigate();

  const handleClick = () => {
    // Navigate to the desired route
    navigate('/login');
  };
  return (

<div className='text-[#211C6A] mt-[96px]'>

<form className='flex flex-col max-w-[800px] h-full w-full mx-auto text-center items-center select-none'>
        <img 
            className='w-56 h-56'
            src={TMCLogo}
            alt=''
            loading='lazy'/>

        <h2 className='w-96 text-2xl mt-[-26px] font-bold p-2'>Creating Your Account</h2>
        <h4 className='w-[420px]'> Welcome to our platform! Sign up now for exclusive deals and seamless
        shopping. Join us today!</h4>

        <div className='flex-start flex-col mt-[28px] w-[560px] text-left px-4 items-center'>
           <h3 className='font-bold pb-1 px-2'>First Name</h3>
           <InputField 
                type="text"
                placeholder="Enter your first name"/>
           <h3 className='font-bold pb-1 px-2'>Last Name</h3>
           <InputField 
                type="text"
                placeholder="Enter your last name"/>
           <h3 className='font-bold pb-1 px-2'>Date of Birth</h3>
           <InputField 
                type="date"
                placeholder="Enter your date of birth"/>
           <h3 className='font-bold pb-1 px-2'>Email Address</h3>
           <InputField 
                type="Email"
                placeholder="Enter your email address"/>
           <h3 className='font-bold pb-1 px-2'>Contact Number</h3>
           <InputField 
                type="text"
                placeholder="Enter your contact number"/>
            <div className='flex items-center w-full justify-between px-2'>
                <h3 className='font-bold pb-1'>Password</h3>
                <span onClick={handleShowPassword}>
                    {!showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
            </div>
            <InputField 
                    type={!showPassword ? "Password" : "text" }
                    placeholder="Enter your password"/>
            <div className='flex items-center w-full justify-between px-2'>
                <h3 className='font-bold pb-1'>Confirm Password</h3>
                <span onClick={handleConfirmShowPassword}>
                    {!showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                    </span>
            </div>
            <InputField 
                    type={!showConfirmPassword ? "Password" : "text" }
                    placeholder="Confirm your password"/>
        </div>

        <div className='flex flex-col mt-4 items-center w-[560px] px-2'>
            <button className='rounded-2xl text-white font-semibold mb-1 bg-[#211C6A] p-[14px] w-[530px] hover:bg-[#3C35AB]'>
               CREATE ACCOUNT
            </button>

            <button onClick={handleClick} className=' border-none underline text-based text-[#211C6A] font-light p-[14px] w-[530px] hover:text-black'>
                Already Have An Account?
            </button>
        </div>
        
        </form>
     
    </div>
  )
}

export default SignupForm