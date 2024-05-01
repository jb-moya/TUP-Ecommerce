import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = ({
    staticColor = false,
    defaultRating = null,
    disableAction = false,
    setStarRating = null,
}) => {
    const [rating, setRating] = useState(defaultRating);
    const [hover, setHover] = useState(null);

    // console.log("rating paa", rating);

    const handleStarClick = (ratingValue) => {
        if (!disableAction) {
            setRating(ratingValue);
            if (setStarRating) {
                setStarRating(ratingValue);
            }
        }
    };

    const handleStarHover = (ratingValue) => {
        if (!disableAction) {
            setHover(ratingValue);
        }
    };

    const handleStarLeave = () => {
        if (!disableAction) {
            setHover(null);
        }
    };

    return (
        <div className="flex leading-none">
            {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;

                return (
                    <label className="" key={i}>
                        <input
                            type="radio"
                            name="rating"
                            className="hidden"
                            value={ratingValue}
                            onClick={() => handleStarClick(ratingValue)}
                            disabled={disableAction}
                        />

                        <FaStar
                            color={
                                staticColor
                                    ? "#ffc107"
                                    : ratingValue <= (disableAction ? defaultRating : hover || rating)
                                    ? "#ffc107"
                                    : "#211c6a"
                            }
                            className="star"
                            onMouseEnter={() => handleStarHover(ratingValue)}
                            onMouseLeave={handleStarLeave}
                            style={{
                                pointerEvents: disableAction ? "none" : "auto",
                            }}
                        />
                    </label>
                );
            })}
        </div>
    );
};

export default StarRating;
