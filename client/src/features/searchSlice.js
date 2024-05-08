import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchClicked: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        setSearchClicked: (state, action) => {
            state.searchClicked = action.payload;
        },
    },
});

export default searchSlice.reducer;
export const { setSearchClicked } = searchSlice.actions;