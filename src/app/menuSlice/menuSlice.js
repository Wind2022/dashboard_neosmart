import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
    name: "menu",
    initialState: {
        menu: {
            listMenu: [],
            isFetching: false,
            failed: false,
        },
    },
    reducers: {
        getMenuStart: (state) => {
            state.menu.isFetching = true;
        },
        getMenuSuccess: (state, action) => {
            state.menu.isFetching = false;
            state.menu.listMenu = action.payload;
            state.menu.failed = false;
        },
        getMenuFailed: (state) => {
            state.menu.isFetching = false;
            state.menu.failed = true;
        },
    },
});
export const { getMenuStart, getMenuSuccess, getMenuFailed } =
    menuSlice.actions;

export default menuSlice.reducer;
