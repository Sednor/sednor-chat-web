import { ACTIONS } from './actionTypes';

import cancel from '../assets/icons/cancel.png';
import success from '../assets/icons/checked.png';
import warning from '../assets/icons/warning.png';

export function createNotification(type, title, options) {
  return dispatch => {
    let icon = null;
    const OPTIONS = options;

    switch (type) {
      case 'success':
        icon = success;
        break;

      case 'error':
        icon = cancel;
        break;

      case 'warning':
        icon = warning;
        break;
    }

    OPTIONS.icon = icon;
    dispatch({
      type: ACTIONS.CREATE_NOTIFICATION,
      data: { title, options: OPTIONS }
    });
  };
}

export function enableNotifications() {
  return dispatch => {
    dispatch({
      type: ACTIONS.ENABLE_NOTIFICATIONS
    })
  };
}

export function disableNotifications() {
  return dispatch => {
    dispatch({
      type: ACTIONS.DISABLE_NOTIFICATIONS
    })
  };
}
