import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";

const RatingAverageBar = ({ star, percentage, count }) => {
    return (
        <>
            <div className="float-left w-2/12 p-0">
                <div className="flex items-center justify-center">
                    <div className="font-mono pr-2">{star}</div>
                    <FaStar className="mb-1 text-[#ffc107]" />
                </div>
            </div>
            <div className="float-left w-8/12 mt-2 pl-2">
                <div className="w-full bg-gray-200 text-center text-white rounded">
                    <div
                        style={{ width: `${percentage}%` }}
                        className={`rounded h-1 bg-[#59b5c3]`}
                    ></div>
                </div>
            </div>
            <div className="float-left w-2/12 p-0 text-right">
                <div>{count}</div>
            </div>
        </>
    );
};

const RatingOverview = () => {
    const [barWidth, setBarWidth] = useState([15, 4, 10, 30, 60]);

    return (
        <div className="w-full flex justify-center">
            <div className="w-3/12 flex items-center justify-center">
                <div className="text-6xl font-extrabold text-[#211c6a] pr-1">
                    5
                </div>
                <div className="text-4xl flex flex-col">
                    <StarRating staticColor disableAction />
                    <div className="text-base">based on 254 reviews.</div>
                </div>
            </div>

            <div className="w-4/12">
                <div className="after:table after:clear-both">
                    <RatingAverageBar
                        star={5}
                        percentage={barWidth[0]}
                        count={250}
                    />
                    <RatingAverageBar
                        star={4}
                        percentage={barWidth[1]}
                        count={150}
                    />
                    <RatingAverageBar
                        star={3}
                        percentage={barWidth[2]}
                        count={100}
                    />
                    <RatingAverageBar
                        star={2}
                        percentage={barWidth[3]}
                        count={50}
                    />
                    <RatingAverageBar
                        star={1}
                        percentage={barWidth[4]}
                        count={25}
                    />
                </div>
            </div>

            <div className="w-3/12 flex justify-center items-center">
                <button className="p-2 border rounded bg-[#59b5c3] text-white hover:border-violet-500">
                    Write a Review
                </button>
            </div>
        </div>
    );
};

<div>f</div>;
export default RatingOverview;
