import { IoMdClose } from "react-icons/io";

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
        <div className="w-11/12 border-2 bg-slate-100 relative px-2 py-2 flex justify-between" key={index}>
            <div className="flex flex-col w-3/12 py-2">
                <div className="h-2/9 mb-1">
                    <label className="text-sm px-2">Variation Name</label>
                </div>
                <div className="h-2/9 mb-1">
                    <label className="text-sm px-2">Stocks</label>
                </div>
                <div className="h-2/9 mb-1">
                    <label className="text-sm px-2">Prices</label>
                </div>
            </div>
            <div className="flex flex-col w-8/12 py-2">
                <div>
                    <input
                        className="w-11/12 mb-1 h-6 border-2 rounded-md"
                        type="text"
                        onChange={(e) => handleVariationNameChange(e, index)}
                        value={variation.name}
                    />
                </div>
                <div>
                    <input
                    className="w-11/12 mb-1 h-6 border-2 rounded-md"
                    type="text"
                    onChange={(e) => handleVariationStockChange(e, index)}
                    value={variation.stock}
                    />
                </div>
                <div>
                    <input
                    className="w-11/12 h-6 border-2 rounded-md"
                    type="text"
                    onChange={(e) => handleVariationPriceChange(e, index)}
                    value={variation.price}
                    />
                </div>
            </div>
            <div className="flex flex-col w-1/12 items-end">
                <button
                    type="button"
                    className="hover:bg-red-500 hover:rounded hover:text-white"
                    onClick={() => handleRemoveVariation(index)}
                >
                    <IoMdClose/>
                </button>
            </div>
        </div>
    );
};

export default VariationHolder;
