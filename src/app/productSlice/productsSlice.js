import { createSlice } from "@reduxjs/toolkit";


const productsSlice = createSlice( {
    name: 'products',
    initialState: {
        product: {
            products: [],
            isFetching: false,
            failed: false,
            productById: null,
            productByCateId: [],
            product: [],
        }
    },
    reducers: {
        getAllProductStart: (state) => {
            state.product.isFetching = true
        },
        getAllProductSuccess: (state, action) => {
            state.product.isFetching = true;
            state.product.failed = true;
            state.product.products = action.payload
        },
        getAllProductFailed: (state) => {
            state.product.isFetching = false
            state.product.failed = true
        },
        getProductByIdSuccess: (state, action) => {
            state.product.productById = [action.payload]
        },
        getProductByCategorySuccess: (state, action) => {
            state.product.productByCateId = [action.payload];
        },
        getProductStart: (state) => {
            state.product.isFetching = true
        },
        getProductSuccess: (state, action) => {
            state.product.isFetching = false;
            state.product.failed = false;
            state.product.product = [action.payload]
        },
        getProductFailed: (state) => {
            state.product.isFetching = false
            state.product.failed = true
        } 

    }
});

export const {
    getAllProductStart,
    getAllProductSuccess,
    getAllProductFailed,
    getProductByIdSuccess,
    getProductByCategorySuccess,
    getProductStart,
    getProductSuccess,
    getProductFailed
} = productsSlice.actions;

export default productsSlice.reducer;