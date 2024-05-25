import React, { useEffect, useState } from "react";
import SampleLogo from "../OrganizationAssets/SampleLogo.png";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import defaultProfileImage from "../Assets/defaultPP.png";
import { SearchPageFrame } from "../components/SearchPageFrame.js";
import axios from "axios";
axios.defaults.withCredentials = true;

const NewOrganizationFrame = () => {
    const { id: organizationIDinURL } = useParams();
    console.log("organizationIDinURL", organizationIDinURL);
    const navigate = useNavigate();
    const [isCurrentlyFetching, setIsCurrentlyFetching] = useState(false);
    const [orgDetails, setOrgDetails] = useState({});

    function rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function imgUrl() {
        const id = rand(1, 200);
        return `https://picsum.photos/id/${id}/1920/1080`;
    }

    const handleSeeMore = () => {
        // Navigate to the desired route
        navigate("/");
    };

    const fetchOrganizationDetails = async () => {
        setIsCurrentlyFetching(true);
        console.log("Fetching All Organizations");
        const { data } = await axios.get(
            "http://localhost:5000/api/v1/user/singleOrganization",
            {
                params: {
                    id: organizationIDinURL,
                },
            }
        );
        console.log("org", data);
        setOrgDetails(data.seller);
    };

    useEffect(() => {
        if (organizationIDinURL) {
            fetchOrganizationDetails();
        }
    }, [organizationIDinURL]);

    return (
        <div>
            <div className="bg-[#211C6A]">
                <div className="flex flex-col max-w-[1240px] m-10 pt-[90px] mx-auto select-none items-center p-4">
                    <img
                        className="w-[150px] h-[150px] mr-4 rounded-full"
                        src={
                            orgDetails && orgDetails.image
                                ? orgDetails.image
                                : defaultProfileImage
                        }
                        alt=""
                        loading="lazy"
                    />
                    <div className="flex flex-col w-8/12 text-white p-4 text-center">
                        <h1 className="font-semibold text-4xl mb-4">
                            {orgDetails && orgDetails.orgName}
                        </h1>
                        <p> {orgDetails && orgDetails.description}</p>
                    </div>
                </div>
            </div>
            <SearchPageFrame />
        </div>
    );
};

export default NewOrganizationFrame;
