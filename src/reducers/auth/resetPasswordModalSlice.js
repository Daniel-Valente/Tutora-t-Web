import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const resetPasswordModalSlice = createSlice({
    name: 'resetPasswordModal',
    initialState,
    reducers: {
        resetPasswordModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { resetPasswordModalState } = resetPasswordModalSlice.actions;
export default resetPasswordModalSlice.reducer;