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

export default DropDownMenu;