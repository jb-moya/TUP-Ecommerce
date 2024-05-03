import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";
import axios from "axios";
axios.defaults.withCredentials = true;

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

const RatingOverview = ({ productID, averageRating, handleWriteReview }) => {
    const [totalReviews, setTotalReviews] = useState([]);
    const [barWidth, setBarWidth] = useState([]);   
    const initialBarWidth = Array.from({ length: 5 }, (_, index) => ({
        rating: 5 - index,
        percentage: 0,
        count: 0,
    }));

    // console.log("productID AHH", productID);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/reviews/product/${productID}/total`
                );
                console.log("reviews", response);
                console.log("rating count", response.data.ratingCounts);
                setTotalReviews(response.data.totalReviews);

                const updatedBarWidth = initialBarWidth.map((bar) => {
                    const foundRating = response.data.ratingCounts.find(
                        (rating) => rating.rating === bar.rating
                    );
                    if (foundRating) {
                        return {
                            ...bar,
                            percentage:
                                (foundRating.count /
                                    response.data.totalReviews) *
                                100,
                            count: foundRating.count,
                        };
                    } else {
                        return bar; // Use default count of 0 for missing ratings
                    }
                });

                setBarWidth(updatedBarWidth);
                // setTotalReviews(response.data.ratingCounts);
            } catch (error) {
                console.error(error);
            }
        };
        
        fetchReviews();
    }, [productID]);
    
    const [toggleWriteReview, setToggleWriteReview] = useState(false);

    const clickWriteReview = () => {
        setToggleWriteReview(!toggleWriteReview);
        handleWriteReview(toggleWriteReview);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-3/12 flex items-center justify-center">
                <div className="text-5xl font-extrabold text-[#211c6a] pr-1">
                    {averageRating}
                </div>
                <div className="text-4xl flex flex-col">
                    <StarRating staticColor disableAction />
                    <div className="text-base text-center">
                        based on {totalReviews} {totalReviews >= 1 ? "review" : "reviews"}
                    </div>
                </div>
            </div>

            <div className="w-4/12">
                <div className="after:table after:clear-both">
                    {barWidth.map((bar, index) => (
                        <RatingAverageBar
                            key={index}
                            star={5 - index}
                            percentage={bar.percentage}
                            count={bar.count}
                        />
                    ))}

                    {/* <RatingAverageBar
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
                    /> */}
                </div>
            </div>

            <div className="w-3/12 flex justify-center items-center">
                <button
                    type="button"
                    className="p-2 border rounded bg-[#59b5c3] text-white hover:border-violet-500"
                    onClick={clickWriteReview}
                >
                    {toggleWriteReview ? "Cancel" : "Write a review"}
                </button>
            </div>
        </div>
    );
};

<div>f</div>;
export default RatingOverview;
