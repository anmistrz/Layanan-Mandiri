import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../services/index";



export const listMyfines = createAsyncThunk(
    "listMyfines",
    async (args, thunkAPI) => {
        console.log("args listMyfines", args);
        try {
            const res = await API.listMyFines(args);
            // console.log('res listMyfines: ', res);
            return res.data;
        }catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)

export const totalMyFines = createAsyncThunk(
    "totalMyFines",
    async(args, thunkAPI) => {
        console.log("args totalMyFines", args);
        try {
            const res = await API.totalMyFines(args);
            // console.log('res totalMyFines: ', res);
            return res.data;
        }catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
)


const finesReducer = createSlice({
    name: "fines",
    initialState: {
        listMyFines: [],
        totalMyFines: 0,
        loading: false,
        error: null,
    },
    extraReducers: {
        [listMyfines.pending]: (state, action) => {
            state.loading = true;
        },
        [listMyfines.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [listMyfines.fulfilled]: (state, action) => {
            state.loading = false;
            state.listMyFines = action.payload;
            // console.log('state listMyFines: ', state.listMyFines);
        }
    },
})


export default finesReducer.reducer;