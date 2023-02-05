import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const hoveringSlice = createSlice({
    name: 'isHovering',
    initialState,
    reducers: {
        hoveringState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { hoveringState } = hoveringSlice.actions;
export default hoveringSlice.reducer;