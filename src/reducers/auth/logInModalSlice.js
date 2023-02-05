import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const logInModalSlice = createSlice({
    name: 'loginModal',
    initialState,
    reducers: {
        logInModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { logInModalState } = logInModalSlice.actions;
export default logInModalSlice.reducer;