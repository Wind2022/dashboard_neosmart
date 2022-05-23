import { createSlice } from "@reduxjs/toolkit";


const categorySlice = createSlice( {
    name: 'product',
    initialState: {
        category: {
            category: [],
            currentCategory: [],
            isFetching: false,
            failed: false,
        }
    },
    reducers: {
        getCategoryStart: (state) => {
            state.category.isFetching = true
        },
        getCategorySuccess: (state, action) => {
            state.category.isFetching = true;
            state.category.failed = true;
            state.category.category = [action.payload]
        },
        getCategoryFailed: (state) => {
            state.category.isFetching = false
            state.category.failed = true
        },
        getCategoryCurrentSuccess: (state, action) => {
            state.category.currentCategory = [action.payload]
        }

    }
});

export const {
    getCategoryStart,
    getCategorySuccess,
    getCategoryFailed,
    getCategoryCurrentSuccess
} = categorySlice.actions;

export default categorySlice.reducer;