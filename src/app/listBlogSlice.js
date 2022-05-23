import { createSlice } from "@reduxjs/toolkit";


const listBlogSlice = createSlice( {
    name: 'listBlog',
    initialState: {
        listBLog: {
            listBLog: [],
            isFetching: false,
            failed: false,
        }
    },
    reducers: {
        getALlListBlogStart: (state) => {
            state.listBlog.isFetching = true
        },
        getAllListBLogSuccess: (state, action) => {
            state.listBlog.isFetching = true;
            state.listBlog.failed = true;
            state.listBlog.listBlog = [action.payload]
        },
        getAllBlogFailed: (state) => {
            state.listBlog.isFetching = false
            state.listBlog.failed = true
        }

    }
});

export const {
    getALlListBlogStart,
    getAllListBlogSuccess,
    getAllListBlogFailed,
} = listBlogSlice.actions;

export default listBlogSlice.reducer;