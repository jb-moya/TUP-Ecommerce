import React from "react";

import { Row, Col, Image, Button } from "react-bootstrap";
import StarRating from "./StarRating.js";
import image from "../components/images/lake-louise-51543_1280.jpg";
import { AiFillLike } from "react-icons/ai";
import defaultProfileImage from "../Assets/defaultPP.png";

const UserReview = ({ review }) => {
    const createdAt = new Date(review.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="w-[700px] mb-2">
            <div className="flex justify-between items-center mb-1">
                <div className="">
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full rounded-full object-cover overflow-hidden"
                            src={review.user.image || defaultProfileImage}
                            alt=""
                        />
                    </div>
                </div>
                <div className="pl-2">
                    {review.user.firstName} {review.user.lastName}
                </div>
                <div className="ml-auto">{createdAt}</div>
            </div>
            <div className="flex items-center">
                <div className="pr-2 mb-1">
                    <StarRating disableAction={true} defaultRating={review.rating}/>
                </div>
                <div className="text-[#211c6a]">{review.title}</div>
            </div>
            <div className="">
                {review.comment}
            </div>
            {/* <div className="mt-2"> */}
            {/* <button className="flex items-center rounded px-[4px] py-[2px] border text-[#59b4c3] border-[#59b4c3] leading-none">
                    <AiFillLike className="mr-1" />
                    <div className="">5</div>
                </button> */}
            {/* </div> */}
            <hr className="w-full m-auto mt-2 rounded border-t-1 border-black border-opacity-10 mb-4"></hr>
        </div>
    );
};

export default UserReview;
