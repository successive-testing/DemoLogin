import * as strings from '../res/strings.js'

export const Validation = {

    emailValidation: (text) => {
        if (text.length == 0) {
            return { isSuccessful: false, message: strings.BlankEmailMessage };
        }
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reg.test(text) === false) {
            return { isSuccessful: false, message: strings.InvalidEmailMessage };
        }
        return {isSuccessful: true};
    },

    passwordValidation: (text) => {
        if (text.length == 0) {
            return { isSuccessful: false, message: strings.BlankPasswordMessage };
        }

        if (text.length < 6) {
            return { isSuccessful: false, message: strings.InvalidPasswordMessage };
        }
        return {isSuccessful: true};
    },

    firstNameValidation: (text) => {
        if (text.length == 0) {
            return { isSuccessful: false, message: strings.BlankFirstNameMessage };
        }
        return {isSuccessful: true};
    }
}