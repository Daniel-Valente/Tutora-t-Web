import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    uid_user:'',
    name: '',
    username:'',
    email: '',
    phone:'',
    password: '',
    career: '',
    imagePortadaName:'',
    imagePortadaUrl:'',
    imgName:'',
    imgUrl:'',
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userInfo: ( state, action ) => {
            state.uid_user = action.payload.uid_user;
            state.name = action.payload.name;
            state.username = action.payload.username;
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.password = action.payload.password;
            state.career = action.payload.career;
            state.imagePortadaName = action.payload.imagePortadaName;
            state.imagePortadaUrl = action.payload.imagePortadaUrl;
            state.imgName = action.payload.imgName;
            state.imgUrl = action.payload.imgUrl;
        }
    }
});

export const { userInfo } = userSlice.actions;
export default userSlice.reducer;