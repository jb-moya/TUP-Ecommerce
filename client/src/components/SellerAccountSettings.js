import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { rootUrl } from "../App";
axios.defaults.withCredentials = true;

const SellerAccountSettings = () => {
    const [userData, setUserData] = useState({
        orgName: "",
        email: "",
        contactNumbers: "",
        representative: {
            name: "",
            position: "",
            email: "",
        },
        description: "",
    });

    const fetchUserDetails = async () => {
        try {
            const response = await axios.get(
                `${rootUrl}/user/getAccountDetails`
            );
            console.log(response.data);
            setUserData(response.data.user);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("userData", userData);
    }, [userData]);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    return (
        <div className="w-full bg-white rounded-lg p-8 shadow-lg">
            <h1 className="font-semibold">My Account</h1>
            <h2 className="text-sm font-light mb-1">Account Information</h2>
            <hr className="mb-4" />
            <form>
                <div className="flex pl-3 py-1">
                    <label className="w-3/12 font-light text-sm" htmlFor="name">
                        Organization Name
                    </label>
                    <input
                        placeholder={userData.orgName | ""}
                        className="border border-1"
                        type="text"
                        id="name"
                        name="name"
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="w-3/12 font-light text-sm"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        placeholder={userData.email | ""}
                        className="border border-1"
                        type="text"
                        id="email"
                        name="email"
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="w-3/12 font-light text-sm"
                        htmlFor="email"
                    >
                        Contact Number
                    </label>
                    <input
                        placeholder={userData.contactNumbers | ""}
                        className="border border-1"
                        type="text"
                        id="contactNumber"
                        name="contactNumber"
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="w-full font-light text-sm"
                        htmlFor="password"
                    >
                        Representative
                    </label>
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="pl-8 w-3/12 font-light text-sm"
                        htmlFor="password"
                    >
                        Name
                    </label>
                    <input
                        placeholder={
                            userData.representative &&
                            userData.representative.name | ""
                        }
                        className="border border-1"
                        type="text"
                        id="repName"
                        name="repName"
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="pl-8 w-3/12 font-light text-sm"
                        htmlFor="password"
                    >
                        Position
                    </label>
                    <input
                        placeholder={
                            userData.representative &&
                            userData.representative.position | ""
                        }
                        className="border border-1"
                        type="text"
                        id="position"
                        name="position"
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="pl-8 w-3/12 font-light text-sm"
                        htmlFor="password"
                    >
                        Email
                    </label>
                    <input
                        placeholder={
                            userData.representative &&
                            userData.representative.email | ""
                        }
                        className="border border-1"
                        type="text"
                        id="repEmail"
                        name="repEmail"
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="w-3/12 font-light text-sm"
                        htmlFor="password"
                    >
                        Description
                    </label>
                    <input
                        placeholder={userData.description | ""}
                        className="border border-1"
                        type="text"
                        id="description"
                        name="description"
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="w-3/12 font-light text-sm"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <input
                        className="border border-1"
                        type="password"
                        id="password"
                        name="password"
                    />
                </div>
                <div className="flex pl-3 py-1">
                    <label
                        className="w-3/12 font-light text-sm"
                        htmlFor="confirmPassword"
                    >
                        Confirm Password
                    </label>
                    <input
                        className="border border-1"
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                    />
                </div>
                <button
                    type="submit"
                    className="hover:bg-blue-600 mt-10 hover:text-white text-black p-2 rounded-lg font-light border border-1"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default SellerAccountSettings;
