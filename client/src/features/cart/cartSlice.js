import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    cartItems: [],
    amount: 4,
    total: 0,
    productCount: 0,
    isLoading: true,
};

const getCart = async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const cartExists = await axios.get(`http://localhost:5000/api/v1/cart`);
        if (cartExists.data.cart) {
            return cartExists.data.cart;
        }

        return null;
    } catch (error) {
        console.error(error);
        return rejectWithValue("Error fetching cart");
    }
};

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",
    async (_, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const cart = await getCart(null, thunkAPI);

            if (!cart) {
                return rejectWithValue("No cart found");
            }

            const response = await axios.delete(
                `http://localhost:5000/api/v1/cart/${cart[0]._id}`
            );

            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
);

export const deleteItemFromDB = createAsyncThunk(
    "cart/deleteItemFromDB",
    async (itemId, thunkAPI) => {
        const cart = await getCart(null, thunkAPI);
        try {
            const response = await axios.delete(
                `http://localhost:5000/api/v1/cart/deleteItem/${cart[0]._id}/${itemId}`
            );

            // console.log("response >:(", response.data);
            return response.data.cart.orderItems;
        } catch (error) {
            console.error(error);
        }
    }
);

export const getAllItems = createAsyncThunk(
    "cart/getAllItems",
    async (_, thunkAPI) => {
        const { getState } = thunkAPI;
        try {
            const cart = await getCart(null, thunkAPI);
            // console.log("cart gotten", cart);
            if (cart.length === 0) {
                return [];
            } else {
                return cart[0].orderItems;
            }
        } catch (error) {
            console.error(error);
        }
    }
);

export const addToCart = createAsyncThunk(
    "cart/addToCart",
    async (item, thunkAPI) => {
        const { rejectWithValue } = thunkAPI;
        try {
            const cart = await getCart(null, thunkAPI);

            if (!cart) {
                return rejectWithValue("no cart or it's length is 0");
            }

            const response = await axios.post(
                "http://localhost:5000/api/v1/cart/add",
                { ...item, cartID: cart.length !== 0 ? cart[0]._id : null }
            );

            const updatedCart = await getCart(null, thunkAPI);

            if (updatedCart) {
                return updatedCart[0].orderItems;
            }

            return rejectWithValue(response.data.message);
        } catch (error) {
            console.error(error);
        }
    }
);

export const getStateCart = (state) => state.cartItems;

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
            state.productCount = 0;
            toast.success("Cart cleared");
        },
        clearCheckedItems: (state) => {
            state.cartItems = state.cartItems.filter((item) => !item.checked);
            state.productCount = state.cartItems.length;
        },
        toggleCheck: (state, action) => {
            const { id } = action.payload;
            const cartItem = state.cartItems.find((item) => item._id === id);

            if (cartItem) {
                cartItem.checked = !cartItem.checked;
            }
        },
        removeItem: (state, action) => {
            const { id } = action.payload;
            state.cartItems = state.cartItems.filter((item) => item._id !== id);
            state.productCount = state.cartItems.length;
            toast.success("Item removed from cart");
        },
        removeAllItems: (state) => {
            state.cartItems = [];
        },
        setQuantity: (state, { payload }) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === payload.id
            );

            if (cartItem) {
                cartItem.quantity = payload.quantity;
            }
        },
        checkAll: (state) => {
            state.cartItems.forEach((item) => {
                item.checked = true;
            });
        },
        deselectAll: (state) => {
            state.cartItems.forEach((item) => {
                item.checked = false;
            });
        },
        increaseQuantity: (state, { payload }) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === payload.id
            );

            if (cartItem) {
                cartItem.quantity++;
            }
        },
        decreaseQuantity: (state, { payload }) => {
            const cartItem = state.cartItems.find(
                (item) => item._id === payload.id
            );

            if (cartItem) {
                cartItem.quantity--;
            }
        },
        calculateTotals: (state) => {
            let { total, amount } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    if (cartItem.checked) {
                        const price = cartItem.productDetails.price;
                        const quantity = cartItem.quantity;

                        let variationPrice = null;
                        if (price === -1) {
                            variationPrice =
                                cartItem.productDetails.variation[0].price;
                        }

                        const itemTotal =
                            (price !== -1 ? price : variationPrice) * quantity;

                        cartTotal.total += itemTotal;
                        cartTotal.amount += quantity;
                    }

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
    extraReducers: (builder) => {
        builder.addCase(getAllItems.fulfilled, (state, action) => {
            const updatedItems = action.payload.map((item) => ({
                ...item,
                checked: true,
            }));
            state.productCount = updatedItems.length;
            state.cartItems = updatedItems;
        });
        builder.addCase(getAllItems.rejected, (state, action) => {
            toast.error("Error fetching cart items");
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.productCount = action.payload.length;
            toast.success("Item added to cart");
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            toast.error("Error adding item to cart");
        });
        builder.addCase(deleteItemFromDB.fulfilled, (state, action) => {
            state.cartItems = action.payload;
            state.productCount = action.payload.length;
            toast.success("Item removed from cart");
        });
        builder.addCase(deleteItemFromDB.rejected, (state, action) => {
            toast.error("Error removing item from cart");
        });
        builder.addCase(deleteCart.fulfilled, (state) => {
            state.cartItems = [];
            state.productCount = 0;
            toast.success("Cart deleted");
        });
        builder.addCase(deleteCart.rejected, (state) => {
            toast.error("Error deleting cart");
        });
    },
});

export default cartSlice.reducer;

export const {
    clearCart,
    toggleCheck,
    checkAll,
    removeItem,
    clearCheckedItems,
    setQuantity,
    deselectAll,
    removeAllItems,
    increaseQuantity,
    decreaseQuantity,
    calculateTotals,
} = cartSlice.actions;
