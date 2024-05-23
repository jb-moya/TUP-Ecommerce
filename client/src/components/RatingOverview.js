import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import StarRating from "./StarRating";
import axios from "axios";
import { Tooltip } from "react-tooltip";
import { useSelector } from "react-redux";
import { isUserLogged } from "../features/user/userSlice";

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
                        className={`rounded-lg h-1 bg-[#59b5c3]`}
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
    const { user } = useSelector((state) => state.user);
    const userLogged = useSelector(isUserLogged);
    const [totalReviews, setTotalReviews] = useState(0);
    const initialBarWidth = Array.from({ length: 5 }, (_, index) => ({
        rating: 5 - index,
        percentage: 0,
        count: 0,
    }));
    const [barWidth, setBarWidth] = useState(initialBarWidth);

    // // console.log("productID AHH", productID);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/reviews/product/${productID}/total`
                );
                // // console.log("reviews", response);
                // // console.log("rating count", response.data.ratingCounts);
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
                if (response.data.totalReviews > 0) {
                    setBarWidth(updatedBarWidth);
                }
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
                        based on {totalReviews}{" "}
                        {totalReviews >= 1 ? "review" : "reviews"}
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
                </div>
            </div>
            <Tooltip
                id="my-tooltip"
                style={{
                    backgroundColor: "#211c6a",
                    color: "#fff",
                    borderRadius: "8px",
                }}
            />
            <div className="w-3/12 flex justify-center items-center">
                <button
                    type="button"
                    className="p-2 border rounded-lg bg-[#59b5c3] text-white hover:border-violet-500"
                    onClick={clickWriteReview}
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                        userLogged
                            ? user.role === "customer"
                                ? ""
                                : "customer can only perform this"
                            : "Please log in to write a review!"
                    }
                    disabled={!userLogged || user.role !== "customer"}
                    style={{
                        cursor: userLogged
                            ? user.role === "customer"
                                ? "pointer"
                                : "not-allowed"
                            : "not-allowed",
                    }}
                    data-tooltip-place="top"
                >
                    {toggleWriteReview ? "Cancel" : "Write a review"}
                </button>
            </div>
        </div>
    );
};

export default RatingOverview;
