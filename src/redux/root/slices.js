import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    expenses: [],
    pagination: null
};

export const rootSlices = createSlice({
    name: 'root',
    initialState,
    reducers: {
        updateExpenses: (state, action) => {
            state.expenses = [
                ...state.expenses,
                ...action.payload?.expenses
            ]
            state.pagination = {
                ...state.pagination,
                ...action?.payload?.pagination
            }
        }
    },
});

export const RootActions = rootSlices.actions;

export default rootSlices.reducer;
