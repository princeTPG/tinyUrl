import get from "lodash/get";
import isNumber from "lodash/isNumber";
import { DOMAIN, SHORT_LINK_EXPIRE_DURATION } from '../../config';

import urlModel from "./urlModel";
import { getShortUniqueId } from "../../helpers/shortId";
import { trackRedirection } from '../analytics/analyticsController';
import { errorHandler, successHandler } from "../../helpers/responseHandlers";

export const getUrl = async (req, res) => {
  try {
    const uid = get(req, 'params.uid', '');

    const result = await urlModel.findOne({ uid });
    const link = get(result, 'link', 'about:/blank');
    trackRedirection(link, uid);
    return res.redirect(link);
  } catch (err) {
    return errorHandler(res, err);
  }
};

export const add = async (req, res) => {
  try {
    // expire in time in seconds.
    const expireIn = get(req, 'body.expireIn', SHORT_LINK_EXPIRE_DURATION);
    const link = get(req, 'body.link', '');
    let uid = get(req, 'body.uid', '');

    if (!link || !isNumber(expireIn)) {
      return errorHandler(res, { message: "Please provide valid values." });
    }

    if (uid) {
      const resp = await urlModel.findOne({ uid });
      if (resp) {
        return errorHandler(res, { message: "unique-id already exists." });
      }
    } else {
      uid = getShortUniqueId();
    }

    const currentDate = new Date().getTime();
    const expireAt = new Date(currentDate + expireIn * 1000);

    await urlModel.create({ link, uid, expireAt });

    return successHandler(res, { shotLink: `${DOMAIN}/${uid}` });
  } catch (err) {
    return errorHandler(res, err);
  }
};