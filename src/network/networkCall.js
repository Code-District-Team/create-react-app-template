import React from "react";
import axios from "axios";
import K from "../utilities/constants";
import { message } from "antd";
import { redirectToLogin } from "../utilities/generalUtility";
import { trackPromise } from "react-promise-tracker";

export default class NetworkCall {
  static async fetch(request) {
    try {
        const response = await trackPromise(NetworkCall.axios({
        method: request.method,
        url: request.url,
        data: request.body,
        headers: request.headers,
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status === 304;
        },
      }));
      console.log("data", response.data);
      return response.data;
    } catch (err) {
      let error = err.response;
      console.log("Error", error);
      message.error(error.data.message);
      if (error.status === K.Network.StatusCode.Unauthorized) {
        redirectToLogin();
      }
      return Promise.reject({
        error: error,
        message: error.data.message,
        statusCode: error.status,
      });
    }
  }
}
NetworkCall.axios = axios.create({
  baseURL: K.Network.URL.BaseAPI,
  timeout: K.Network.Timeout,
  headers: {},
});
