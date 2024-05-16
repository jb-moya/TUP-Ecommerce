import defaultProductImage from "../../Assets/NoImage.png";

const ImageHolder = ({ index = "0", source, handleFileUpload }) => {
    return (
        <>
            <label className="" htmlFor={index}>
                <img
                    className="w-20 h-20 mx-2 bg-slate-100 rounded-xl object-cover overflow-hidden mb-[15px] cursor-pointer shadow-sm hover:border-2 hover:border-slate-300"
                    src={source || defaultProductImage}
                    alt=""
                />
            </label>

            <input
                className="hidden"
                type="file"
                label="product image"
                name="productImage"
                id={index}
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handleFileUpload(e)}
            />
        </>
    );
};

export default ImageHolder;
