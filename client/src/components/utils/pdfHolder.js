import React from 'react';

const PDFHolder = ({ handleFileUpload }) => {
  return (
    <div>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileUpload}
        className="hidden"
        id="certificateInput"
      />
      <label htmlFor="certificateInput" className="cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="ml-2 text-gray-600">Upload PDF</span>
      </label>
    </div>
  );
};

export default PDFHolder;
