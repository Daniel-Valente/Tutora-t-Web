import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const logInWithEmailSlice = createSlice({
    name: 'loginWithEmail',
    initialState,
    reducers: {
        loginWithEmailState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { loginWithEmailState } = logInWithEmailSlice.actions;
export default logInWithEmailSlice.reducer;