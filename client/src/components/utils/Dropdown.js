import { useState } from 'react';

const DropDownMenu = ({ label, options, selectedOption, onSelectOption }) => {
    return (
        <div className="relative inline-block group pr-4 pb-4 z-10">
            <button className="w-[140px] py-1 rounded text-base cursor-pointer bg-[#59b5c3] text-white border hover:border-violet-500 focus:ring-opacity-50">
                {options[selectedOption] || label}
            </button>
            <div className="absolute hidden group-hover:block bg-gray-100 border border-gray-200 rounded w-40 mt-2 shadow-lg">
                {Object.keys(options).map((option, index, array) => (
                    <button
                        key={option}
                        onClick={() => onSelectOption(option)}
                        className="block w-full px-4 py-1 text-sm text-gray-700 hover:bg-purple-500"
                        style={{
                            backgroundColor:
                                selectedOption === option ? "#59b5c3" : "white",
                            color:
                                selectedOption === option ? "white" : "black",
                            borderRadius:
                                index === 0
                                    ? "4px 4px 0 0"
                                    : index === array.length - 1
                                    ? "0 0 4px 4px"
                                    : "",
                        }}
                    >
                        {options[option]}
                    </button>
                ))}
            </div>
        </div>
    );
    
};

const DropDownMenu_1 = ({ label, options, selectedOption, onSelectOption }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (option) => {
        onSelectOption(option);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block group pr-4 pb-4 z-10">
            <div className="flex items-center">
                <input
                    type="text"
                    value={options[selectedOption] || label}
                    readOnly
                    className="w-[140px] px-3 py-1 h-6 text-sm cursor-pointer text-black border-2 rounded-md hover:border-violet-500 focus:ring-opacity-50"
                    onClick={() => setIsOpen(!isOpen)}
                />
                <svg
                    className={`w-5 h-5 ml-2 transition-transform ${
                        isOpen ? 'transform rotate-180' : ''
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <path
                        fillRule="evenodd"
                        d="M10 12l-5-5h10l-5 5z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            {isOpen && (
                <div className="absolute bg-gray-100 border border-gray-200 rounded w-40 mt-2 shadow-lg">
                    {Object.keys(options).map(option => (
                        <button
                            key={option}
                            onClick={() => handleSelect(option)}
                            className={`block w-full px-4 py-1 text-sm text-gray-700 hover:bg-purple-500 ${
                                selectedOption === option
                                    ? 'bg-purple-500 text-white'
                                    : ''
                            }`}
                        >
                            {options[option]}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export { DropDownMenu, DropDownMenu_1 };