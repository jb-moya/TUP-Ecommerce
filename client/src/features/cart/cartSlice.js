import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axious from "axios";
// example data
const cartItems = [
    {
        name: "laptop",
        sub_name: "adjbul babi",
        id: 1,
        price: 599.99,
        quantity: 1,
    },
    {
        name: "laptop",
        sub_name: "adjbul babi",
        id: 2,
        price: 299.99,
        quantity: 3,
    },
    {
        name: "laptop",
        sub_name: "adjbul babi",
        id: 3,
        price: 399.99,
        quantity: 2,
    },
    {
        name: "laptop",
        sub_name: "adjbul babi",
        id: 4,
        price: 499.99,
        quantity: 1,
    },
];

const initialState = {
    cartItems: cartItems,
    amount: 4,
    total: 0,
    isLoading: true,
};


export const getAllItems = createAsyncThunk("cart/getAllItems", async () => {
    const response = await axious.get("localhost:5000/api/v1/temp");
    console.log("response", response);
    // return response.data;
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        clearCart: (state) => {
            state.cartItems = [];
            console.log("clear cart");
        },
        removeItem: (state, action) => {
            const { id } = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== id);
        },
        increaseQuantity: (state, { payload }) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === payload.id
            );

            if (cartItem) {
                cartItem.quantity++;
            }
        },
        decreaseQuantity: (state, { payload }) => {
            const cartItem = state.cartItems.find(
                (item) => item.id === payload.id
            );

            if (cartItem) {
                cartItem.quantity--;
            }
        },
        calculateTotals: (state) => {
            let { total, amount } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;

                    cartTotal.total += itemTotal;
                    cartTotal.amount += quantity;

                    return cartTotal;
                },
                {
                    total: 0,
                    amount: 0,
                }
            );

            total = parseFloat(total.toFixed(2));

            state.total = total;
            state.amount = amount;
        },
    },
});

console.log(cartSlice);
export default cartSlice.reducer;

export const {
    addToCart,
    clearCart,
    removeItem,
    increaseQuantity,
    decreaseQuantity,
    calculateTotals,
} = cartSlice.actions;
