import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const isRegisterSlice = createSlice({
    name: 'isRegister',
    initialState,
    reducers: {
        isRegisterState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { isRegisterState } = isRegisterSlice.actions;
export default isRegisterSlice.reducer;