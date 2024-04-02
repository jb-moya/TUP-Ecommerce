import React, { useState } from "react";
import UserReview from "./UserReview.js";

const FilterButton = ({ label, options, selectedOption, onSelectOption }) => {
    return (
        <div className="relative inline-block group pr-4 pb-4">
            <button className="w-[140px] py-1 rounded text-base cursor-pointer bg-[#59b5c3] text-white border hover:border-violet-500 focus:ring-opacity-50">
                {options[selectedOption] || label}
            </button>
            <div className="absolute hidden group-hover:block bg-gray-100 border border-gray-200 rounded w-40 mt-2 shadow-lg">
                {Object.keys(options).map((option, index, array) => (
                    <button
                        key={option}
                        onClick={() => onSelectOption(option)}
                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
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

const Review = () => {
    const filterRating = {
        null: "All",
        1: "1 star",
        2: "2 stars",
        3: "3 stars",
        4: "4 stars",
        5: "5 stars",
    };

    const filterDate = {
        0: "Latest",
        1: "Oldest",
    };

    const [starFilter, setStarFilter] = useState(filterRating[null]);
    const [dateFilter, setDateFilter] = useState(filterDate[0]);

    return (
        <>
            <div className="">
                <FilterButton
                    label={starFilter === null ? "Rating" : starFilter}
                    options={filterRating}
                    selectedOption={starFilter}
                    onSelectOption={setStarFilter}
                />

                <FilterButton
                    label={dateFilter}
                    options={filterDate}
                    selectedOption={dateFilter}
                    onSelectOption={setDateFilter}
                />

                <UserReview />
                <UserReview />
                <UserReview />
            </div>
        </>
    );
};

export default Review;
