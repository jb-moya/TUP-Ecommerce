import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
    paymentMethod: "",
    shippingMethod: "",
    shippingAddress: {},
    isLoading: false,
};