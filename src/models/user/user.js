import { attr } from 'redux-orm';
import BaseModel from '../baseModel/baseModel';
import NetworkCall from '../../network/networkCall';
import Request from '../../network/request';
import baseReducer from '../baseModel/baseReducer';
import { upsertModel } from '../baseModel/baseActions';


export default class User extends BaseModel {

    // API call using thunk
    static loginCall(email, password) {
        return async (dispatch) => {
            const user = await NetworkCall.fetch(Request.loginUser(email, password));
            dispatch(upsertModel(User, user));
        };
    }

    // Selectors
    
    
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