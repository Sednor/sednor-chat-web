import { setToken } from '../utils/tokenUtils';

import { URL } from '../config';
import api from './api';

export function fetchToken(loginType, data) {
  return new Promise((resolve, reject) => {
    if (loginType === 'signIn') {
      api.post(URL.auth.signIn, {
        email: data.email,
        password: data.password
      })
          .then(res => {
            const jwToken = res.headers.authorization;

            setToken(jwToken);
            resolve(jwToken);
          })
          .catch(error => {
            reject(new Error(error.response.data.error.message));
          })
    }

    if (loginType === 'signUp') {
      api.post(URL.auth.signUp, {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      })
          .then(res => {
            resolve(res.status);
          })
          .catch(error => {
            reject(new Error(error.response.data.error.message));
          })
    }
  });
}
