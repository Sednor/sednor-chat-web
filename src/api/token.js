import axios from 'axios';

import { setToken } from '../utils/tokenUtils';

import { URL } from '../config';

export function fetchToken(loginType, data) {
  return new Promise((resolve, reject) => {
    if (loginType === 'signIn') {
      return axios.post(URL.signIn, {
        email: data.email,
        password: data.password
      })
          .then(res => {
            const jwToken = res.headers.authorization;

            setToken(jwToken);
            resolve(jwToken);
          })
          .catch(error => {
            reject(error);
          })
    }

    if (loginType === 'signUp') {
      return axios.post(URL.signUp, {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName
      })
          .then(res => {
            //change later
            resolve(fetchToken('signIn', data));
          })
          .catch(error => {
            reject(error);
          })
    }
  });
}
