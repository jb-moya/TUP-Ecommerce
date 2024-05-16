import React, { useState, useEffect, useRef, useCallback } from "react";
import defaultProductImage from "../Assets/NoImage.png";
import convertToBase64 from "./utils/convertToBase64";
import axios from "axios";
import { DropDownMenu_1 } from "./utils/Dropdown";
import ImageHolder from "./utils/imageHolder";
import { MdCancel } from "react-icons/md";
import VariationHolder from "./AddVariation";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

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

export const AddProductFrame = () => {
    const { id: editingProductId } = useParams();
    console.log("id: ", editingProductId);
    const priceRef = useRef(null);
    const stockRef = useRef(null);
    const [selectedCategory, setSelectedCategory] = useState(16);
    const maxImageCount = 4;
    const [postImage, setPostImage] = useState([]);
    const [variation, setVariation] = useState([]);
    const [space, setSpace] = useState(0);
    const [descriptionCharCount, setDescriptionCharCount] = useState(0);
    const maxDescriptionCharCount = 10000;
    const [formData, setFormData] = useState({
        name: "",
        price: -1,
        featured: false,
        image: [],
        stock: 0,
        variationClass: "",
        description: "",
        variation: [],
        category: productCategories[16],
    });

    const getSingleProduct = useCallback(async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/v1/products/${editingProductId}`
            );
            const product = response.data.product;
            const {
                name,
                price,
                stock,
                description,
                category,
                variation,
                variationClass,
                image,
            } = product;

            // console.log("editing product:", response);
            console.log("editing product:", product);
            setSelectedCategory(
                Object.keys(productCategories).find(
                    (key) => productCategories[key] === category
                )
            );

            setPostImage(
                image.map((item, index) => ({
                    key: index.toString(),
                    base64: item,
                }))
            );

            setVariation(
                variation.map((item, index) => ({
                    key: index.toString(),
                    name: item.name,
                    price: item.price,
                    stock: item.stock,
                }))
            );

            priceRef.current.value = price;
            stockRef.current.value = stock;

            setFormData({
                name: name,
                featured: false,
                variationClass: variationClass || "",
                description: description.replace(/<br>/g, "\n"),
                category: category,
            });
        } catch (error) {
            console.log(error);
        }
    }, [editingProductId]);

    useEffect(() => {
        console.log("formData: ", formData);
    }, [formData]);

    useEffect(() => {
        if (editingProductId) {
            getSingleProduct();
        }
    }, [editingProductId, getSingleProduct]);

    const handleRemoveVariation = (index) => {
        setSpace((prevSpace) => prevSpace - 120);
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

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            image: postImage
                .filter((item) => item.base64)
                .map((item) => item.base64),
        }));
    }, [postImage]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            category: productCategories[selectedCategory],
        }));
    }, [selectedCategory]);

    useEffect(() => {
        console.log("AHAHAHHAvariation: ", variation);

        if (variation.length === 1) {
            priceRef.current.value = parseFloat(variation[0].price);
            stockRef.current.value = parseInt(variation[0].stock);
        }

        if (variation.length > 1) {
            let minPrice = Number.MAX_VALUE;
            let maxPrice = Number.MIN_VALUE;

            let totalStock = 0;

            variation.forEach((item) => {
                const price = parseFloat(item.price);
                if (price < minPrice) {
                    minPrice = price;
                }

                if (price > maxPrice) {
                    maxPrice = price;
                }

                const stock = parseInt(item.stock, 10);
                if (!isNaN(stock)) {
                    totalStock += stock;
                }

                if (isNaN(price)) {
                    minPrice = 0;
                    maxPrice = 0;
                }
            });

            priceRef.current.value = `${minPrice} - ${maxPrice}`;
            stockRef.current.value = totalStock;
        }

        setFormData((prev) => ({
            ...prev,
            variation: variation,
            price: parseFloat(priceRef.current.value) || -1,
            stock: parseInt(stockRef.current.value),
        }));
    }, [variation, priceRef, stockRef]);

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
        setSpace((prevSpace) => prevSpace + 120);
        setVariation((prev) => [
            ...prev,
            {
                key: prev.length.toString(),
                name: "",
                price: "",
                stock: "",
            },
        ]);
    };

    const createPost = async () => {
        try {
            // send example using axios
            const response = await axios.post(
                "http://localhost:5000/api/v1/products",
                formData
            );

            // console.log(response);
        } catch (error) {
            // console.log(error);
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        createPost();
        // // console.log(postImage);
    };

    const handleEditProduct = (e) => {
        e.preventDefault();

        // edit formData description to replace \n with <br>
        formData.description = formData.description.replace(/\n/g, "<br>");

        updateProduct();
    };

    const updateProduct = async (e) => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/api/v1/products/${editingProductId}`,
                formData
            );

            toast("💩💩 Product updated successfully!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } catch (error) {}
    };

    const handleFileUpload = async (e) => {
        if (e.target.files.length === 0) {
            return; // Exit the function early if no file was selected
        }

        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log("base64: ", base64);
        setPostImage((prev) => {
            const newPostImage = [...prev];
            newPostImage[parseInt(e.target.id, 10)] = {
                key: e.target.id,
                base64: base64,
            };

            return newPostImage;
        });
    };

    const handleChangeProductName = (e) => {
        setFormData({
            ...formData,
            name: e.target.value,
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

    const handleDescriptionChange = (e) => {
        setDescriptionCharCount(e.target.value.length);
        setFormData({
            ...formData,
            description: e.target.value,
        });
    };

    const handleVariationClassChange = (e) => {
        setFormData({
            ...formData,
            variationClass: e.target.value,
        });
    };

    const handlePriceChange = (e) => {
        setFormData({
            ...formData,
            price: parseFloat(e.target.value),
        });
    };

    const handleStockChange = (e) => {
        setFormData({
            ...formData,
            stock: parseInt(e.target.value),
        });
    };

    return (
        <div className="flex w-full mx-auto bg-white rounded-xl shadow-lg">
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
                    <li className="mb-[30px] w-full">Stock: </li>
                    <li className="mb-[30px] w-full">Variation Class: </li>
                    <li
                        style={{ marginBottom: `${space + 70}px` }}
                        className="w-full"
                    >
                        Variations:
                    </li>
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
                        // onSubmit={handleSubmit}
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
                                type="button"
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
                        className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-5 text-sm"
                        type="text"
                        placeholder="Enter product name"
                        value={formData.name}
                        onChange={handleChangeProductName}
                    />
                </div>

                <div>
                    <DropDownMenu_1
                        label={selectedCategory}
                        options={productCategories}
                        selectedOption={selectedCategory}
                        onSelectOption={setSelectedCategory}
                    />
                </div>

                <div>
                    <input
                        ref={priceRef}
                        className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-3 text-sm"
                        type="number"
                        placeholder="Enter price"
                        disabled={variation.length > 0}
                        onChange={handlePriceChange}
                    />
                </div>

                <div>
                    <input
                        ref={stockRef}
                        className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-3 text-sm"
                        type="number"
                        placeholder="Enter stock"
                        disabled={variation.length > 0}
                        onChange={handleStockChange}
                    />
                </div>

                <div>
                    <input
                        className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-3 text-sm"
                        type="text"
                        placeholder="Make it descriptive!"
                        disabled={variation.length === 0}
                        value={formData.variationClass}
                        onChange={handleVariationClassChange}
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
                    className="border-2 w-20 h-20 mx-2 mt-2 mb-[15px]"
                    onClick={handleAddVariation}
                >
                    Add Variation
                </button>

                <div className="relative pb-[20px]">
                    <textarea
                        className="border-2 px-3 w-11/12 text-sm py-1"
                        rows="5"
                        cols="80"
                        placeholder="Enter product description"
                        value={formData.description}
                        onChange={handleDescriptionChange}
                    />
                    <div className="text-right text-xs absolute left-0">
                        {descriptionCharCount}/{maxDescriptionCharCount}
                    </div>
                </div>

                <div className="flex justify-center">
                    {editingProductId ? (
                        <button
                            className="border-2 w-2/3 h-10 self-end m-5 p-2 hover:bg-pink-600"
                            onClick={handleEditProduct}
                        >
                            CONFIRM EDIT PRODUCT
                        </button>
                    ) : (
                        <button
                            className="border-2 w-2/3 h-10 self-end m-5 p-2 hover:bg-pink-600"
                            onClick={handleAddProduct}
                        >
                            CONFIRM ADD PRODUCT
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
