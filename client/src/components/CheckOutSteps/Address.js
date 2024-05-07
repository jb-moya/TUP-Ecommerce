import React, { useContext } from 'react';
import { CheckOutStepperContext } from '../contexts/CheckOutStepperContext';

const Address = () => {
  const { userData, setUserData } = useContext(CheckOutStepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  return (
    <div>
      <div className='my-4'>
        Shipping Information
      </div>
      <div className='flex w-full justify-between'>
        <div className='w-[250px] mr-2'>
          <div className='bg-white my-2 p-1 flex border border-[#211C6A] rounded'>
            <input
              onChange={handleChange}
              value={userData["fName"] || ""}
              name="fName"
              placeholder='First Name'
              className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
            />
          </div>
        </div>

        <div className='w-[250px]'>
          <div className='bg-white my-2 p-1 flex border border-[#211C6A]  rounded'>
            <input
              onChange={handleChange}
              value={userData["lName"] || ""}
              name="lName"
              placeholder='Last Name'
              className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
            />
          </div>
        </div>
      </div>
      <div className='w-full'>
        <div className='bg-white my-2 p-1 flex border border-[#211C6A]  rounded'>
          <input
            onChange={handleChange}
            value={userData["address"] || ""}
            name="address"
            placeholder='Address'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>
      <div className='w-full'>
        <div className='bg-white my-2 p-1 flex border border-[#211C6A]  rounded'>
          <input
            onChange={handleChange}
            value={userData["city"] || ""}
            name="city"
            placeholder='City'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>
      <div className='flex w-full justify-between'>
        <div className='w-[250px] mr-2'>
          <div className='bg-white my-2 p-1 flex border border-[#211C6A] rounded relative'>
            <select
              onChange={handleChange}
              value={userData["country"] || ""}
              name="country"
              className='p-1 px-2 appearance-none outline-none w-full text-gray-800 bg-transparent '
            >
              <option value="">Country</option>
              <option value="USA">United States</option>
              <option value="UK">United Kingdom</option>
              <option value="Canada">Canada</option>
              {/* Add more options as needed */}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 fill-current text-gray-600" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 12l-4-4h8l-4 4z" />
              </svg>
            </div>
          </div>

        </div>

        <div className='w-[250px]'>
          <div className='bg-white my-2 p-1 flex border border-[#211C6A]  rounded'>
            <input
              onChange={handleChange}
              value={userData["zipcode"] || ""}
              name="zipcode"
              placeholder='Zip Code'
              className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
            />
          </div>
        </div>
      </div>
    </div>


  )
}

export default Address