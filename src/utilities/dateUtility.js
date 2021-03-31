import moment from "moment";

export const defaultFormat = "MM-DD-YYYY";
/**
 * expects utc date in form of string and converts and returns local date in moment object.
 * @param {string} date
 * @returns {Object}
 */
export const parsedDate = (date) => moment.utc(date, "DD-MM-YYYY").local();
