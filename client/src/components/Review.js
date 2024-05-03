import React, { useEffect, useState } from "react";
import UserReview from "./UserReview.js";
import { DropDownMenu } from "./utils/Dropdown.js";
import axios from "axios";
axios.defaults.withCredentials = true;

const Review = ({productID}) => {
    const [userReviews, setUserReviews] = useState([]);

    // console.log("productID AHH", productID);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/v1/reviews/product/${productID}`
                );
                console.log("reviews", response.data.reviews);
                setUserReviews(response.data.reviews);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReviews();
    }, [productID]);

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
                <DropDownMenu
                    label={starFilter === null ? "Rating" : starFilter}
                    options={filterRating}
                    selectedOption={starFilter}
                    onSelectOption={setStarFilter}
                />

                <DropDownMenu
                    label={dateFilter}
                    options={filterDate}
                    selectedOption={dateFilter}
                    onSelectOption={setDateFilter}
                />

                {userReviews.map((review) => (
                    <UserReview key={review._id} review={review} />
                ))}
            </div>
        </>
    );
};

export default Review;

