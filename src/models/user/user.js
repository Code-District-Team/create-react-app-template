import { attr } from 'redux-orm';
import BaseModel from '../baseModel/baseModel';
import NetworkCall from '../../network/networkCall';
import Request from '../../network/request';
import baseReducer from '../baseModel/baseReducer';
import { upsertModel } from '../baseModel/baseActions';
import K from '../../utilities/constants';
import Cookies from 'js-cookie'


export default class User extends BaseModel {

    // API call using thunk.
    static loginCall(email, password) {
        return async (dispatch) => {
            const user = await NetworkCall.fetch(Request.loginUser(email, password));
            
            Cookies.set(K.Cookie.Key.Token, user.apiToken, { path: '/', domain: ('.' + K.Network.URL.Client.BaseHost), expires: 365 });
            Cookies.set(K.Cookie.Key.Tenant, user.tenant.domainPrefix, { path: '/', domain: ('.' + K.Network.URL.Client.BaseHost), expires: 365 });

            dispatch(upsertModel(User, user));
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