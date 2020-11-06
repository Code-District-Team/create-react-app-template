import { attr } from 'redux-orm';
import BaseModel from '../baseModel/baseModel';
import NetworkCall from '../../network/networkCall';
import Request from '../../network/request';
import baseReducer from '../baseModel/baseReducer';
import { upsertModel } from '../baseModel/baseActions';
import K from '../../utilities/constants';
import Cookies from 'js-cookie'
import { redirectToLogin } from '../../utilities/generalUtility'


export default class User extends BaseModel {

    // API call using thunk.
    static loginCall(email, password, remember) {
        return async (dispatch) => {
            const user = await NetworkCall.fetch(Request.loginUser(email, password));
            
            Cookies.set(K.Cookie.Key.Token, user.apiToken, { path: '/', domain: ('.' + K.Network.URL.Client.BaseHost), expires: remember?365:'' });
            Cookies.set(K.Cookie.Key.Tenant, user.tenant.domainPrefix, { path: '/', domain: ('.' + K.Network.URL.Client.BaseHost), expires: remember?365:''});

            dispatch(upsertModel(User, user));
            return user
        };
    }

    //Forgot password
    static async forgotPassword(email) {
        const user = await NetworkCall.fetch(Request.forgotPassword(email));
        console.log("User: ", user);
        return user
    }

    //Reset password
    static resetPassword(email, token, remember) {
        return async (dispatch) => {
            const user = await NetworkCall.fetch(Request.resetPassword(email, token));

            Cookies.set(K.Cookie.Key.Token, user.apiToken, { path: '/', domain: ('.' + K.Network.URL.Client.BaseHost), expires: remember?365:'' });
            Cookies.set(K.Cookie.Key.Tenant, user.tenant.domainPrefix, { path: '/', domain: ('.' + K.Network.URL.Client.BaseHost), expires: remember?365:''});

            dispatch(upsertModel(User, user));
            return user
        };
    }

    // Selectors


    // Helpers
    static isTokenAvailable() {
        return Cookies.get(K.Cookie.Key.Token) ? true : false;
    }

    static roles() {
        return [K.Roles.User];
    }

    static currentUser() {
        const unparsedUser = localStorage.getItem(K.LocalStorage.Key.User);
        return unparsedUser ? JSON.parse(unparsedUser) : null;
    }
    
    static logout(){
        Cookies.remove(K.Cookie.Key.Tenant, { path: '/', domain: ('.' + K.Network.URL.Client.BaseHost)});
        Cookies.remove(K.Cookie.Key.Token, { path: '/', domain: ('.' + K.Network.URL.Client.BaseHost)});
        redirectToLogin()
    }
    
    // Reducer
    static reducer(action, User, session) {
        baseReducer(action, User, session);
    }

}

User.modelName = 'User'

User.fields = {

    // Attributes
    id: attr(),
    firstName: attr(),
    lastName: attr(),
    name: attr(),
    email: attr(),
    cellPhone: attr(),
    officePhone: attr(),
    employeeNumber: attr(),
    fullTimeAvailabilityStartDate: attr(),
    fullTimeAvailabilityEndDate: attr(),
    targetUtilization: attr(),
    billRate: attr(),
    isCustomBillRate: attr(),
    photoPath: attr(),
    roleId: attr(),
    locationId: attr(),
    subscriptionId: attr(),
    dob: attr(),
    joiningDate: attr(),
    prefix: attr(),
    type: attr(),

}