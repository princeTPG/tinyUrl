import get from "lodash/get";
import isNumber from "lodash/isNumber";
import {
  DOMAIN, SHORT_LINK_EXPIRE_DURATION,
} from '../../config';

import urlModel from "./urlModel";
import { getShortUniqueId } from "../../helpers/shortId";
import { trackRedirection } from '../analytics/analyticsController';
import { errorHandler, successHandler, errorHandlerViewTemplate } from "../../helpers/responseHandlers";
import { getValue, setValue } from '../../services/memcacheService';
import { isJsonRequest } from "../../helpers/headerChecker";

export const renderHomePage = async (req, res) => {
  try {
    res.set('Content-Type', 'text/html')
    res.render('tinyUrlHome.ejs', { shortLink: '', message: '' });
    return res.end();
  } catch (error) {
    errorHandlerViewTemplate(res);
    res.end();
  }
};

// to remove un-necessary favicon call.
export const getFavicon = (req, res) => {
  return successHandler(res, null);
};

export const getUrl = async (req, res) => {
  try {
    const uid = get(req, 'params.uid', '');
    let isLinkFromCacheData = true;
    let link = await getValue(uid);

    if (!link) {
      isLinkFromCacheData = false;
      const result = await urlModel.findOne({ uid });
      link = get(result, 'link', '');
    }
    if (link) {
      if (isJsonRequest(req)) {
        successHandler(res, { shortLink: `${DOMAIN}/${uid}`, link })
      } else {
        // redirect user to corresponding link
        res.redirect(link);
      }
    } else {
      return res.render('error404.ejs', {});
    }

    const analytiicsData = await trackRedirection(link, uid);
    const count = get(analytiicsData, 'count');

    if (count >= 10 && link && !isLinkFromCacheData) {
      setValue(uid, link)
    }
  } catch (err) {
    if (isJsonRequest(req)) {
      return errorHandler(res, err);
    }
    return errorHandlerViewTemplate(res, '', err);
  }
};

export const add = async (req, res) => {
  try {
    // expire in time in seconds.
    const expireIn = get(req, 'body.expireIn') || SHORT_LINK_EXPIRE_DURATION;
    const link = get(req, 'body.link', '');
    let uid = get(req, 'body.uid', '');

    if (!link || !isNumber(expireIn)) {
      const data = { message: "Please provide valid values.", shortLink: '' };
        if (isJsonRequest(req)) {
          return errorHandler(res, data);
        }
        return res.render('tinyUrlHome', data);
    }

    if (uid) {
      const resp = await urlModel.findOne({ uid });
      if (resp) {
        const data = { message: "Unique-id already exists.", shortLink: '' };
        if (isJsonRequest(req)) {
          return errorHandler(res, data);
        }
        return res.render('tinyUrlHome', data);
      }
    } else {
      uid = getShortUniqueId();
    }

    const currentDate = new Date().getTime();
    const expireAt = new Date(currentDate + parseInt(expireIn) * 1000);

    await urlModel.create({ link, uid, expireAt });
    const response = { shortLink: `${DOMAIN}/${uid}`, message: '' };

    if (isJsonRequest(req)) {
      return successHandler(res, response);
    } else {
      return res.render('tinyUrlHome', response);
    }
  } catch (err) {
    if (isJsonRequest(req)) {
      return errorHandler(res, err);
    } else {
      errorHandlerViewTemplate(res, '', err);
    }
  }
};
