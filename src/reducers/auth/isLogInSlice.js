import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    active: false,
}

const isLoginSlice = createSlice({
    name: 'isLogIn',
    initialState,
    reducers: {
        sessionState: ( state, action ) => {
            state.active = action.payload;
        }
    }
});

export const { sessionState } = isLoginSlice.actions;
export default isLoginSlice.reducer;