import { attr } from "redux-orm";
import NetworkCall from "network/networkCall";
import Request from "network/request";
import K from "utilities/constants";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";
import BaseModel from "models/baseModel/baseModel";
import { redirectToLogin } from "utilities/generalUtility";
import baseReducer from "models/baseModel/baseReducer";
import { upsertModel } from "models/baseModel/baseActions";

export default class User extends BaseModel {
  // API call using thunk.
  static loginCall(email, password, remember) {
    return async (dispatch) => {
      const user = await NetworkCall.fetch(Request.loginUser(email, password));
      let encryptedUser = CryptoJS.AES.encrypt(
        JSON.stringify(user),
        K.Cookie.Key.EncryptionKey
      );
      console.log(encryptedUser);
      Cookies.set(K.Cookie.Key.User, encryptedUser, {
        path: "/",
        domain: "." + K.Network.URL.Client.BaseHost,
        expires: remember ? 365 : "",
      });

      dispatch(upsertModel(User, user));
      return user;
    };
  }

  static logoutCall(error = "") {
    Cookies.remove(K.Cookie.Key.User, {
      path: "/",
      domain: "." + K.Network.URL.Client.BaseHost,
    });
    redirectToLogin(error);
  }

  //Forgot password
  static async forgotPassword(email) {
    const user = await NetworkCall.fetch(Request.forgotPassword(email));
    console.log("User: ", user);
    return user;
  }

  //Reset password
  static resetPassword(email, token, remember) {
    return async (dispatch) => {
      const user = await NetworkCall.fetch(Request.resetPassword(email, token));

      Cookies.set(K.Cookie.Key.Token, user.apiToken, {
        path: "/",
        domain: "." + K.Network.URL.Client.BaseHost,
        expires: remember ? 365 : "",
      });
      Cookies.set(K.Cookie.Key.Tenant, user.tenant.domainPrefix, {
        path: "/",
        domain: "." + K.Network.URL.Client.BaseHost,
        expires: remember ? 365 : "",
      });

      dispatch(upsertModel(User, user));
      return user;
    };
  }

  // Selectors

  // Helpers
  static getUserObjectFromCookies() {
    let cookieUser = Cookies.get(K.Cookie.Key.User);
    let bytes = cookieUser
      ? CryptoJS.AES.decrypt(cookieUser, "blc_logged_in_user")
      : "{}";
    try {
      let utfBytes = bytes.toString(CryptoJS.enc.Utf8);
      // console.log("asdasdasdasd", JSON.parse(utfBytes))
      return JSON.parse(utfBytes);
    } catch (error) {
      console.log("error", error);
      return this.logoutCall("User unauthorized");
    }
  }

  static isTokenAvailable() {
    return this.getUserObjectFromCookies().apiToken ? true : false;
  }

  static getTenant() {
    console.log(this.getUserObjectFromCookies().tenant?.domainPrefix ?? null);
    return this.getUserObjectFromCookies().tenant?.domainPrefix ?? null;
  }

  static getToken() {
    return this.getUserObjectFromCookies().apiToken ?? "";
  }

  static getName() {
    return this.getUserObjectFromCookies().name ?? "";
  }

  static getEmail() {
    return this.getUserObjectFromCookies().email ?? "";
  }
  static roles() {
    return [K.Roles.User];
  }

  // Reducer
  static reducer(action, User, session) {
    baseReducer(action, User, session);
  }
}

User.modelName = "User";

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
};
