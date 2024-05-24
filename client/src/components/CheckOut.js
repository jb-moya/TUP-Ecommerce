import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    calculateTotals,
    checkAll,
    deselectAll,
} from "../features/cart/cartSlice";
import { Tooltip } from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import formatPrice from "./utils/formatPrice";
import classNames from "classnames";

const CheckOut = () => {
    const { total, productCount } = useSelector((store) => store.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoToCheckoutPage = () => {
        navigate("/checkout");
    };

    return (
        <div className="bg-white flex flex-col filter shadow-down h-[200px] w-full rounded-xl m-2 p-2 sticky bottom-2">
            <div className="flex justify-between p-4">
                <div className="flex-1 flex items-center">
                    <div className="m-2 border px-[2px] py-[1px] hover:border-violet-500 hover:text-violet-500">
                        <button
                            onClick={() => {
                                dispatch(calculateTotals());
                                dispatch(checkAll());
                            }}
                        >
                            Select All
                        </button>
                    </div>
                    <div className="m-2 border px-[2px] py-[1px] hover:border-violet-500 hover:text-violet-500">
                        <button
                            onClick={() => {
                                dispatch(calculateTotals());
                                dispatch(deselectAll());
                            }}
                        >
                            Deselect All
                        </button>
                    </div>
                    {/* <div className="m-2 border px-[2px] py-[1px] hover:border-violet-500 hover:text-violet-500">
                        <button
                            onClick={() => {
                                dispatch(removeAllItems());
                            }}
                        >
                            Clear Cart
                        </button>
                    </div> */}
                </div>

                <div className="flex items-center">
                    <div className="text-[#211c6a] mr-4 text-xl font-semibold ">
                        Total:
                    </div>
                    <div className="text-[#211c6a] text-xl font-semibold">
                        ₱ {formatPrice(total)}
                    </div>
                </div>
            </div>
            <div className="p-2 self-end">
                <Tooltip
                    id="my-tooltip"
                    style={{
                        backgroundColor: "#211c6a",
                        color: "#fff",
                        borderRadius: "8px",
                    }}
                />
                <button
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                        productCount === 0
                            ? "Please add items to your cart!"
                            : ""
                    }
                    disabled={productCount === 0}
                    style={{
                        cursor: productCount === 0 ? "not-allowed" : "pointer",
                    }}
                    data-tooltip-place="top"
                    type="button"
                    className={classNames(
                        "w-64 m-2 bg-[#211c6a] text-white p-4 rounded-xl",
                        { "opacity-50": productCount === 0 }
                    )}
                    onClick={handleGoToCheckoutPage}
                >
                    Check Out
                </button>
            </div>
        </div>
    );
};

export default CheckOut;
