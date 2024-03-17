import { createSlice } from "@reduxjs/toolkit";

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

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.cart.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(
                (item) => item.id !== action.payload.id
            );
        },
        clearCart: (state) => {
            state.cartItems = [];
            console.log("clear cart");
        },
        removeItem: (state, action) => {
            const id = action.payload;
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
    },
});

console.log(cartSlice);
export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
