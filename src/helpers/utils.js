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
                const regexEmail = new RegExp(`^[a-z0-9]+@[a-z]+\\.[a-z]{2,3}`);
                return {
                    confirm: regexEmail.test(target.value),
                    errorMessage: `It should be a valid email address!`
                }
            case 'telefono':
                const regexPhone = new RegExp('^[0-9]{10}$');
                return {
                    confirm: regexPhone.test(target.value),
                    errorMessage: regexPhone.test(target.value) ? 'hola' : `Phone number should be 10 number and shouldn't include any special character and normal character!`
                }
            case 'password':
                const regexPassword = new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,20}$');
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
