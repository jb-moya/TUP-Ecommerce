import React, { useState } from 'react';
import ProductFilter from './ProductFilter';



const PendingProducts = () => {
  
  return (
    <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
      <thead>
        <tr className="text-left bg-gray-300">
          <th className="p-2">img</th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Product Name</option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
            </select>
          </th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Category</option>
              <option value="Category1">Category1</option>
              <option value="Category2">Category2</option>
            </select>
          </th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Organization Name</option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
            </select>
          </th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Product Creation Date</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
            </select>
          </th>
          <th className="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2"><img src="path_to_image.jpg" alt="User Image" className="w-8 h-8 rounded-full" /></td>
          <td className="p-2">Tshirt ni Gaspar</td>
          <td className="p-2">Category1</td>
          <td className="p-2">TUP Graybots</td>
          <td className="p-2">2024-05-17</td>
          <td className="p-2 text-center">
            <a href="/product-review-form" className="text-blue-500 hover:text-blue-700 mx-2 ">Review</a>  
          </td>
        </tr>
      </tbody>
    </table>
  );
};


export const ManageProducts = () => {
  
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-2xl font-bold mb-4'>Manage Products</h1>
      <ul className="flex border-b-2 border-gray-200 w-full px-4 text-gray-500">
        <li
          onClick={() => handleButtonClick(0)}
          className={`p-4 cursor-pointer hover:border-b-2 mr-4 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 0 ? "border-b-[#211C6A] border-b-2 text-[#211C6A]" : ""}`}
        >
          All
        </li>
        <li
          onClick={() => handleButtonClick(1)}
          className={`p-4 cursor-pointer hover:border-b-2  mr-4  hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 1 ? "border-b-[#211C6A] border-b-2 text-[#211C6A]" : ""}`}
        >
          Pending Products
        </li>
      </ul>
      {selectedButton === 0 && <ProductFilter />}
      {selectedButton === 1 && <PendingProducts />}

    </div>
  )
}
