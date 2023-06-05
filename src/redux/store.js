import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { searchApi } from "./searchApi";
import paginationReducer from "./paginationSlice";


const rootReducer = combineReducers({
    [searchApi.reducerPath]: searchApi.reducer,
    pagination: paginationReducer,
})


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(searchApi.middleware)
})