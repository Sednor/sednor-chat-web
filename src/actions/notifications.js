import { ACTIONS } from './actionTypes';

import cancel from '../assets/icons/cancel.png';
import success from '../assets/icons/checked.png';
import warning from '../assets/icons/warning.png';

import Notification from '../models/Notification';

export function createNotification(notification) {
  return dispatch => {
    let icon = null;

    switch (notification.type) {
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
    dispatch({
      type: ACTIONS.CREATE_NOTIFICATION,
      data: new Notification({ ...notification, icon })
    });
  };
}

export function closeNotification() {
  return dispatch => {
    dispatch({
      type: ACTIONS.CLOSE_NOTIFICATION
    });
  };
}

export function enableNotifications() {
  return dispatch => {
    dispatch({
      type: ACTIONS.ENABLE_NOTIFICATIONS
    });
  };
}

export function disableNotifications() {
  return dispatch => {
    dispatch({
      type: ACTIONS.DISABLE_NOTIFICATIONS
    });
  };
}
