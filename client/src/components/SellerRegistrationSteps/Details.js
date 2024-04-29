import React, { useContext } from 'react';
import { StepperContext } from '../contexts/StepperContext';

export const Details = () => {
  const { userData, setUserData } = useContext(StepperContext);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the first file from the list of selected files
    setUserData({ ...userData, OrgNameFile: file });
  };
  return (
    <div className='flex flex-col'>
      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Registered Name
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData["regName"] || ""}
            name="regName"
            placeholder='Enter your name (e.g. Dela Cruz, Juan)'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Registered Address
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData["regAddress"] || ""}
            name="regAddress"
            placeholder='Enter your address'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          TUP Identification
        </div>
        <div className='bg-white my-2 p-1 flex border border-gray-200 rounded'>
          <input
            onChange={handleChange}
            value={userData["regID"] || ""}
            name="regID"
            placeholder='Enter your student ID (e.g. TUPM-21-0000)'
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800'
          />
        </div>
      </div>

      <div className='w-full mx-2 flex-1'>
        <div className='font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase'>
          Organization Accreditation Certificate
        </div>
        <div className='bg-white my-2 p-1 flex'>
          <input
            type="file"
            onChange={handleFileChange}
            name="OrgNameFile"
            accept=".pdf, .doc, .docx"
            className='p-1 px-2 appearance-none outline-none w-full text-gray-800 '
          />
        </div>
      </div>


    </div>
  )
}
