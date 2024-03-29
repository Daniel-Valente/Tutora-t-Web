import {
    chatModalState, commentModalState, editPublicationState, hoveringState,
    logInModalState, loginWithEmailState, newPasswordModalState, notificationModalState,
    publicationState, registerModalState, registerWithEmailState,
    resetPasswordModalState,
    searchModalState,
    sessionState, userModalState, validateCodeModalState
} from "../reducers";


export const isLoginModal = (dispatch, sessionModal) => {
    dispatch(logInModalState(!sessionModal));
}

export const isLoginWithEmail = (dispatch, loginModal) => {
    dispatch(logInModalState(false));
    dispatch(loginWithEmailState(!loginModal));
}

export const isResetPassword = (dispatch, resetModal) => {
    dispatch(loginWithEmailState(false));
    dispatch(resetPasswordModalState(!resetModal));
}

export const isValidateCode = (dispatch, codeModal) => {
    dispatch(loginWithEmailState(false));
    dispatch(validateCodeModalState(!codeModal));
}

export const isNewPassword = (dispatch, passwordModal) => {
    dispatch(loginWithEmailState(false));
    dispatch(newPasswordModalState(!passwordModal));
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
                    errorMessage: `El nombre de usuario debe de ser de 3-16 caracteres  y no debe de contener ningun caracter especial!`
                }
            case 'nombre':
                const regexName = new RegExp('^[A-Za-z]');
                return {
                    confirm: regexName.test(target.value),
                    errorMessage: `El nombre no debe de incluir ningun caracter especial o numero!`
                }
            case 'email':
                const regexEmail = new RegExp(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`);
                return {
                    confirm: regexEmail.test(target.value),
                    errorMessage: `Debe de ser un email valido!`
                }
            case 'telefono':
                const regexPhone = new RegExp('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$');
                return {
                    confirm: regexPhone.test(target.value),
                    errorMessage: `El numero de celular debe de ser de 10 numeros y el codigo de area ('+'), no debe de incluir ningun otro caracter especial!`
                }
            case 'password':
                const regexPassword = new RegExp('^[a-zA-Z0-9!@#$%^&*]');
                return {
                    confirm: regexPassword.test(target.value),
                    errorMessage: `La contraseña debe de contener 8-20 caracteres e incluir al menos 1 letra, 1 numero y 1 caracter especial!`
                }
            case 'confirmPassword':
                return {
                    confirm: value.password === value.confirmPassword,
                    errorMessage: `Las contraseñas no coinciden!`
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

export const isSearchModal = (dispatch, activeSearch) => {
    dispatch(searchModalState(!activeSearch));
}

export const isLogIn = (dispatch) => {
    loginWithEmailState(dispatch, true);
    registerWithEmailState(dispatch, true);
    dispatch(sessionState(true));
    window.location.href = "/home";
}

export const isOut = (dispatch) => {
    userModalState(dispatch, false);
    dispatch(sessionState(false));
    window.location.href = "/";
}

export const handleMouseEnter = (dispatch) => {
    dispatch(hoveringState(true));
}

export const tree = (career, likes, posts, followed, comments, saves, courses, inscriptions) => {
    let allData = [{ total: 1, career }, ...likes, ...posts, ...followed, ...comments, ...saves, ...courses, ...inscriptions];

    return getReference(allData);
}

const getReference = (data) => {
    let newData = [];
    let validation = [];
    let size = 0;

    data.forEach((value, index, arr) => {
        if (size === data.length) arr.length = index;

        if (!validation.includes(value.career)) {
            const filterData = data.filter(data => data.career === value.career);

            newData.push({ career: value.career, total: filterData.reduce((previous, current) => previous + current.total, 0) });

            size += data.filter(data => data.career === value.career).length;
            validation.push(value.career);
        }
    });

    return { ...newData.reduce((previous, current) => previous.total > current.total ? previous : current) };
}

export const filterContent = (data, reference) => {
    if (!data) return [];

    return [...data.filter(data => data.career === reference.career), ...data.filter(data => data.career !== reference.career)];
}

export const timeSince = (date) => {
    let seconds = Math.floor((new Date() - date) / 1000);
    let intervalo = seconds / 31536000;
    
    if(intervalo > 1)
        return Math.floor(intervalo) + ' años';

    intervalo = seconds / 2592000;

    if ( intervalo > 1 ) 
        return Math.floor(intervalo) + ' meses';
    
    intervalo = seconds / 86400;

    if(intervalo > 1)
        return Math.floor(intervalo) + ' dias';

    intervalo = seconds / 3600;

    if(intervalo > 1)
        return Math.floor(intervalo) + ' horas';
    
        intervalo = seconds / 60;
    
    if(intervalo > 1)
        return Math.floor(intervalo) + ' minutos';

    return Math.floor(seconds) + ' segundos';
}
