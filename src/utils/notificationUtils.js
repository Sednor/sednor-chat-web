import cancel from '../assets/icons/cancel.png';
import success from '../assets/icons/checked.png';
import warning from '../assets/icons/warning.png';

function defaultClickHander(notification) {
  notification.close();
}

function messageClickHandler(notification) {
  defaultClickHander(notification);
}

export function createNotification(notification) {
  if (Notification.permission === 'granted') {
    const OPTIONS = { body: notification.body, dir: 'auto', tag: Math.random() };
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

    OPTIONS.icon = icon;
    const NOTIFICATION = new Notification(notification.title, OPTIONS);

    if (notification.type === 'message') {
      NOTIFICATION.onclick = () => messageClickHandler(NOTIFICATION, notification.data);
    } else {
      NOTIFICATION.onclick = () => defaultClickHander(NOTIFICATION);
    }
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(permission => {
      if (permission === 'granted') {
        createNotification(notification);
      }
    });
  }
}
