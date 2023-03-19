import {FormattedMessage} from 'react-intl';
import React from "react";
import messages from "../locales/messages";

const Validator = {
    validateEmail: (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    },
    validatePositiveNumber: (number) => {
        const re = /^[1-9]\d*$/;
        return re.test(number);
    },
    validateRequired: (value) => {
        const re = value !== null && value !== undefined && value !== '';
        return re;
    },
    getErrorMessage: (validator) => {
        switch (validator) {
            case Validator.validateEmail:
                return "validator_email_error";
            case Validator.validatePositiveNumber:
                return "validator_positiveNum_error";
            case Validator.validateRequired:
                return "validator_required_error";
            default:
                return "validator_default_error";
        }
    },
};


function validator({value, errorCallback, validatorFunc, errorMessage}) {
    const isValid = validatorFunc(value);
    const errorMsg = setDefaultErrorMessage({errorMessage, validatorFunc});
    const error = isValid ? null : errorMsg;
    if (typeof errorCallback === 'function') {
        errorCallback(error);
    } else {
        if (!isValid) {
            console.error("Error Call Back is not a Function, error : " + errorMsg);
        }
    }
    return isValid;
}

function setDefaultValidatorFunc({validatorFunc, defaultValidatorFunc}) {
    if (typeof validatorFunc !== 'function') {
        validatorFunc = defaultValidatorFunc;
    }
    return validatorFunc;
}

function setDefaultErrorMessage({errorMessage, validatorFunc}) {
    if (typeof errorMessage === "string") {
        const storedLanguage = window.localStorage.getItem("selectedLanguage") ? window.localStorage.getItem("selectedLanguage") : "en";
        if (messages[storedLanguage][errorMessage]) {
            errorMessage = Validator.getErrorMessage(validatorFunc);
            errorMessage = <FormattedMessage id={errorMessage} defaultMessage={errorMessage}/>;
        }
    } else {
        errorMessage = <FormattedMessage id='validator_default_error'/>;
    }
    return errorMessage;
}

Validator.email = (email, errorCallback, validatorFunc = Validator.validateEmail, errorMessage = Validator.getErrorMessage(validatorFunc)) => {
    validatorFunc = setDefaultValidatorFunc({validatorFunc, defaultValidatorFunc: Validator.validateEmail});
    return validator({value: email, errorCallback, validatorFunc, errorMessage});
};

Validator.positiveNumber = (number, errorCallback, validatorFunc = Validator.validatePositiveNumber, errorMessage = Validator.getErrorMessage(validatorFunc)) => {
    validatorFunc = setDefaultValidatorFunc({validatorFunc, defaultValidatorFunc: Validator.validatePositiveNumber});
    return validator({value: number, errorCallback, validatorFunc, errorMessage});
};

Validator.required = (value, errorCallback, validatorFunc = Validator.validateRequired, errorMessage = Validator.getErrorMessage(validatorFunc)) => {
    validatorFunc = setDefaultValidatorFunc({validatorFunc, defaultValidatorFunc: Validator.validateRequired});
    return validator({value, errorCallback, validatorFunc, errorMessage});
};
export default Validator;
