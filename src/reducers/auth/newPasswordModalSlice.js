import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const newPasswordModalSlice = createSlice({
    name: 'newPasswordModal',
    initialState,
    reducers: {
        newPasswordModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { newPasswordModalState } = newPasswordModalSlice.actions;
export default newPasswordModalSlice.reducer;