import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    isLoading: false,
    user: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logOut: (state) => {
            state.user = null;
            toast.success("Logged out successfully");
        },
    },
});

export default userSlice.reducer;

export const { setLoading, setUser, logOut } = userSlice.actions;
