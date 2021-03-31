import K from "../utilities/constants";
import Cookies from "js-cookie";

export default class Request {
  constructor(
    relativeURL,
    method = K.Network.Method.GET,
    body = null,
    defaultHeaderType = K.Network.Header.Type.Json,
    headers = {},
    isTenant = true
  ) {
    const token = Cookies.get(K.Cookie.Key.Token);
    const domainPrefix = Cookies.get(K.Cookie.Key.Tenant);
    headers = {
      ...(defaultHeaderType === K.Network.Header.Type.Json
        ? K.Network.Header.Default(token)
        : K.Network.Header.Authorization(token)),
      ...headers,
    };
    this.url = isTenant ? K.Network.URL.TenantURL(domainPrefix) + relativeURL : K.Network.URL.BaseAPI + relativeURL;
    this.method = method;
    this.body = body;
    this.headers = headers;
  }

  // Tenant calls.
  static getTenant() {
    return new Request(K.Network.URL.GetTenant, K.Network.Method.GET);
  }

  // User calls.
  static loginUser(email, password) {
    const body = {
      email,
      password,
    };
    return new Request(K.Network.URL.LoginUser, K.Network.Method.POST, body, K.Network.Header.Type.Json, {}, false);
  }

  static forgotPassword(email) {
    const body = {
      email,
    };
    return new Request(
      K.Network.URL.ForgotPassword,
      K.Network.Method.POST,
      body,
      K.Network.Header.Type.Json,
      {},
      false
    );
  }

  static resetPassword(password, token) {
    const body = {
      password,
      token,
    };
    return new Request(K.Network.URL.ResetPassword, K.Network.Method.POST, body, K.Network.Header.Type.Json, {}, false);
  }
}
