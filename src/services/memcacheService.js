import Memcached from 'memcached';
import { MEMCACHE_PORT, DEFAULT_CACHE_LIFETIME } from '../config';

const serverLocation = `localhost:${MEMCACHE_PORT}`;

const memcached = new Memcached(serverLocation, { retries: 10, retry: 10000, remove: true });

export const getValue = (key) => {
  return new Promise((resolve, reject) => {
    memcached.get(key, function (err, data) {
      if (data) {
        return resolve(data);
      }
      return resolve('');
    });
  });
}

export const setValue = (key, value, lifetime = DEFAULT_CACHE_LIFETIME) => {
  return new Promise((resolve, reject) => {
    memcached.set(key, value, lifetime, function (err) {
      if (err) {
        return reject(err);
      }
      return resolve(value);
    });
  });
}
