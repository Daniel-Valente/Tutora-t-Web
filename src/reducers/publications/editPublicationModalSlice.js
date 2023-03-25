import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const editPublicationModalSlice = createSlice({
    name: 'editPublicationModal',
    initialState,
    reducers: {
        editPublicationState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { editPublicationState } = editPublicationModalSlice.actions;
export default editPublicationModalSlice.reducer;