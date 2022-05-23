import { createSlice } from "@reduxjs/toolkit";


const blogSlice = createSlice( {
    name: 'blog',
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
            state.blog.blog = [action.payload]
        },
        getAllBlogFailed: (state) => {
            state.blog.isFetching = false
            state.blog.failed = true
        }

    }
});

export const {
    getALlBlogStart,
    getAllBlogSuccess,
    getAllBlogFailed,
} = blogSlice.actions;

export default blogSlice.reducer;