import httpStatus from 'http-status';

/**
 * responseHandler
 * @param {Object} res - response object
 * @param {Object/String} data - data object or string
 * @param {number} status - status
 * @returns {Object}
 */
const responseHandler = (res, data, status = httpStatus.OK) => {
  let dataJson = {};

  if (typeof data === 'string') {
    dataJson.message = data;
  } else {
    dataJson = data;
  }

  res.status(status);
  return res.json(dataJson);
};

/**
 * Error handler
 * @param {Object} res - response object
 * @param {Object/String} error - error object or string
 * @param {number} status - status
 * @returns {undefined}
 */
export const errorHandler = (res, error, status = httpStatus.BAD_REQUEST) => {
  responseHandler(res, error, status);
};

/**
 * successHandler
 * @param {Object} res - response object
 * @param {Object/String} data - data object or string
 * @param {number} status - status
 * @returns {undefined}
 */
export const successHandler = (res, data, status = httpStatus.OK) => {
  responseHandler(res, data, status);
};
