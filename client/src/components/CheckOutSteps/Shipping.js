import React, { useContext, useEffect } from "react";
import { CheckOutStepperContext } from "../contexts/CheckOutStepperContext";
import { useSelector } from "react-redux";

const Shipping = () => {
    const { user } = useSelector((state) => state.user);
    const { userData, setUserData } = useContext(CheckOutStepperContext);

    useEffect(() => {
        if (user) {
            setUserData((prevUserData) => ({
                ...prevUserData,
                fName: user.firstName,
                lName: user.lastName,
                userAddress: user.address,
            }));
        }
    }, [user, setUserData]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'shippingMethod') {
            if (value === 'Self-PickUp') {
                setUserData({ ...userData, ...selfPickupAddress, [name]: value });
            } else if (value === 'Door-to-Door Delivery') {
                setUserData({ ...userData, address: '', [name]: value });
            }
        } else if (name === 'sameAsAddress') {
            if (checked) {
                setUserData({ ...userData, address: userData['userAddress'], [name]: value});
            } else {
                setUserData({ ...userData, address: '', [name]: value });
            }
        
        } else {
            setUserData({ ...userData, [name]: type === 'checkbox' ? checked : value });
        }
    };

    const selfPickupAddress = {
        address: "San Marcelino St, Ayala Blvd, Ermita, Manila, 1000"
    };

    return (
        <div>
            <div className="p-1 flex flex-col relative">
                <strong className="my-1">Shipping Method</strong>
                <div className="p-1 px-2">
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="shippingMethod"
                                value="Door-to-Door Delivery"
                                checked={userData.shippingMethod === "Door-to-Door Delivery"}
                                onChange={handleChange}
                                className="form-radio text-indigo-600"
                                required
                            />
                            <span className="ml-2">Door-to-Door Delivery</span>
                        </label>
                    </div>
                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="shippingMethod"
                                value="Self-PickUp"
                                checked={userData.shippingMethod === "Self-PickUp"}
                                onChange={handleChange}
                                className="form-radio text-indigo-600"
                                required
                            />
                            <span className="ml-2">Self-Pickup</span>
                        </label>
                    </div>
                </div>
                <div className="mt-3 my-1">
                    <strong className="block my-1">Shipping Address</strong>

                    <label className="block inline-flex items-center">
                        <input
                            type="checkbox"
                            name="sameAsAddress"
                            // checked={userData.sameAsAddress}
                            onChange={handleChange}
                            className="form-checkbox text-indigo-600"
                            disabled={userData.shippingMethod === 'Self-PickUp'}
                        />
                        <span className="ml-2">Same as my address</span>
                    </label>

                    <div className="flex w-full justify-between">
                        <div className="w-[250px] mr-2">
                            <div className={`my-2 p-1 flex border border-[#211C6A] rounded ${userData["fName"] ? 'bg-gray-200' : 'bg-white'}`}>
                                <input
                                    onChange={handleChange}
                                    value={userData["fName"] || ""}
                                    name="fName"
                                    placeholder="First Name"
                                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                    disabled={userData["fName"] !== ""}
                                    required
                                />
                            </div>
                        </div>

                        <div className="w-[250px]">
                            <div className={`my-2 p-1 flex border border-[#211C6A] rounded ${userData["fName"] ? 'bg-gray-200' : 'bg-white'}`}>
                                <input
                                    onChange={handleChange}
                                    value={userData["lName"] || ""}
                                    name="lName"
                                    placeholder="Last Name"
                                    className={`p-1 px-2 appearance-none outline-none w-full text-gray-800`}
                                    disabled={userData["fName"] !== ""}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <div className={`my-2 p-1 flex border border-[#211C6A] rounded ${userData.shippingMethod === 'Self-PickUp' ? 'bg-gray-200' : 'bg-white'}`}> 
                                {/* ayaw gumana ng background color change sa part na to */}
                            <input
                                onChange={handleChange}
                                value={userData["address"] || ""}
                                name="address"
                                placeholder="Address"
                                className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                disabled={userData.shippingMethod === 'Self-PickUp'}
                                required
                            />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default Shipping;
