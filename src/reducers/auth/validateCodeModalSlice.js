import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const validateCodeModalSlice = createSlice({
    name: 'validateCodeModal',
    initialState,
    reducers: {
        validateCodeModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { validateCodeModalState } = validateCodeModalSlice.actions;
export default validateCodeModalSlice.reducer;