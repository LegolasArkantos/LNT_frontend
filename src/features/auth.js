import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {value: {
        role: null,
        accessToken: null,
    }},
    reducers: {
        setAuthValues: (state,action) => {
            state.value = action.payload;
        },
        removeAuthValues: (state) => {
            state.value = state.initialState;
        }
    }
})

export const {setAuthValues, removeAuthValues} = authSlice.actions;

export default authSlice.reducer;