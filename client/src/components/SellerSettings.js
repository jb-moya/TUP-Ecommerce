import React, { useState, useEffect, useRef } from "react";
import defaultProductImage from "../Assets/NoImage.png";
import convertToBase64 from "./utils/convertToBase64";
import axios from "axios";
import DropDownMenu from "./utils/Dropdown";
import ImageHolder from "./utils/imageHolder";
import { MdCancel } from "react-icons/md";
import VariationHolder from "./AddVariation";

const productCategories = {
    1: "Electronics",
    2: "Clothing",
    3: "Shoes",
    4: "Books",
    5: "Beauty",
    6: "Health",
    7: "Home",
    8: "Garden",
    9: "Toys",
    10: "Sports",
    11: "Outdoors",
    12: "Automotive",
    13: "Accessories",
    14: "Industrial",
    15: "Handmade",
    16: "Other",
};

export const SellerSettings = () => {
    const priceRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState(
        productCategories[16]
    );
    const maxImageCount = 4;
    const [postImage, setPostImage] = useState([]);
    const [variation, setVariation] = useState([]);

    const handleRemoveVariation = (index) => {
        console.log("handleRemoveVariation index: ", index);

        setVariation((prev) => {
            const newPostImage = [...prev];
            newPostImage.splice(index, 1);

            return newPostImage.map((item, idx) => ({
                ...item,
                key: idx.toString(),
            }));
        });
    };

    const handleRemoveImage = (index) => {
        setPostImage((prev) => {
            const newPostImage = [...prev];
            newPostImage.splice(parseInt(index, 10), 1);

            return newPostImage.map((item, idx) => ({
                ...item,
                key: idx.toString(),
            }));
        });
    };

    // useEffect(() => {
    //     console.log("postImage: ", postImage);
    // }, [postImage]);

    useEffect(() => {
        // calculate the range of prices of the variation, edit the priceRef
        console.log("priceRef: ", priceRef.current);

        // check if theres only one variation
        if (variation.length === 1) {
            priceRef.current.value = variation[0].price;
        } 

        if (variation.length > 1) {
            let minPrice = Number.MAX_VALUE;
            let maxPrice = Number.MIN_VALUE;
            
            variation.forEach((item) => {
                const price = parseFloat(item.price);
                if (price < minPrice) {
                    minPrice = price;
                }

                if (price > maxPrice) {
                    maxPrice = price;

                }

                // check if price is null or undefined
                if (isNaN(price)) {
                    minPrice = 0;
                    maxPrice = 0;
                }
            });

            priceRef.current.value = `${minPrice} - ${maxPrice}`;
        }

        console.log("variation: ", variation);
    }, [variation, priceRef]);

    const handleAddImage = () => {
        setPostImage((prev) => [
            ...prev,
            {
                key: prev.length.toString(),
                base64: "",
            },
        ]);
    };

    const handleAddVariation = () => {
        setVariation((prev) => [
            ...prev,
            {
                key: prev.length.toString(),
                sku: "",
                name: "",
                price: "",
                stock: "",
            },
        ]);
    };

    const createPost = async () => {
        try {
            // ...
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPost();
        console.log(postImage);
    };

    const handleFileUpload = async (e) => {
        console.log("e.target index: ", e.target.id);
        console.log("postImage", postImage);
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log("base64");
        console.log(base64);

        setPostImage((prev) => {
            const newPostImage = [...prev];
            newPostImage[parseInt(e.target.id, 10)] = {
                key: e.target.id,
                base64: base64,
            };

            return newPostImage;
        });
    };

    const handleVariationNameChange = (e, index) => {
        setVariation((prev) => {
            const newVariation = [...prev];
            newVariation[index].name = e.target.value;

            return newVariation;
        });
    };

    const handleVariationPriceChange = (e, index) => {
        setVariation((prev) => {
            const newVariation = [...prev];
            newVariation[index].price = e.target.value;

            return newVariation;
        });
    };

    const handleVariationStockChange = (e, index) => {
        setVariation((prev) => {
            const newVariation = [...prev];
            newVariation[index].stock = e.target.value;

            return newVariation;
        });
    };

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
                    <li className="text-left mb-[66px] w-full">
                        Product Images:
                        <br></br>
                        *1:1 Image
                    </li>
                    <li className="mb-[20px] w-full">Product Name:</li>
                    <li className="mb-[30px] w-full">Product Category:</li>
                    <li className="mb-[30px] w-full">Price: </li>
                    <li className="mb-[30px] w-full">Variations:</li>
                    <li className="mb-[40px] w-full text-left">
                        Product Description:
                    </li>
                </ul>
            </div>

            <div className="flex flex-col w-full ">
                <div className="px-5 py-9"></div>
                <br></br>

                <div className="flex">
                    <form
                        className="flex flex-row flex-wrap"
                        onSubmit={handleSubmit}
                    >
                        {postImage.map((item) => (
                            <div className="relative" key={item.key}>
                                <ImageHolder
                                    key={item.key}
                                    index={item.key}
                                    handleFileUpload={handleFileUpload}
                                    source={item.base64}
                                />
                                <button
                                    type="button"
                                    className="absolute bottom-[80%] left-[70%]"
                                    onClick={() => handleRemoveImage(item.key)}
                                >
                                    <MdCancel
                                        size={25}
                                        className="text-white drop-shadow-md hover:text-red-600"
                                    />
                                </button>
                            </div>
                        ))}

                        {postImage.length < maxImageCount && (
                            <button
                                className="border-2 w-20 h-20 mx-2 mb-[15px]"
                                onClick={handleAddImage}
                            >
                                Add Image
                            </button>
                        )}
                    </form>
                </div>
                <div>
                    <input
                        className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-5"
                        type="text"
                    />
                </div>

                <div>
                    <DropDownMenu
                        label={selectedCategory}
                        options={productCategories}
                        selectedOption={selectedCategory}
                        onSelectOption={setSelectedCategory}
                    />
                </div>

                <div>
                    <input
                        ref={priceRef}
                        className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-5"
                        type="text"
                        // disable if one variaiton is added
                        disabled={variation.length > 0}
                    />
                </div>

                {variation.map((item) => (
                    <VariationHolder
                        key={item.key}
                        index={item.key}
                        variation={item}
                        handleRemoveVariation={handleRemoveVariation}
                        handleVariationNameChange={handleVariationNameChange}
                        handleVariationPriceChange={handleVariationPriceChange}
                        handleVariationStockChange={handleVariationStockChange}
                    />
                ))}

                <button
                    className="border-2 w-20 h-20 mx-2 mb-[15px]"
                    onClick={handleAddVariation}
                >
                    Add Variation
                </button>

                <div className="pb-[20px]">
                    <textarea
                        className="border-2 px-3 w-11/12"
                        rows="5"
                        cols="80"
                    />
                </div>

                <button className="border-2 w-full h-10 p-2 hover:bg-pink-600"> CONFIRM ADD PRODUCT</button>
            </div>
        </div>
    );
};
