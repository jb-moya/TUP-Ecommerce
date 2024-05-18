import React, { useContext } from "react";
import PDFHolder from "../utils/pdfHolder";
import convertToBase64 from "../utils/convertToBase64";
import { StepperContext } from "../contexts/StepperContext";

export const Details = () => {
    const { userData, setUserData } = useContext(StepperContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleFileUpload = async (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setUserData({ ...userData, accreditationDoc: base64 });
    };

    return (
        <div className="flex flex-col">
            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    Representative Name
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    {" "}
                    {/* REPRESENTATIVE NAME */}
                    <input
                        onChange={handleChange}
                        value={userData["repName"] || ""}
                        name="repName"
                        placeholder="Enter representative name (e.g. Dela Cruz, Juan)"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>

                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    Representative Position
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    {" "}
                    {/* REPRESENTATIVE POSITION */}
                    <input
                        onChange={handleChange}
                        value={userData["repPos"] || ""}
                        name="repPos"
                        placeholder="Enter representative position"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>

                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    Representative Email
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    {" "}
                    {/* REPRESENTATIVE EMAIL */}
                    <input
                        onChange={handleChange}
                        value={userData["repEmail"] || ""}
                        name="repEmail"
                        placeholder="Enter representative email"
                        className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
                    />
                </div>

                <div className="font-bold h-6 mt-4 text-gray-500 text-xs leading-8 uppercase">
                    Provide a brief description about the organization
                </div>
                <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
                    {" "}
                    {/* ORGANIZATION DESCRIPTION */}
                    <textarea
                        onChange={handleChange}
                        value={userData["description"] || ""}
                        name="description"
                        placeholder="Enter here..."
                        className="p-1 px-2 appearance-none outline-none w-full h-[100px] text-gray-800"
                    />
                </div>
            </div>

            <div className="w-full mx-2 flex-1">
                <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
                    Organization Accreditation Certificate
                </div>
                <div className="bg-white my-2 p-1 flex items-center">
                    <PDFHolder
                        handleFileUpload={handleFileUpload}
                        name="accreditationDoc"
                    />
                </div>
            </div>
        </div>
    );
};
