import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const notificationModalSlice = createSlice({
    name: 'notificationModal',
    initialState,
    reducers: {
        notificationModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { notificationModalState } = notificationModalSlice.actions;
export default notificationModalSlice.reducer;