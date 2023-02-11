import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const publicationModalSlice = createSlice({
    name: 'publicationModal',
    initialState,
    reducers: {
        publicationState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { publicationState } = publicationModalSlice.actions;
export default publicationModalSlice.reducer;