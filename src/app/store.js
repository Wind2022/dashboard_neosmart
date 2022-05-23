import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";
import productsReducer from "./productSlice/productsSlice";
import categoryReducer from "./productSlice/categorySlice";
import listBlogReducer from "./blogSlice/listBlogSlice";
import blogsReducer from "./blogSlice/blogsSlice";
import menuReducer from "./menuSlice/menuSlice";
import messageReducer from "./messageSlice/messageSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    version: 1,
    storage,
};
const rootReducer = combineReducers({
    auth: authReducer,
    users: userReducer,
    products: productsReducer,
    category: categoryReducer,
    blogs: blogsReducer,
    listBlog: listBlogReducer,
    menu: menuReducer,
    message: messageReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});
export let persistor = persistStore(store);
