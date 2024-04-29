import React, {useContext} from 'react';
import { StepperContext } from '../contexts/StepperContext';


export const ShopInformation= () => {
  const {userData, setUserData} = useContext(StepperContext);
  const handleChange = (e) => {
    const {name, value} = e.target;
    setUserData({...userData, [name]: value });
  }
  return (
    <div className='flex flex-col'>
        <div className='w-full mx-2 flex-1'>
          <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              Shop Name
          </div>
          <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input 
                onChange={handleChange}
                value={userData["shopName"] || ""}
                name = "shopName"
                placeholder='Enter your Shop Name'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'                
                />
          </div>  
        </div>

        <div className='w-full mx-2 flex-1'>
          <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
              Pickup Address
          </div>
          <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
              <input 
                onChange={handleChange}
                value={userData["pickUpAddress"] || ""}
                name = "pickUpAddress"
                placeholder='Enter your pick up address'
                className='p-1 px-2 appearance-none outline-none w-full text-gray-800'                
                />
          </div>  
        </div>

        <div className='w-full mx-2 flex-1'>
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

        <div className='w-full mx-2 flex-1'>
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
    </div>
  )
}
