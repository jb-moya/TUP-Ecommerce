import React from "react";

import { Row, Col, Image, Button } from "react-bootstrap";
import StarRating from "./StarRating.js";
import image from "../components/images/lake-louise-51543_1280.jpg";
import { AiFillLike } from "react-icons/ai";

const UserReview = () => {
    return (
        <div className="w-[700px] mb-2">
            <div className="flex justify-between items-center mb-1">
                <div className="">
                    <div className="w-10 h-10">
                        <img
                            className="w-full h-full rounded-full object-cover overflow-hidden"
                            src={image}
                            alt=""
                        />
                    </div>
                </div>
                <div className="pl-2">John Smilga</div>
                <div className="ml-auto">Apr 1, 2024</div>
            </div>
            <div className="flex items-center">
                <div className="pr-2 mb-1">
                    <StarRating staticColor disableAction />
                </div>
                <div className="text-[#211c6a]">
                    WOW
                </div>
            </div>
            <div className="">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum veniam quo officia neque, magnam deleniti repellat nam animi odio. Nam.
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
