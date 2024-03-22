import React from "react";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";

const RatingOverview = () => {
    return (
        <div className="flex">
            <div className="flex pr-8 items-center">
                <div className="text-7xl font-extrabold text-[#211c6a] pr-1">
                    5
                </div>
                <div className="text-4xl flex flex-col">
                    <StarRating staticColor disableAction />
                    <div className="text-base">based on 254 reviews.</div>
                </div>
            </div>

            <div className="">
                <div className="table clear-both">
                    <div className="side">
                        <div className="legend">
                            <div className="star-number">5</div>
                            <FaStar className="star-symbol" />
                        </div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar bar-5"></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>150</div>
                    </div>
                    <div className="side">
                        <div className="legend">
                            <div className="star-number">4</div>
                            <FaStar className="star-symbol" />
                        </div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar bar-4"></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>150</div>
                    </div>
                    <div className="side">
                        <div className="legend">
                            <div className="star-number">3</div>
                            <FaStar className="star-symbol" />
                        </div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar bar-3"></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>150</div>
                    </div>
                    <div className="side">
                        <div className="legend">
                            <div className="star-number">2</div>
                            <FaStar className="star-symbol" />
                        </div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar bar-2"></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>150</div>
                    </div>
                    <div className="side">
                        <div className="legend">
                            <div className="star-number">1</div>
                            <FaStar className="star-symbol" />
                        </div>
                    </div>
                    <div className="middle">
                        <div className="bar-container">
                            <div className="bar bar-1"></div>
                        </div>
                    </div>
                    <div className="side right">
                        <div>150</div>
                    </div>
                </div>
            </div>

            <div className="pl-8 flex justify-center items-center">
                <button className="p-2 border rounded bg-[#59b5c3] text-white hover:border-violet-500">
                    Write a Review
                </button>
            </div>
        </div>
    );
};

<div>f</div>;
export default RatingOverview;
