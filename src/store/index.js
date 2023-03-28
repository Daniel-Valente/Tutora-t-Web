import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import isLoginReducer from '../reducers/auth/isLogInSlice';
import logInModalReducer from '../reducers/auth/logInModalSlice';
import logInWithEmailReducer from '../reducers/auth/loginWithEmailSlice';
import registerModalReducer from '../reducers/auth/registerModalSlice';
import registerWithEmailReducer from '../reducers/auth/registerWithEmailSlice';
import isHoveringReducer from '../reducers/hover/isHoveringSlice';
import commentModalReducer from '../reducers/comments/commentModalSlice';
import chatModalReducer from '../reducers/chats/chatModalSlice';
import notificationModalReducer from '../reducers/notifications/notificationModalSlice';
import alertReducer from '../reducers/notifications/alertSlice';
import publicationModalReducer from '../reducers/publications/publicationModalSlice';
import editPublicationModalReducer from '../reducers/publications/editPublicationModalSlice';
import userModalReducer from '../reducers/users/userModalSlice';
import userReducer from '../reducers/users/userSlice';
import searchModalReducer from '../reducers/search/searchModalSlice';
import resetPasswordModalReducer from '../reducers/auth/resetPasswordModalSlice';
import validateCodeModalReducer from '../reducers/auth/validateCodeModalSlice';
import newPasswordModalReducer from '../reducers/auth/newPasswordModalSlice';
import isRegisterReducer from '../reducers/auth/isRegisterSlice';

const reducers = combineReducers({
    sessionActive: isLoginReducer,
    loginModal: logInModalReducer,
    loginWitnEmail: logInWithEmailReducer,
    registerModal: registerModalReducer,
    registerWithEmail: registerWithEmailReducer,
    isHovering: isHoveringReducer,
    chatModal: chatModalReducer,
    notificationModal: notificationModalReducer,
    alert: alertReducer,
    publicationModal: publicationModalReducer,
    editPublicationModal: editPublicationModalReducer,
    userModal: userModalReducer,
    user: userReducer,
    commentModal: commentModalReducer,
    searchModal: searchModalReducer,
    resetPasswordModal: resetPasswordModalReducer,
    validateCodeModal: validateCodeModalReducer,
    newPasswordModal: newPasswordModalReducer,
    isRegister: isRegisterReducer,
});

const persistConfig = {
    key: 'redux',
    storage,
    whilelist: ['sessionActive', 'isHovering', 'user', 'isRegister'],
    blacklist: [
        'loginModal', 'loginWitnEmail', 'registerModal',
        'registerWithEmail', 'commentModal', 'chatModal',
        'notificationModal', 'alert', 'publicationModal',
        'userModal', 'editPublicationModal, searchModal',
        'resetPasswordModal', 'validateCodeModal', 'newPasswordModal']
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});