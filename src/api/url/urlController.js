import get from "lodash/get";
import { DOMAIN } from '../../config';


import { errorHandler, successHandler } from "../../helpers/responseHandlers";
import urlModel from "./urlModel";

export const getUrl = async (req, res) => {
  try {
    const uid = get(req, 'params.uid', '');

    const result = await urlModel.findOne({ uid });
    return res.redirect(get(result, 'link', 'about:/blank'));
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const add = async (req, res) => {
  try {
    const link = get(req, 'body.link', '');

    if (!link) {
      return errorHandler(res, { message: "Please provide valid link." });
    }

    // need to add logic for shot link
    const uid = new Date().getMilliseconds().toString() + (Math.random() * 100000000).toFixed();

    await urlModel.create({ link, uid });

    return successHandler(res, { shotLink: `${DOMAIN}/${uid}` });
  } catch (err) {
    return errorHandler(res, err);
  }
};