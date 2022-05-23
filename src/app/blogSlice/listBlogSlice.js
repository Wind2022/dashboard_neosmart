import { createSlice } from "@reduxjs/toolkit";

const listBlogSlice = createSlice({
    name: 'listBlog',
    initialState: {
        listBlog: {
            listBlog: [],
            isFetching: false,
            failed: false
        }
    },
    reducers: {
        getListBlogStart: (state) => {
            state.listBlog.isFetching = true;
        },
        getListBlogSuccess: (state, action) => {
            state.listBlog.isFetching = false;
            state.listBlog.listBlog = action.payload;
            state.listBlog.failed = false;
        },
        getListBlogFailed: (state) => {
            state.listBlog.failed = true;
        }
    }
})
export const {
    getListBlogStart,
    getListBlogSuccess,
    getListBlogFailed
} = listBlogSlice.actions;

export default listBlogSlice.reducer;