import React from "react";


export const SellerSettings = () => {
    return (
        <div className="flex w-[1000px] mx-auto bg-white ">
            <div className="ml-[60px] w-[200px] flex-wrap flex flex-col">
                <div className="flex-wrap flex font-bold flex-row px-5 py-6 border-gray-300">
                    Basic Information
                </div>

                <div className="w-full flex justify-center ">
                    <hr className="border-t border-gray-300 w-[200px]" />
                </div>
                <br></br>

                <ul className="flex flex-col items-end px-5">
                    <li className="text-center mb-[70px] px-2">Product Images:
                        <br></br>
                        *1:1 Image
                    </li>
                    <li className="mb-[90px] px-2">
                        Product Video:
                    </li>
                    <li className="mb-[20px] px-2">
                        Product Name:
                    </li>
                    <li className="mb-[30px] px-1">
                        Product Category:
                    </li>
                    <li className="mb-[40px]">
                        Product Description:
                    </li>
                </ul>
            </div>

            <div className="flex flex-col w-full ">

                <div className="px-5 py-9"></div>
                <br></br>

                <img
                    className="w-[100px] h-[100px] bg-white rounded-md object-cover overflow-hidden mb-[15px] "
                    src={""}
                    alt=""
                />
                <div className="flex"> 
                <img
                    className="w-[100px] h-[100px] mb-5 bg-white rounded-md object-cover overflow-hidden"
                    src={""}
                    alt=""
                />
             <ul className="text-sm w-[600px] px-4">
                <li>• Size: Max 30Mb, resolution should not exceed 1280x1280px</li>
                <li>• Duration: 10s-60s</li>
                <li>• Format: MP4</li>
                <li>• Note: You can publish this listing while the video is being processed. Video will be shown in listing once successfully processed</li>
            </ul>

                </div>
               

                <div>
                    <input className="w-11/12 mb-5 h-6 border-2 rounded-md px-3" type="text" />
                </div>

                <div>
                    <input className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 " type="text" />
                </div>

                <div className="pb-[20px]">
                    <textarea
                        className="border-2 px-3 w-11/12"
                        rows="5"
                        cols="80"
                    />
                </div>
            </div>

           
        </div>
    );
};


