import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import axios from "axios";
axios.defaults.withCredentials = true;
const rootURL = "http://localhost:5000/api/v1";

const initialState = {
    isLogged: false,
    isLoading: false,
    user: null,
    isUpdatePasswordSuccess: false,
    updatePasswordMessage: "",
};

export const logIn = createAsyncThunk("user/logIn", async (credentials, thunkAPI) => {
    try {
        const response = await axios.post(`${rootURL}/auth/login`, credentials);
        const data = await response.data;
        if (response.status === 200) {
            localStorage.setItem("isLoggedIn", "true");
            return data;
        }
        return thunkAPI.rejectWithValue(data.message);
    } catch (error) {
        return thunkAPI.rejectWithValue("An error occurred");
    }
});

export const logOut = createAsyncThunk("user/logOut", async (_, thunkAPI) => {
    try {
        const response = await axios.post(`${rootURL}/auth/logout`);
        
        if (response.status === 200) {
            localStorage.removeItem("isLoggedIn");
            return { user: null };
        }

        return thunkAPI.rejectWithValue("An error occurred when logging out");
    } catch (error) {
        return thunkAPI.rejectWithValue("An error occurred");
    }
});

export const updateUser = createAsyncThunk("user/updateUser", async (data, thunkAPI) => {
    try {
        const response = await axios.put(`${rootURL}/user/updatedUser`, data);
        const resData = await response.data;
        if (response.status === 200) {
            return resData;
        }
        return thunkAPI.rejectWithValue(resData.message);
    } catch (error) {
        return thunkAPI.rejectWithValue("An error occurred");
    }
});

export const updatePassword = createAsyncThunk("user/updatePassword", async (data, thunkAPI) => {
    try {
        console.log("data", data);
        // http://localhost:5000/api/v1
        const response = await axios.patch(
            `${rootURL}/user/updateUserPassword`,
            {
                currentPassword: data.currentPassword,
                newPassword: data.newPassword,
            }
        );
        const resData = await response.data;
        if (response.status === 200) {
            return resData;
        }
        return thunkAPI.rejectWithValue(resData.message);
    } catch (error) {
        return thunkAPI.rejectWithValue("An error occurred");
    }
});

export const selectUserID = (state) => state.user.user._id;

export const isUserLogged = (state) => state.user.isLogged;

export const fetchUser = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await fetch("/api/user");
        const data = await response.json();
        if (response.ok) {
            dispatch(setUser(data.user));
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error("An error occurred");
    }
    dispatch(setLoading(false));
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setLogged: (state, action) => {
            state.isLogged = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        updateUserData: (state, action) => {
            state.user = { ...state.user, ...action.payload };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(logIn.fulfilled, (state, action) => {
            state.isLogged = true;
            state.user = action.payload.user;
            toast.success("Logged in successfully");
        });
        builder.addCase(logIn.rejected, (state, action) => {
            toast.error(action.payload);
        });
        builder.addCase(logOut.fulfilled, (state) => {
            state.isLogged = false;
            state.user = null;
            toast.success("Logged out successfully");
        });
        builder.addCase(logOut.rejected, (state, action) => {
            toast.error(action.payload);
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload.user;
            toast.success("User updated successfully");
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            toast.error(action.payload);
        });
        builder.addCase(updatePassword.fulfilled, (state, action) => {
            state.isUpdatePasswordSuccess = true;
            state.updatePasswordMessage = action.payload;
            console.log("updatePassword.fulfilled", action.payload);
            toast.success(action.payload);
        });
        builder.addCase(updatePassword.rejected, (state, action) => {
            state.isUpdatePasswordSuccess = false;
            state.updatePasswordMessage = action.payload;
            console.log("updatePassword.rejected", action.payload);
            toast.error(action.payload);
        });
    },
});

export default userSlice.reducer;

export const { setLoading, setUser, setLogged } = userSlice.actions;
