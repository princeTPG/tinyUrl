import get from "lodash/get";
import isNumber from "lodash/isNumber";
import {
  DOMAIN, SHORT_LINK_EXPIRE_DURATION, EMPTY_REDIRECTIN_LINK,
} from '../../config';

import urlModel from "./urlModel";
import { getShortUniqueId } from "../../helpers/shortId";
import { trackRedirection } from '../analytics/analyticsController';
import { errorHandler, successHandler } from "../../helpers/responseHandlers";
import { getValue, setValue } from '../../services/memcacheService';

export const getUrl = async (req, res) => {
  try {
    const uid = get(req, 'params.uid', '');
    let isLinkFromCacheData = true;
    let link = await getValue(uid);

    if (!link) {
      isLinkFromCacheData = false;
      const result = await urlModel.findOne({ uid });
      link = get(result, 'link', EMPTY_REDIRECTIN_LINK);
    }
    // redirect user to corresponding link
    res.redirect(link);

    const analytiicsData = await trackRedirection(link, uid);
    const count = get(analytiicsData, 'count');

    if (count >= 10 && link !== EMPTY_REDIRECTIN_LINK && !isLinkFromCacheData) {
      setValue(uid, link)
    }
  } catch (err) {
    console.log('-- error :- ', err);
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
