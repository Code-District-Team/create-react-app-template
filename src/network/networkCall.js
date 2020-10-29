import axios from 'axios';
import K from '../utilities/constants';
import { message } from 'antd';

export default class NetworkCall {

    static async fetch(request) {
        try {
            const response = await NetworkCall.axios({
                method: request.method,
                url: request.url,
                data: request.body,
                headers: request.headers,
                validateStatus:(status)=>{
                    return (status >= 200 && status < 300) || status == 304;
                }
            });
            return response.data;
        } catch(error) {
            console.log(error.message);
            message.error("Some error occured!")
            return Promise.reject({
                error: error,
                message: K.Network.Default.Error,
                statusCode: 400
            });
        }
        
    }
    //  myFetch = async(request) => {
    //     let body = null;
    //     console.log(request);
    //     //stringifying body object if json post request
    //     if(request.method == K.Network.Method.POST) {
    //         if (request.headers[K.Network.Header.ContentType] == K.Network.Header.ApplicationJson) {
    //             body = request.getStringBody();
    //         } else {
    //             body = request.body;
    //         }
    //     } 
    //     try{
    //         //calling server to get the response
    //         const response = await fetch(request.url, {
    //             method: request.method,
    //             headers: request.headers,
    //             body: body
    //         });
    //         if(response.status == K.Network.StatusCode.Unauthorized) {
    //             GeneralUtility.redirectToLogin();
    //         }
    //         //getting json
    //         const json = await response.json();
    //         if(response.ok) {
    //             return json;
    //         }
    //         else {
    //             debugger;
    //             console.log(json);
    //             //getting errors from json
    //             let errorString = "";
    //             if(json.errors) {
    //                 Object.values(json.errors).map((fieldError) => {
    //                     fieldError.map((error) => {
    //                         errorString += error + "\n";
    //                     })
    //                 });
    //                 console.log("hereeeeee123");
    //                 return Promise.reject({
    //                     error: json.errors,
    //                     message: ((json.message) ? (json.message  + "\n") : "") +
    //                         ((json.exception) ? ((json.exception) + "\n") : "") +
    //                         ((errorString) ? (errorString) : ""),
    //                     statusCode: response.status
    //                 });
    //             }
    //             if (json.error) {
    //                 if(response.status == K.Network.StatusCode.Unauthorized) {
    //                     console.log("NOT LOGGED IN>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    //                     GeneralUtility.redirectToLogin();
    //                 }
    //                 return Promise.reject({
    //                     error: json,
    //                     message: json.error,
    //                     statusCode: response.status
    //                 });
    //             }
    //             return Promise.reject({
    //                 error: {'default': [K.Network.Default.Error]},
    //                 message: K.Network.Default.Error,
    //                 statusCode: response.status
    //             });
    //         }
    //     }
    //     catch(error) {
    //         debugger;
    //         console.log(error.message);
    //         return Promise.reject({
    //             error: error,
    //             message: K.Network.Default.Error,
    //             statusCode: 400
    //         })
    //     }
    // }


}
NetworkCall.axios = axios.create({
    baseURL: K.Network.URL.BaseAPI,
    timeout: K.Network.Timeout,
    headers: {}
})