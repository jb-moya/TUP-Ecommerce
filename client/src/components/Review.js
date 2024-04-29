import React, { useState } from "react";
import UserReview from "./UserReview.js";
import DropDownMenu from "./utils/Dropdown.js";


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

                <UserReview />
                <UserReview />
                <UserReview />
            </div>
        </>
    );
};

export default Review;
