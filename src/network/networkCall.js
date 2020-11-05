import React from "react";
import axios from "axios";
import K from "../utilities/constants";
import { message } from "antd";
import { redirectToLogin } from "../utilities/generalUtility";

export default class NetworkCall {
  static async fetch(request) {
    try {
      const response = await NetworkCall.axios({
        method: request.method,
        url: request.url,
        data: request.body,
        headers: request.headers,
        validateStatus: (status) => {
          return (status >= 200 && status < 300) || status == 304;
        },
      });
      return response.data;
    } catch (error) {
      if (error.status === K.Network.StatusCode.Unauthorized) {
        redirectToLogin();
      }
      console.log(error.message);
      message.error("Some error occured!");
      return Promise.reject({
        error: error,
        message: K.Network.Default.Error,
        statusCode: 400,
      });
    }
  }
}
NetworkCall.axios = axios.create({
  baseURL: K.Network.URL.BaseAPI,
  timeout: K.Network.Timeout,
  headers: {},
});
