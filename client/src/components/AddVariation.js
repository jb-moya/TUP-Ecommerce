import { MdCancel } from "react-icons/md";

const VariationHolder = ({
    index,
    variation,
    handleRemoveVariation,
    handleVariationNameChange,
    handleVariationPriceChange,
    handleVariationStockChange,
}) => {
    console.log("VariationHolder111111", index)

    return (
        <div className="border-2 bg-slate-100 relative" key={index}>
            <label className="font-bold pb-1 px-2">Variation Name</label>
            <input
                className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-5"
                type="text"
                onChange={(e) => handleVariationNameChange(e, index)}
                value={variation.name}
            />
            <label className="font-bold pb-1 px-2">Stocks</label>
            <input
                className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-5"
                type="text"
                onChange={(e) => handleVariationStockChange(e, index)}
                value={variation.stock}
            />
            <label className="font-bold pb-1 px-2">price</label>
            <input
                className="w-11/12 mb-5 h-6 border-2 rounded-md px-3 mt-5"
                type="text"
                onChange={(e) => handleVariationPriceChange(e, index)}
                value={variation.price}
            />

            <button
                type="button"
                className="absolute bottom-[85%] left-[95%]"
                onClick={() => handleRemoveVariation(index)}
            >
                remove
            </button>
        </div>
    );
};

export default VariationHolder;
