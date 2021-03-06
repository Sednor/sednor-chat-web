import keymirror from 'keymirror';

export const ACTIONS = keymirror({
  /*
   USER
   */
  REQUEST_USER_DATA: null,
  RECEIVE_USER_DATA: null,
  ABORT_USER_DATA: null,

  /*
   USERS
   */
  REQUEST_USERS: null,
  RECEIVE_USERS: null,

  /*
   MODALS
   */
  OPEN_CHAT_MODAL: null,
  CLOSE_CHAT_MODAL: null,

  /*
   CHATS
   */
  REQUEST_CHATS: null,
  RECEIVE_CHATS: null,
  CREATE_CHAT: null,
  DELETE_CHAT: null,
  UPDATE_CHAT: null,
  OPEN_CHAT: null,
  CLOSE_CHAT: null,

  /*
   SOCKETS
   */
  SOCKETS_CONNECTING: null,
  SOCKETS_CONNECT: null,
  SOCKETS_DISCONNECTING: null,
  SOCKETS_DISCONNECT: null,
  SOCKETS_MESSAGE_SENDING: null,
  SOCKETS_MESSAGE_RECEIVING: null,

  /*
   NOTIFICATIONS
   */
  CREATE_NOTIFICATION: null,
  ENABLE_NOTIFICATIONS: null,
  DISABLE_NOTIFICATIONS: null,
  CLOSE_NOTIFICATION: null
});
