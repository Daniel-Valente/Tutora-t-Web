import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    apiKey: "",
    appName: "",
    createdAt: "",
    displayName: "",
    email: "",
    emailVerified: false,
    isAnonymous: false,
    lastLoginAt: "",
    phoneNumber: "",
    providerData:{},
    stsTokenManager:{},
    uid:""
}

const userLogInSlice = createSlice({
    name: 'userLogIn',
    initialState,
    reducers: {
        userLogInState: (state, action) => {
            state.apiKey = action.payload.apiKey;
            state.appName = action.payload.appName;
            state.createdAt = action.payload.createdAt;
            state.displayName = action.payload.displayName;
            state.email = action.payload.email;
            state.emailVerified = action.payload.emailVerified;
            state.isAnonymous = action.payload.isAnonymous; 
            state.lastLoginAt = action.payload.lastLoginAt; 
            state.phoneNumber = action.payload.phoneNumber; 
            state.providerData = action.payload.providerData;
            state.stsTokenManager = action.payload.stsTokenManager; 
            state.uid = action.payload.uid;
        }
    }
});

export const { userLogInState } = userLogInSlice.actions;
export default userLogInSlice.reducer;