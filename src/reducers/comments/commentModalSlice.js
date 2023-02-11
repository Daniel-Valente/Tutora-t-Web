import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const commentModalSlice = createSlice({
    name: 'commentModal',
    initialState,
    reducers: {
        commentModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { commentModalState } = commentModalSlice.actions;
export default commentModalSlice.reducer;