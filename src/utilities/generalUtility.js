import { message } from 'antd';
import K from './constants'
import Cookies from 'js-cookie'

export const handleError = (error, dispatch = null) => {
    console.error(error);
    message.error(error.message);
    return null;
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

export const isRolePresent = (roles, userRoles) => {
    let hasRole = true;
    if (roles && roles.length > 0) {
        let roleFound = false;
        for (const routeRole of roles ?? []) {
            if (userRoles.includes(routeRole)) {
                roleFound = true;
                break;
            }
        }
        hasRole = roleFound;
    }
    return hasRole;
}

export const redirectToLogin = () => {
    if(typeof window !== 'undefined')
        window.location = window.location.protocol + '//' + K.Network.URL.Client.BaseHost + ':' + K.Network.URL.Client.BasePort + '/authentication/login';
}

export const redirectIfInvalidTenant = () => {
    const cookieDomainPrefix = Cookies.get(K.Cookie.Key.Tenant);
    const hostArray = window.location.hostname.split('.');
    const urlDomainPrefix = (hostArray.length>0)?hostArray[0]:'';
    const path = window.location.pathname;
    if(!cookieDomainPrefix && (urlDomainPrefix==='wwww'||urlDomainPrefix==='localhost'))
        return false
    if(cookieDomainPrefix !== urlDomainPrefix){
        window.location = window.location.protocol + '//' + ((cookieDomainPrefix) ? (cookieDomainPrefix + '.') : '')+ K.Network.URL.Client.BaseHost + ':' + K.Network.URL.Client.BasePort + path;
    }
}