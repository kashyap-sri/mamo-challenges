import { createSlice } from '@reduxjs/toolkit';

const initialState = {
};

export const rootSlices = createSlice({
    name: 'root',
    initialState,
    reducers: {
    },
});

export const RootActions = rootSlices.actions;

export default rootSlices.reducer;
