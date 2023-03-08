import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name:'user',
    initialState:{
        value: {},
    },
    reducers:{
        connectUser: (state, action) => {
            state.value = action.payload;
        },
        disconnectUser: (state) => {
            state.value = {};
        },
    }
})

export const { connectUser, disconnectUser} = userSlice.actions

export default userSlice.reducer;