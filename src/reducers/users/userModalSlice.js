import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
}

const userModalSlice = createSlice({
    name: 'userModal',
    initialState,
    reducers: {
        userModalState: ( state, action ) => {
            state.value = action.payload;
        }
    }
});

export const { userModalState } = userModalSlice.actions;
export default userModalSlice.reducer;