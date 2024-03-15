import React from "react";
import { Stack } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { ProgressBar, Button } from "react-bootstrap";
import StarRating from "./StarRating";

const RatingOverview = () => {
    return (
        <Stack className="rating-overview-container" direction="horizontal">
            <div className="star-rating-container ms-auto">
                <div className="star-rating">
                    <div className="overall-rating">5</div>
                    <div>
                        <StarRating staticColor disableAction />
                        <div className="based-on-reviews">
                            based on 254 reviews.
                        </div>
                    </div>
                </div>
            </div>
            <div className="vr" />
            <div className="rating-overview">
                <div className="row">
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
            <div className="vr-margin" />
            <Button variant="primary" className="write-review">
                Write a Review
            </Button>
            <div className="ms-auto"></div>
        </Stack>
    );
};

<div>f</div>;
export default RatingOverview;
