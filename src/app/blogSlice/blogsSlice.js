import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
    name: 'blogs',
    initialState: {
        blogs: {
            blogs: [],
            blog: [],
            isFetching: false,
            failed: false,
            blogByBlogListId: [],
            currentBlog: [],
        },
    },
    reducers: {
        getAllBlogStart: (state) => {
            state.blogs.isFetching = true;
        },
        getAllBlogSuccess: (state, action) => {
            state.blogs.isFetching = false;
            state.blogs.blogs = action.payload;
            state.blogs.failed = false;
        },
        getAllBlogFailed: (state) => {
            state.blogs.failed = true
        },
        addBlogSuccess: (state, action) => {
            state.blogs.blog = [action.payload];
        },
        getBlogByBlogListIdStart: (state) => {
            state.blogs.isFetching = true;
        },
        getBlogByBlogListIdSuccess: (state, action) => {
            state.blogs.isFetching = false;
            state.blogs.blogByBlogListId = [action.payload];
            state.blogs.failed = false;
        },
        getBlogByBlogListIdFailed: (state) => {
            state.blogs.failed = true;
        },
        getCurrentBlogSuccess: (state, action) => {
            state.blogs.currentBlog = [action.payload]
        }
        
    }
})

export const {
    getAllBlogStart,
    getAllBlogSuccess,
    getAllBlogFailed,
    addBlogSuccess,
    getBlogByBlogListIdStart,
    getBlogByBlogListIdSuccess,
    getBlogByBlogListIdFailed,
    getCurrentBlogSuccess
} = blogsSlice.actions

export default blogsSlice.reducer