import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setQuantity, calculateTotals } from "../features/cart/cartSlice";

const CheckOut = () => {
    const { total } = useSelector((store) => store.cart);
    const dispatch = useDispatch();

    return (
        <div className="bg-white flex flex-col filter shadow-down h-[200px] w-full rounded-md m-2 p-2 sticky bottom-2">
            <div className="flex justify-between p-4">
                <div className="flex-1 flex items-center">
                    <div className="border px-[2px] py-[1px] hover:border-violet-500 hover:text-violet-500">
                        <button
                            onClick={() => {
                                dispatch(setQuantity(1));
                                dispatch(calculateTotals());
                            }}
                        >
                            Select All
                        </button>
                    </div>
                    <div className="m-2 border px-[2px] py-[1px] hover:border-violet-500 hover:text-violet-500">
                        <button>Clear Cart</button>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="text-[#211c6a] mr-4 text-xl font-semibold ">
                        Total:
                    </div>
                    <div className="text-[#211c6a] text-xl font-semibold">
                        ${total.toFixed(2)}
                    </div>
                </div>
            </div>
            <div className="p-2 self-end">
                <button className=" w-64 m-2 bg-[#211c6a] text-white p-4 rounded-md">
                    Check Out
                </button>
            </div>
        </div>
    );
};

export default CheckOut;
