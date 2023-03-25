import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const registerModalSlice = createSlice({
    name: 'registerModal',
    initialState,
    reducers: {
        registerModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { registerModalState } = registerModalSlice.actions;
export default registerModalSlice.reducer;