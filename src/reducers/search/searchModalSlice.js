import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const searchModalSlice = createSlice({
    name: 'searchModal',
    initialState,
    reducers: {
        searchModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { searchModalState } = searchModalSlice.actions;
export default searchModalSlice.reducer;