import React, { useState, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const ProductViolationForm = () => {
    const { id } = useParams();

    const [productName, setProductName] = useState("");
    const [sellerName, setSellerName] = useState("");

    const [formData, setFormData] = useState({
        product: "",
        seller: "",
        violationType: "",
        violationReason: "",
        suggestion: "",
    });

    const fetchData = useCallback(async () => {
        const root = `http://localhost:5000/api/v1/products/${id}`;

        try {
            const response = await axios.get(root);

            setFormData({
                product: response.data.product._id,
                seller: response.data.product.createdBy._id,
            });

            setProductName(response.data.product.name);
            setSellerName(response.data.product.createdBy.orgName);

            console.log("response", response);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const root = `http://localhost:5000/api/v1/violations`;

        try {
            await axios.post(root, formData);
            console.log("formData", formData);
        } catch (error) {
            console.error("Error submitting data:", error);
        }
    };

    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Product Violation Form</h1>
            <div className="flex flex-col">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <div className="w-full mx-2 flex-1">
                            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                                Product Name and ID
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input
                                    value={`${productName} - ${id}`}
                                    name="productName"
                                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                    disabled
                                />
                            </div>
                        </div>
                        <div className="w-full mx-2 flex-1">
                            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                                Seller Name and ID
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input
                                    value={`${sellerName} - ${formData.seller}`}
                                    name="sellerName"
                                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="w-full mx-2 flex-1">
                            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                                Violation Type
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <input
                                    value={formData.violationType}
                                    name="violationType"
                                    placeholder="Input Violation Type"
                                    className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="w-full mx-2 flex-1">
                            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                                Violation Reason
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <textarea
                                    value={formData.violationReason}
                                    name="violationReason"
                                    placeholder="Enter here..."
                                    className="p-1 px-2 appearance-none outline-none w-full h-[100px] text-gray-800"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="w-full mx-2 flex-1">
                            <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                                Suggestion
                            </div>
                            <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                                <textarea
                                    value={formData.suggestion}
                                    name="suggestion"
                                    placeholder="Enter here..."
                                    className="p-1 px-2 appearance-none outline-none w-full h-[100px] text-gray-800"
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex  justify-center mt-8">
                        <button
                            type="submit"
                            className="bg-[#211C6A] text-white uppercase py-2 px-4 w-[200px] mb-8 rounded-xl text-center font-semibold cursor-pointer
                            hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
