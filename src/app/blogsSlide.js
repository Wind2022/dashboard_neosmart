import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice( {
    name: 'blogs',
    initialState: {
        blog: {
            blog: [],
            isFetching: false,
            failed: false,
        }
    },
    reducers: {
        getALlBlogStart: (state) => {
            state.blog.isFetching = true
        },
        getAllBlogSuccess: (state, action) => {
            state.blog.isFetching = true;
            state.blog.failed = true;
            state.blog.blog = action.payload
        },
        getAllBLogFailed: (state) => {
            state.blog.isFetching = false
            state.blog.failed = true
        }

    }
});

export const {
    getALlBlogStart,
    getAllBlogSuccess,
    getAllBlogFailed,
} = blogsSlice.actions;

export default blogsSlice.reducer;