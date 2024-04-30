import React, { useEffect, useState } from "react";
import StarRating from "./components/StarRating";

const WriteReview = () => {
    const [starRating, setStarRating] = useState(1);

    useEffect(() => {
        console.log("Star Rating: ", starRating);
    }, [starRating]);

    return (
        <>
            <div className="">
                <StarRating setStarRating={setStarRating} />
            </div>
        </>
    );
};

export default WriteReview;
