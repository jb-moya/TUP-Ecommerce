import React, { useState } from "react";
import UserReview from "./UserReview.js";

const Review = () => {
    const filterRating = {
        null: "All",
        1: "1 star",
        2: "2 stars",
        3: "3 stars",
        4: "4 stars",
        5: "5 stars",
    };

    const filterDate = ["Latest", "Oldest"];

    const [starFilter, setStarFilter] = useState(filterRating[null]);
    const [dateFilter, setDateFilter] = useState(0);

    return (
        <>
            <div className="">
                <div class="relative inline-block group pr-4 pb-4">
                    <button class="w-[140px] py-1 rounded-md text-base cursor-pointer bg-[#59b5c3] text-white border hover:border-violet-500 focus:ring-opacity-50">
                        {starFilter === null ? "Rating" : starFilter}
                    </button>
                    <div class="absolute hidden group-hover:block bg-gray-100 border border-gray-200 rounded w-40 mt-2 shadow-lg">
                        {Object.keys(filterRating).map(
                            (rating, index, array) => (
                                <button
                                    onClick={() =>
                                        setStarFilter(filterRating[rating])
                                    }
                                    class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                    style={{
                                        backgroundColor:
                                            starFilter === filterRating[rating]
                                                ? "#59b5c3"
                                                : "white",
                                        color:
                                            starFilter === filterRating[rating]
                                                ? "white"
                                                : "black",
                                        borderRadius:
                                            index === 0
                                                ? "4px 4px 0 0"
                                                : index === array.length - 1
                                                ? "0 0 4px 4px"
                                                : "",
                                    }}
                                >
                                    {filterRating[rating]}
                                </button>
                            )
                        )}
                    </div>
                </div>

                <div class="relative inline-block group pr-4 pb-4">
                    <button class="w-[140px] py-1 rounded-md text-base cursor-pointer bg-[#59b5c3] text-white border hover:border-violet-500 focus:ring-opacity-50">
                        {filterDate[dateFilter]}
                    </button>
                    <div class="absolute hidden group-hover:block bg-gray-100 border border-gray-200 rounded w-40 mt-2 shadow-lg">
                        {Object.keys(filterDate).map((date, index, array) => (
                            <button
                                onClick={() => setDateFilter(date)}
                                class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                style={{
                                    backgroundColor:
                                        starFilter === filterDate[date]
                                            ? "#59b5c3"
                                            : "white",
                                    color:
                                        starFilter === filterDate[date]
                                            ? "white"
                                            : "black",
                                    borderRadius:
                                        index === 0
                                            ? "4px 4px 0 0"
                                            : index === array.length - 1
                                            ? "0 0 4px 4px"
                                            : "",
                                }}
                            >
                                {filterDate[date]}
                            </button>
                        ))}
                    </div>
                </div>

                <UserReview />
                <UserReview />
                <UserReview />
            </div>
        </>
    );
};

export default Review;
