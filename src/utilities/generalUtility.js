import { message } from 'antd';
import K from './constants'

export const handleError = (error, dispatch = null) => {
    console.error(error);
    message.error(error.message);
    return null;
}

export const isGuestPage = (path) => {
    for(let guestPage of K.GuestPages) {
        if (guestPage === path) {
            return true;
        }
    }
    return false;
}

export const toCamelCaseToSentence = (string) => {
    return string.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
}

export const snakeCaseToSentence = (string) => {
    return string?.split('_')?.map(s => s.charAt(0).toUpperCase() + s.slice(1))?.join(' ');
}

export const hasOnlyDigits = (string) => {
    return /^-{0,1}\d+$/.test(string);
}

export const getColor = (value) => {
    //value from 0 to 1
    var hue=((1-value)*120).toString(10);
    return ["hsl(",hue,",65%,70%)"].join("");
}

export const isNumberRegex = () => {
    return new RegExp("^[0-9]*$");
}

export const isDecimalRegex = () => {
    return new RegExp("^\\d+\\.?\\d*$");
}