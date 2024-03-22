import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Stack,
    Image,
    Button,
    DropdownButton,
    ButtonGroup,
    Dropdown,
} from "react-bootstrap";
import StarRating from "./StarRating.js";
import image from "../components/images/lake-louise-51543_1280.jpg";
import { AiFillLike } from "react-icons/ai";
import UserReview from "./UserReview.js";
import ProductVariation from "./ProductVariation.js";

const Review = () => {
    const filerRating = {
        "All Ratings": null,
        "5 Stars": 5,
        "4 Stars": 4,
        "3 Stars": 3,
        "2 Stars": 2,
        "1 Star": 1,
    };

    const filterDate = ["Latest", "Oldest"];

    const [starFilter, setStarFilter] = useState("Filter by Rating");
    const [dateFilter, setDateFilter] = useState("Latest");

    return (
        <>
            <div className="review-container-stack">
                {/* <Row xs="auto">
                    <Col md={{ offset: 2 }}>
                        <Dropdown className="filter-buttons filter-rating-dropdown">
                            <Dropdown.Toggle
                                variant="primary"
                                id="dropdown-basic"
                            >
                                {starFilter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {Object.keys(filerRating).map((key, idx) => (
                                    <Dropdown.Item
                                        key={idx}
                                        onClick={() => setStarFilter(key)}
                                    >
                                        {key}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                    <Col>
                        <Dropdown className="filter-buttons filter-date-dropdown">
                            <Dropdown.Toggle
                                variant="primary"
                                id="dropdown-basic"
                            >
                                {dateFilter}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {filterDate.map((date, idx) => (
                                    <Dropdown.Item
                                        key={idx}
                                        onClick={() => setDateFilter(date)}
                                    >
                                        {date}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Col>
                </Row> */}
                <UserReview />
                <UserReview />
                <UserReview />
            </div>
        </>
    );
};

export default Review;
