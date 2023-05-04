import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../services/index";
import { useToast } from "@chakra-ui/react";


export const addSuggest = createAsyncThunk(
    "addSuggest",
    async (args, thunkAPI) => {
        console.log("args addSuggest", args);
        try {
            const res = await API.addSuggest(args);
            return res.data;
        }catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);

export const updateSuggest = createAsyncThunk(
    "updateSuggest",
    async (args, thunkAPI) => {
        console.log("args updateSuggest", args);
        try {
            const res = await API.updateSuggest(args);
            return res.data;
        }catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const deleteSuggest = createAsyncThunk(
    "deleteSuggest",
    async (args, thunkAPI) => {
        console.log("args deleteSuggest", args);
        try {
            const res = await API.deleteSuggest(args);
            return res.data;
        }catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);


export const DetailSuggest = createAsyncThunk(
    "getDetailSuggest",
    async (args, thunkAPI) => {
        console.log("args getDetailSuggest", args);
        try {
            const res = await API.getDetailSuggest(args);
            console.log('res getDetailSuggest: ', res.data[0]);
            return res.data[0];
        }catch (err) {
            return thunkAPI.rejectWithValue(err);
        }
    }
);


const suggestReducer = createSlice({
    name: "suggest",
    initialState: {
        suggest: {},
        triggerSuggest: false,
        loading: false,
        error: null,
    },
    reducers: {
        setTriggerSuggest: (state, action) => {
            state.triggerSuggest = action.payload;
            console.log('state trigger suggest: ', state.triggerSuggest);
        }
    },
    extraReducers: {
        [addSuggest.pending]: (state, action) => {
            state.loading = true;
        },
        [addSuggest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addSuggest.fulfilled]: (state, action) => {
            state.loading = false;
            // state.suggest = action.payload;
            state.triggerSuggest = true;
            console.log('state suggest fullfilled: ', state.suggest);
        },


        [updateSuggest.pending]: (state, action) => {
            state.loading = true;
        },
        [updateSuggest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [updateSuggest.fulfilled]: (state, action) => {
            state.loading = false;
            // state.suggest = action.payload;
            state.triggerSuggest = true;
        },


        [deleteSuggest.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteSuggest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteSuggest.fulfilled]: (state, action) => {
            state.loading = false;
            // state.suggest = action.payload;
            state.triggerSuggest = true;
        },


        [DetailSuggest.pending]: (state, action) => {
            state.loading = true;
        },
        [DetailSuggest.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [DetailSuggest.fulfilled]: (state, action) => {
            state.loading = false;
            state.suggest = action.payload;
            state.triggerSuggest = true;
        },
    }

});

export const { setTriggerSuggest } = suggestReducer.actions;
export default suggestReducer.reducer;