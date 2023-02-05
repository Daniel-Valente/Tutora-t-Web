import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid_user:'',
    name: '',
    username:'',
    email: '',
    phone:'',
    password: '',
    career: '',
    imagePerfil:'',
    imagePortada:''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfo: ( state, action ) => {
            state = {...action.payload};
        }
    }
});

export const { userInfo } = userSlice.actions;
export default userSlice.reducer;