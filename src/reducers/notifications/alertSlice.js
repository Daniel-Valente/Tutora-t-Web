import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isOpen: false,
    message: '',
    type: 'info'
}

const alertSlice = createSlice({
    name: 'alert',
    initialState,
    reducers: {
        alertState: ( state, action ) => {
            state.isOpen = action.payload.isOpen;
            state.message = action.payload.message;
            state.type = action.payload.type;
        }
    }
});

export const { alertState } = alertSlice.actions;
export default alertSlice.reducer;