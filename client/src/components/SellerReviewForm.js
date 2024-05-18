import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

export const SellerReviewForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [userDetails, setUserDetails] = useState({});
    const [accreditationDoc, setAccreditationDoc] = useState(null);

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/user/singleOrganization`,
                {
                    params: {
                        id,
                    },
                }
            );
            console.log("response", response.data);
            setUserDetails(response.data.seller);
            setAccreditationDoc(response.data.seller.accreditationDoc);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const updateStatusOrganization = async (status) => {
        // try {
        //     const response = await axios.patch(
        //         `http://localhost:5000/api/v1/user/updateStatusOrganization`,
        //         {
        //             id,
        //             status: status,
        //         }
        //     );
        //     console.log("response", response.data);
        //     toast.info(`Organization ${status} successfully`);
        // } catch (error) {
        //     console.error(error);
        //     toast.error(`Failed to ${status} organization`);
        // }
    };

    return (
        <div className="flex flex-col max-w-[1240px] mx-auto mt-[96px] text-[#211C6A] justify-center">
            <div className="text-5xl font-bold mt-8 text-center">
                Seller Review Form
            </div>
            <div className="bg-white border rounded-xl shadow-md w-full px-10 max-w-[1000px] mx-auto select-none z-1 mt-8">
                <div className="text-2xl font-bold mt-8">Shop Information</div>
                <div className="flex flex-col">
                    <div className="w-full mx-2 flex-1">
                        {" "}
                        {/*  ORGANIZATION NAME */}
                        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                            Organization Name
                        </div>
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                value={userDetails.orgName}
                                name="orgName"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                disabled
                            />
                        </div>
                    </div>

                    <div className="w-full mx-2 flex-1">
                        {" "}
                        {/*  ORGANIZATION EMAIL */}
                        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                            Organization Email
                        </div>
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                value={userDetails.email}
                                name="email"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                disabled
                            />
                        </div>
                    </div>

                    <div className="w-full mx-2 flex-1">
                        {" "}
                        {/*  ORG PHONE NUMBER(s) */}
                        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                            Phone Number
                        </div>
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            <input
                                value={
                                    userDetails.contactNumbers &&
                                    userDetails.contactNumbers.join(", ")
                                }
                                name="phoneNum"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <div className="text-2xl font-bold mt-8">
                    Business Information
                </div>
                <div className="flex flex-col">
                    <div className="w-full mx-2 flex-1">
                        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                            Representative Name
                        </div>
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            {" "}
                            {/* REPRESENTATIVE NAME */}
                            <input
                                value={
                                    userDetails.representative &&
                                    userDetails.representative.name
                                }
                                name="repName"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                disabled
                            />
                        </div>

                        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                            Representative Position
                        </div>
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            {" "}
                            {/* REPRESENTATIVE POSITION */}
                            <input
                                value={
                                    userDetails.representative &&
                                    userDetails.representative.position
                                }
                                name="repPos"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                disabled
                            />
                        </div>

                        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                            Representative Email
                        </div>
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            {" "}
                            {/* REPRESENTATIVE EMAIL */}
                            <input
                                value={
                                    userDetails.representative &&
                                    userDetails.representative.email
                                }
                                name="repEmail"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                disabled
                            />
                        </div>

                        <div className="font-bold h-6 mt-4 text-gray-500 text-xs leading-8 uppercase">
                            Provide a brief description about the organization
                        </div>
                        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                            {" "}
                            {/* ORGANIZATION DESCRIPTION */}
                            <textarea
                                value={userDetails.description}
                                name="description"
                                placeholder="Enter here..."
                                className="p-1 px-2 appearance-none outline-none w-full h-[100px] text-gray-800"
                                disabled
                            />
                        </div>
                    </div>

                    <div className="w-full mx-2 flex-1 mb-4">
                        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                            Organization Accreditation Certificate
                        </div>
                        <iframe
                            title="accreditationDoc"
                            src={accreditationDoc}
                            width="100%"
                            height="600px"
                        ></iframe>
                    </div>
                </div>
                <div className="flex  justify-center mt-8">
                    {userDetails.status === "pending" && (
                        <>
                            <button
                                className="bg-green-700 mr-2 text-white uppercase py-2 px-4 w-[200px]  mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-green-500 hover:text-white transition duration-200 ease-in-out"
                                onClick={() =>
                                    updateStatusOrganization("approved")
                                }
                            >
                                Approve
                            </button>
                            <button
                                className="bg-red-700 mr-2  text-white uppercase  py-2 px-4  w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-red-500 hover:text-white transition duration-200 ease-in-out"
                                onClick={() =>
                                    updateStatusOrganization("rejected")
                                }
                            >
                                Disapprove
                            </button>
                        </>
                    )}
                    <button
                        className="bg-red-700 text-white uppercase  py-2 px-4 w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                        onClick={() => updateStatusOrganization("banned")}
                    >
                        Ban
                    </button>
                    <button
                        className="bg-[#211C6A] text-white uppercase  py-2 px-4 w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                        onClick={() => navigate("/admin/manageUsers")}
                    >
                        Go Back
                    </button>
                </div>
            </div>
        </div>
    );
};
