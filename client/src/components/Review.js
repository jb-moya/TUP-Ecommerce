import React, { useEffect, useState, useCallback, useMemo } from "react";
import UserReview from "./UserReview.js";
import { DropDownMenu } from "./utils/Dropdown.js";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { buildQueryParam } from "./utils/buildQueryParams.js";
import LoadingSymbol from "./loadingScreen.js";
axios.defaults.withCredentials = true;

const Review = ({ productID }) => {
    let location = useLocation();
    const [userReviews, setUserReviews] = useState([]);
    const [toggleDateSort, setToggleDateSort] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [reviewCount, setReviewCount] = useState(0);

    const filterRating = {
        0: "All",
        1: "1 star",
        2: "2 stars",
        3: "3 stars",
        4: "4 stars",
        5: "5 stars",
    };

    const [starFilter, setStarFilter] = useState(0);

    useEffect(() => {
        const filterParams = new URLSearchParams(location.search);

        if (filterParams.has("rating")) {
            setStarFilter(parseInt(filterParams.get("rating"), 10));
        }

        if (filterParams.has("dateSort")) {
            // toast.info(`getting ${searchParams.get("dateSort")}`);
            setToggleDateSort(parseInt(filterParams.get("dateSort"), 10));
        }
    }, [location.search]);

    const numericFilters = useMemo(() => {
        const numericFiltersArray = [];

        if (parseInt(starFilter) > 0) {
            numericFiltersArray.push(`rating=${starFilter}`);
        }

        return numericFiltersArray.join(",");
    }, [starFilter]);

    const fetchReviews = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/reviews/product/${productID}`,
                {
                    params: {
                        numericFilters: numericFilters,
                        sort: [
                            [
                                "createdAt",
                                toggleDateSort === 1
                                    ? "ascending"
                                    : "descending",
                            ],
                        ],
                    },
                }
            );

            setReviewCount(response.data.count);
            setReviewCount(response.data.count);
            setReviewCount(response.data.count);
            setReviewCount(response.data.count);
            if (response.length === 0) {
                setUserReviews([]);
            } else {
                setUserReviews(response.data.reviews);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, [productID, numericFilters, toggleDateSort]);

    useEffect(() => {
        fetchReviews();

        const params = [
            buildQueryParam("rating", starFilter > 0 ? starFilter : ""),
            buildQueryParam(
                "dateSort",
                toggleDateSort !== 1 ? toggleDateSort : ""
            ),
        ].filter(Boolean);

        const newUrl = `${location.pathname}?${params.join("&")}`;
        window.history.replaceState({ path: newUrl }, "", newUrl);
    }, [
        productID,
        fetchReviews,
        location.pathname,
        toggleDateSort,
        starFilter,
    ]);

    return (
        <>
            <div className="">
                {reviewCount > 0 && !isLoading && (
                    <>
                        <DropDownMenu
                            label={
                                starFilter === 0
                                    ? "All"
                                    : filterRating[starFilter]
                            }
                            options={filterRating}
                            selectedOption={starFilter}
                            onSelectOption={(option) =>
                                setStarFilter(parseInt(option))
                            }
                        />

                        <button
                            className={
                                toggleDateSort === 1
                                    ? "py-1 px-2 mr-2 rounded-lg bg-[#59b5c3] text-white"
                                    : "py-1 px-2 mr-2 rounded-lg bg-white text-[#211C6A]"
                            }
                            onClick={() => setToggleDateSort(-toggleDateSort)}
                        >
                            {toggleDateSort === 1 ? "Latest" : "Oldest"}
                        </button>
                    </>
                )}
                {isLoading ? (
                    <div className="text-center">
                        <LoadingSymbol showWhen={true} message="Fetching reviews"/>
                    </div>
                ) : userReviews.length === 0 ? (
                    <div className="text-center">No reviews available</div>
                ) : (
                    userReviews.map((review) => (
                        <UserReview key={review._id} review={review} />
                    ))
                )}
            </div>
        </>
    );
};

export default Review;
