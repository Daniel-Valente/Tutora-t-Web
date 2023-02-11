import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const chatModalSlice = createSlice({
    name: 'chatModal',
    initialState,
    reducers: {
        chatModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { chatModalState } = chatModalSlice.actions;
export default chatModalSlice.reducer;