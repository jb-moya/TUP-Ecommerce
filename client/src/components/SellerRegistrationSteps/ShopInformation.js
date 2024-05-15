import React, {useContext} from 'react';
import { StepperContext } from '../contexts/StepperContext';


export const ShopInformation= () => {
  const {userData, setUserData} = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "password" || name === "confirmPassword") {
      // Update the userData state
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
  
      if (name === "confirmPassword" && value !== userData.password) {
        console.log("Passwords do not match!");
      } else {
        // Clear the error message if passwords match
        // setError("");
      }
    } else {
      setUserData((prevUserData) => ({
        ...prevUserData,
        [name]: value,
      }));
    }
  };
  

  return (
    <div className='flex flex-col'>
        <div className='w-full mx-2 flex-1'> {/*  ORGANIZATION NAME */}
          <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              Organization Name
          </div>
          <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input 
                onChange={handleChange}
                value={userData["orgName"] || ""}
                name = "orgName"
                placeholder='Enter organization name'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'                
                />
          </div>  
        </div>

        <div className='w-full mx-2 flex-1'> {/*  ORGANIZATION EMAIL */}
          <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              Email
          </div>
          <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input 
                onChange={handleChange}
                value={userData["email"] || ""}
                name = "email"
                type='email'
                placeholder='Enter your email address'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'                
                />
          </div>  
        </div>

        <div className='w-full mx-2 flex-1'> {/*  ORG PHONE NUMBER(s) */}
          <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              Phone Number
          </div>
          <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input 
                onChange={handleChange}
                value={userData["phoneNum"] || ""}
                name = "phoneNum"
                placeholder='Enter your phone number'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'                
                />
          </div>  
        </div>

        <div className='w-full mx-2 flex-1'> {/*  PASSWORD */}
          <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              Password
          </div>
          <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input 
                type="password"
                onChange={handleChange}
                value={userData["password"] || ""}
                name = "password"
                placeholder='Enter your password'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'                
                />
          </div>  
        </div>

        <div className='w-full mx-2 flex-1'> {/*  CONFIRM PASSWORD */}
          <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              Confirm Password
          </div>
          <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input 
                type="password"
                onChange={handleChange}
                value={userData["confirmPassword"] || ""}
                name = "confirmPassword"
                placeholder='Confirm password'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'                
                />
          </div>  
        </div>

    </div>
  )
}
