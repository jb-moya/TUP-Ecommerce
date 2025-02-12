import React from "react";
import OrderQuantity from "./OrderQuantity";
import {
    removeItem,
    setQuantity,
    toggleCheck,
} from "../features/cart/cartSlice";
import { deleteItemFromDB } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";
import formatPrice from "./utils/formatPrice";
import { Link } from "react-router-dom";

const NoImage = () => {
    return (
        <div className="w-full h-full bg-slate-200 flex text-[#abb7c5] justify-center items-center rounded">
            Unavailable Image
        </div>
    );
};

const ItemStock = ({ stock }) => {
    const InStockStyle = "text-green-500";
    const OutOfStockStyle = "text-red-500";

    return (
        <div className={stock === 0 ? OutOfStockStyle : InStockStyle}>
            {stock === 0 ? "Out of Stock" : `${stock} In Stock`}
        </div>
    );
};

const CartItem = ({ cartItem }) => {
    console.log("cartItem", cartItem);

    const dispatch = useDispatch();

    const handleQuantityChange = (newQuantity) => {
        dispatch(setQuantity({ id: cartItem._id, quantity: newQuantity }));
    };

    const handleCheck = () => {
        dispatch(toggleCheck({ id: cartItem._id }));
    };

    return (
        <div className="grid grid-cols-12 auto-rows-min gap-2 items-center text-center leading-none mx-4">
            <div className="col-span-8 flex self-start">
                <input
                    className="w-4 h-4 mr-4 self-center"
                    onClick={handleCheck}
                    type="checkbox"
                    readOnly
                    checked={cartItem.checked}
                />
                <div className="w-32 h-32 mr-4 rounded border-1 border shadow-sm">
                    {cartItem.productDetails.image &&
                    cartItem.productDetails.image.length !== 0 ? (
                        <img
                            className="w-full h-full object-cover rounded"
                            src={cartItem.productDetails.image[0]}
                            alt={cartItem.productDetails.name}
                        />
                    ) : (
                        <NoImage />
                    )}
                </div>
                <div className="flex flex-1 flex-col">
                    <Link
                        to={`/product/${cartItem.product}`}
                        className="text-left font-semibold underline"
                    >
                        {cartItem.productDetails.name}
                    </Link>
                    <div className="text-left leading-6 text-sm">
                        {cartItem.variation
                            ? cartItem.productDetails.variation[0].name
                            : ""}
                    </div>

                    <div className="flex flex-1 items-end">
                        <button
                            className="px-[2px] py-[1px] w-max text-red-500 hover:text-violet-500 border hover:border-violet-500"
                            onClick={() => {
                                dispatch(removeItem({ id: cartItem._id }));
                                dispatch(deleteItemFromDB(cartItem._id));
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <div className="col-span-4 grid grid-cols-12 self-start items-baseline">
                <div className="col-span-4">
                    {cartItem.productDetails.price !== -1
                        ? cartItem.productDetails.price
                        : cartItem.productDetails.variation.filter((v) => {
                              return v._id === cartItem.variation;
                          })[0].price}
                </div>
                <div className="col-span-4">
                    <OrderQuantity
                        maximum={
                            cartItem.productDetails.variation.length > 0
                                ? cartItem.productDetails.variation.filter(
                                      (v) => {
                                          return v._id === cartItem.variation;
                                      }
                                  )[0].stock
                                : cartItem.productDetails.stock
                        }
                        quantity={cartItem.quantity}
                        onQuantityChange={handleQuantityChange}
                    />
                    <div className="mt-2">
                        <ItemStock
                            stock={
                                cartItem.productDetails.variation.length > 0
                                    ? cartItem.productDetails.variation.filter(
                                          (v) => {
                                              return (
                                                  v._id === cartItem.variation
                                              );
                                          }
                                      )[0].stock
                                    : cartItem.productDetails.stock
                            }
                        />
                    </div>
                </div>
                <div className="col-span-4">
                    <span className="pr-1">₱</span>
                    {formatPrice(
                        (cartItem.productDetails.price !== -1
                            ? cartItem.productDetails.price
                            : cartItem.productDetails.variation[0].price) *
                            cartItem.quantity
                    )}
                </div>
            </div>

            <hr className="col-span-full my-2"></hr>
        </div>
    );
};

export default CartItem;
