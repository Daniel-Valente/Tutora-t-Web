import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const registerWithEmailSlice = createSlice({
    name: 'registerWithEmail',
    initialState,
    reducers: {
        registerWithEmailState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { registerWithEmailState } = registerWithEmailSlice.actions;
export default registerWithEmailSlice.reducer;