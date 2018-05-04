import axios from 'axios';

import { getToken, setToken } from '../utils/tokenUtils';

export default function apiMiddleware(url, method, data, headers = {}) {
  const HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: getToken()
  };

  return axios({ url, method, data, headers: { ...HEADERS, headers } })
    .then(res => {
      if (res.headers.authorization) {
        setToken(res.headers.authorization);
      }
      return res;
    });
}
