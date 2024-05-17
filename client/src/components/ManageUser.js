import React, { useState} from 'react';

const AllUsers = () => {

  return (
    <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
      <thead>
        <tr className="text-left bg-gray-300">
          <th className="p-2">img</th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Username</option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
            </select>
          </th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Roles</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
              <option value="Seller">Seller</option>
            </select>
          </th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Member For</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
            </select>
          </th>
          <th className="p-2 text-center">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Last Access</option>
              <option value="2024-05-17">2024-05-17</option>
              <option value="2024-05-16">2024-05-16</option>
            </select>
          </th>
          <th className="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2"><img src="path_to_image.jpg" alt="User Image" className="w-8 h-8 rounded-full" /></td>
          <td className="p-2">Username1</td>
          <td className="p-2">Active</td>
          <td className="p-2">Admin</td>
          <td className="p-2">2 years</td>
          <td className="p-2 text-center">2024-05-17</td>
          <td className="p-2 text-center">
            <button className="text-red-500 hover:text-red-700 ml-2">Ban</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

const PendingSeller = () => {
  
  return (
    <table className="border-collapse border border-[#211C6A] text-[#211C6A] w-full mt-4 text-xs">
      <thead>
        <tr className="text-left bg-gray-300">
          <th className="p-2">img</th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Username</option>
              <option value="A to Z">A to Z</option>
              <option value="Z to A">Z to A</option>
            </select>
          </th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </th>
          <th className="p-2">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Member For</option>
              <option value="1 year">1 year</option>
              <option value="2 years">2 years</option>
            </select>
          </th>
          <th className="p-2 text-center">
            <select className="w-full border-gray-400 outline-none bg-transparent">
              <option value="">Submitted on</option>
              <option value="2024-05-17">2024-05-17</option>
              <option value="2024-05-16">2024-05-16</option>
            </select>
          </th>
          <th className="p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2"><img src="path_to_image.jpg" alt="User Image" className="w-8 h-8 rounded-full" /></td>
          <td className="p-2">PendingSeller1</td>
          <td className="p-2">Inactive</td>
          <td className="p-2">1 year</td>
          <td className="p-2">2024-05-16</td>
          <td className="p-2 text-center">
          <a href="/seller-review-form" className="text-blue-500 hover:text-blue-700 mx-2 ">Review</a> 
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export const ManageUser = () => {
  const [selectedButton, setSelectedButton] = useState(0);

  const handleButtonClick = (buttonNumber) => {
    setSelectedButton(buttonNumber);
  };

  return (
    <div className='flex flex-col p-4'>
      <h1 className='text-2xl font-bold mb-4'>Manage Users</h1>
      <ul className="flex border-b-2 border-gray-200 w-full px-4 text-gray-500">
        <li
          onClick={() => handleButtonClick(0)}
          className={`p-4 cursor-pointer hover:border-b-2 mr-4 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 0 ? "border-b-[#211C6A] border-b-2 text-[#211C6A]" : ""}`}
        >
          All
        </li>
        <li
          onClick={() => handleButtonClick(1)}
          className={`p-4 cursor-pointer hover:border-b-2 hover:border-b-[#211C6A] transition ease-in-out duration-200 ${selectedButton === 1 ? "border-b-[#211C6A] border-b-2 text-[#211C6A]" : ""}`}
        >
          Pending Seller
        </li>
      </ul>
      {selectedButton === 0 && <AllUsers />}
      {selectedButton === 1 && <PendingSeller />}
    </div>
  );
};
