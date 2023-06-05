import { createSlice } from "@reduxjs/toolkit";

const paginationSlice = createSlice({
    name: 'pagination',
    initialState: {
        currentPage: 1,
        totalCount: 100000000,
    },
    reducers: {
        setTotal: (state, action) => {
            state.totalCount = action.payload
        },

        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
    }
})

export const {setTotal, setCurrentPage } = paginationSlice.actions;
export default paginationSlice.reducer;
