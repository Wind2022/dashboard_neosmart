import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "users",
    initialState: {
        users: {
            allUsers: null,
            isFetching: false,
            error: false,
        },
        msg: "",
    },
    reducers: {
        getAllUserStart: (state) => {
            state.users.isFetching = true;
        },
        getAllUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.users.allUsers = action.payload;
            state.users.error = false;
        },
        getAllUserFailed: (state) => {
            state.users.isFetching = false;
            state.users.error = true;
        },
        deleteUserStart: (state) => {
            state.users.isFetching = true;
        },
        deleteUserSuccess: (state, action) => {
            state.users.isFetching = false;
            state.msg = action.payload;
        },
        deleteUserFailed: (state, action) => {
            state.users.isFetching = false;
            state.users.error = true;
            state.msg = action.payload;
        },
    },
});
export const {
    getAllUserFailed,
    getAllUserSuccess,
    getAllUserStart,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed,
} = userSlice.actions;
export default userSlice.reducer;
