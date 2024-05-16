import React, { useEffect, useState } from "react";
import StarRating from "./components/StarRating";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
axios.defaults.withCredentials = true;

const WriteReview = ({ productID, closeWriteReviewComponent }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [starRating, setStarRating] = useState(1);
    const ratingLabels = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
    const [review, setReview] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
    }, [starRating]);

    const handleSubmitReview = async () => {
        try {
            let response = await axios.post(
                "http://localhost:5000/api/v1/reviews",
                {
                    product: productID,
                    title: title,
                    comment: review,
                    rating: starRating,
                    user: user._id,
                }
            );

            console.log("writing review response", response);

            if (response.status === 200 || response.status === 201) {
                toast.success("Review submitted successfully!");
                // refresh page
                closeWriteReviewComponent();
                window.location.reload();
            } else {
                toast.error("Failed to submit review.");
            }

            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="w-full mb-6 shadow-gray-400 shadow-md rounded-sm">
                <div className="flex flex-row p-2">
                    <StarRating setStarRating={setStarRating} />
                    {starRating !== null && (
                        <p className="pl-2 text-center text-sm leading-2">
                            {ratingLabels[starRating - 1]}
                        </p>
                    )}
                </div>

                <input
                    type="text"
                    className="w-full p-2 border-b-2 mb-2"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    className="w-full h-32 p-2 "
                    placeholder="Write your review here..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                ></textarea>

                <button
                    type="button"
                    className="w-full p-2 text-gray-500 hover:text-white bg-slate-100 hover:bg-[#59b5c3] rounded-sm"
                    onClick={handleSubmitReview}
                >
                    Submit Review
                </button>
            </div>
        </>
    );
};

export default WriteReview;
