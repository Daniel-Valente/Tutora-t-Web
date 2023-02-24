import {
    chatModalState, commentModalState, editPublicationState, hoveringState,
    logInModalState, loginWithEmailState, notificationModalState,
    publicationState, registerModalState, registerWithEmailState,
    sessionState, userModalState
} from "../reducers";


export const isLoginModal = (dispatch, sessionModal) => {
    dispatch(logInModalState(!sessionModal));
}

export const isLoginWithEmail = (dispatch, loginModal) => {
    dispatch(logInModalState(false));
    dispatch(loginWithEmailState(!loginModal));
}

export const isRegisterModal = (dispatch, registerModal) => {
    dispatch(registerModalState(!registerModal));
}

export const isRegisterWithEmail = (dispatch, registerWithEmailModal) => {
    dispatch(registerModalState(false));
    dispatch(registerWithEmailState(!registerWithEmailModal));
}

export const ValidateData = (target, value) => {
    if (target) {
        switch (target.name) {
            case 'username':
                const regexUsername = new RegExp('^[A-Za-z0-9]{3,16}$');
                return {
                    confirm: regexUsername.test(target.value),
                    errorMessage: `Username should be 3-16 characters and shouldn't include any special character!`
                }
            case 'nombre':
                const regexName = new RegExp('^[A-Za-z]');
                return {
                    confirm: regexName.test(target.value),
                    errorMessage: `Name shouldn't include any special character and number!`
                }
            case 'email':
                const regexEmail = new RegExp(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`);
                return {
                    confirm: regexEmail.test(target.value),
                    errorMessage: `It should be a valid email address!`
                }
            case 'telefono':
                const regexPhone = new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$');
                return {
                    confirm: regexPhone.test(target.value),
                    errorMessage: `Phone number should be 10 number and area code ('+'), shouldn't include any other special character and normal character!`
                }
            case 'password':
                const regexPassword = new RegExp('^[a-zA-Z0-9!@#$%^&*]');
                return {
                    confirm: regexPassword.test(target.value),
                    errorMessage: `Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!`
                }
            case 'confirmPassword':
                return {
                    confirm: value.password === value.confirmPassword,
                    errorMessage: `Passwords don't match!`
                }
            default:
                return {
                    confirm: true,
                    errorMessage: ''
                }
        }
    }
    return {
        confirm: true,
        errorMessage: ''
    }
}

export const fortmatResponse = (res) => JSON.stringify(res, null, 2);


export const isNotificationModal = (dispatch, activeNotifications) => {
    dispatch(chatModalState(false));
    dispatch(notificationModalState(!activeNotifications));
    dispatch(userModalState(false));
}

export const isUserModal = (dispatch, activeUsers) => {
    dispatch(userModalState(!activeUsers));
    dispatch(notificationModalState(false));
    dispatch(chatModalState(false));
}

export const isChatModal = (dispatch, activeMessages) => {
    dispatch(userModalState(false));
    dispatch(notificationModalState(false));
    dispatch(chatModalState(!activeMessages));
}

export const isCommentModal = (dispatch, activeComments) => {
    dispatch(commentModalState(!activeComments));
}

export const isPublicationModal = (dispatch, activePublications) => {
    !activePublications && window.scrollTo(0, 0);
    document.body.overflow = 'hidden';
    dispatch(publicationState(!activePublications));
}

export const isEditPublicationModal = (dispatch, activePublications) => {
    !activePublications && window.scrollTo(0, 0);
    document.body.overflow = 'hidden';
    dispatch(editPublicationState(!activePublications));
}

export const isLogIn = (dispatch) => {
    loginWithEmailState(dispatch, true);
    registerWithEmailState(dispatch, true);
    dispatch(sessionState(true));
    window.location.href = "/home";
}

export const isOut = (dispatch) => {
    userModalState(dispatch, true);
    dispatch(sessionState(false));
    window.location.href = "/";
}

export const handleMouseEnter = (dispatch) => {
    dispatch(hoveringState(true));
}