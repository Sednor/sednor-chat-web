import { CLIENT_DOMAIN } from '../config/index';

export function getCurrentURL() {
  const ENVIRONMENT = process.env.NODE_ENV;

  if (ENVIRONMENT === 'development') {
    return CLIENT_DOMAIN.development;
  } else if (ENVIRONMENT === 'production') {
    return CLIENT_DOMAIN.production;
  }
  return null;
}
