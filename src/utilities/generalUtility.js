import { message } from "antd";
import User from "../redux/models/user/user";
import K from "./constants";
import history from "./history";

export const handleError = (error, dispatch = null) => {
  console.error(error);
  message.error(error.message);
  return null;
};

export const toCamelCaseToSentence = (string) => {
  return string.replace(/([A-Z]+)*([A-Z][a-z])/g, "$1 $2");
};

export const snakeCaseToSentence = (string) => {
  return string
    ?.split("_")
    ?.map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    ?.join(" ");
};

export const hasOnlyDigits = (string) => {
  return /^-{0,1}\d+$/.test(string);
};

export const getColor = (value) => {
  //value from 0 to 1
  var hue = ((1 - value) * 120).toString(10);
  return ["hsl(", hue, ",65%,70%)"].join("");
};

export const isNumberRegex = () => {
  return new RegExp("^[0-9]*$");
};

export const isDecimalRegex = () => {
  return new RegExp("^\\d+\\.?\\d*$");
};

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
};

export const redirectToLogin = (error = "") => {
  if (typeof window !== "undefined") {
    let newUrl =
      window.location.protocol + "//" + K.Network.URL.Client.BaseHost + ":" + K.Network.URL.Client.BasePort + "/login";
    if (error !== "") {
      newUrl += `?err=${error}`;
    }
    window.location = newUrl;
  }
};

export const redirectIfInvalidTenant = () => {
  const cookieDomainPrefix = User.getTenant();
  console.log({ cookieDomainPrefix });
  const hostArray = window.location.hostname.split(".");
  const urlDomainPrefix = hostArray.length > 0 ? hostArray[0] : "";
  const path = window.location.pathname;
  const search = window.location.search;
  if (
    !cookieDomainPrefix &&
    (urlDomainPrefix === "www" || urlDomainPrefix === "localhost" || urlDomainPrefix === K.Network.URL.DomainName)
  )
    return false;
  if (cookieDomainPrefix !== urlDomainPrefix) {
    redirectToUrl(cookieDomainPrefix, path + search);
  }
};

export const redirectToUrl = (domainPrefix, path) => {
  window.location =
    window.location.protocol +
    "//" +
    (domainPrefix ? domainPrefix + "." : "") +
    K.Network.URL.Client.BaseHost +
    ":" +
    K.Network.URL.Client.BasePort +
    path;
};

export const setFieldErrorsFromServer = (error, form, values = undefined) => {
  if (error.error === undefined) return;
  const errors = error.error.data.errors;
  if (typeof errors === "string" || errors instanceof String) {
    return;
  }
  let fieldErrors = [];
  // debugger;
  for (let key in errors) {
    if (errors.hasOwnProperty(key)) {
      // let fieldError = errors[key].map((error) => {
      //     return error;
      // });
      fieldErrors.push({
        name: key,
        errors: errors[key],
        value: values && values[key] ? values[key] : undefined,
      });
    }
  }
  form.setFields(fieldErrors);
};

export const snakeToCamel = (str) => {
  return str.toLowerCase().replace(/([-_][a-z])/g, (group) => group.toUpperCase().replace("-", "").replace("_", ""));
};

export const camelCaseKeys = (obj) =>
  Object.keys(obj).reduce(
    (ccObj, field) => ({
      ...ccObj,
      [snakeToCamel(field)]: obj[field],
    }),
    {}
  );

export const deleteQueryParam = (key) => {
  const queryParams = new URLSearchParams(window.location.search);

  queryParams.delete(key);
  history.push({
    search: queryParams.toString(),
  });
};

/**
 *
 * @param {array} array array to be sorted
 * @param {string} property property name
 * @returns {array} sorted array
 */
export const sortOnProperty = (array, property) =>
  array.sort((a, b) => a[property].toLowerCase().localeCompare(b[property].toLowerCase()));

/**
 * Image not found url
 */
export const notFoundImageUrl = `${window.location.origin.toString()}/images/not_found.svg`;

/**
 *
 * @param {string} value
 * @returns {boolean}
 */
export const hasSpecialCharacters = (value) => !value.match(/^[-_ ()a-zA-Z0-9]+$/);

/**
 *
 * @param {string} value
 * @returns {string}
 */
export const removeMultipleSpaces = (value) => value.replace(/ +(?= )/g, "");

/**
 *
 * @param {array} arr array including elements to be swapped
 * @param {number} from start index
 * @param {number} to end index
 * @returns {array} array with swapped elements
 */
export const swapPosition = (arr, from, to) => {
  if (Object.prototype.toString.call(arr) !== "[object Array]") {
    throw new Error("Please provide a valid array");
  }
  // Delete the item from it's current position
  var item = arr.splice(from, 1);
  // Make sure there's an item to move
  if (!item.length) {
    throw new Error("There is no item in the array at index " + from);
  }
  // Move the item to its new position
  arr.splice(to, 0, item[0]);
  return arr;
};
