import React, { useEffect, useState } from "react";
import StarRating from "./components/StarRating";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
axios.defaults.withCredentials = true;

const WriteReview = ({ productID }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [starRating, setStarRating] = useState(1);
    const ratingLabels = ["Terrible", "Bad", "Okay", "Good", "Excellent"];
    const [review, setReview] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        // Retrieve user data from localStorage
        // const storedUser = localStorage.getItem("user");
        // if (storedUser) {
        // Parse the JSON string back into an object
        // const userObject = JSON.parse(storedUser);
        // // console.log("User data found in localStorage:", userObject);
        // Now you can access properties of the user object
        // // console.log("User ID:", userObject.user._id);
        // // console.log("First Name:", userObject.user.firstName);
        // // console.log("Last Name:", userObject.user.lastName);
        // // console.log("Email:", userObject.user.email);
        // // console.log("Role:", userObject.user.role);
        // setUserID(userObject.user._id);
        // Access other properties as needed
        // Set the user object in your component state if necessary
        // setUser(userObject);
        // } else {
        // // console.log("User data not found in localStorage.");
        // }
    }, []); // Empty dependency array ensures this effect runs only once on mount

    useEffect(() => {
        // // console.log("Star Rating: ", starRating);
    }, [starRating]);

    const handleSubmitReview = () => {
        try {
            let response = axios.post("http://localhost:5000/api/v1/reviews", {
                product: productID,
                title: title,
                comment: review,
                rating: starRating,
                user: user._id,
            });

            // console.log(response);
            // refresh page
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
