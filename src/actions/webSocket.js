import moment from 'moment';

import { ACTIONS } from './actionTypes';

import { MESSAGE_TYPES } from '../common/messageTypes';

import { createNotification } from '../utils/notificationUtils';

import { addChatMessage, fetchChats, updateChat } from './chats';

import { getFullUserName } from '../utils/userUtils';

export function socketsConnecting() {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_CONNECTING });
  };
}

export function socketsConnect(socket) {
  return dispatch => {
    socket.emit('connection');
    dispatch({ type: ACTIONS.SOCKETS_CONNECT });
  };
}

export function subscribeToWebSocketMessages(socket) {
  return dispatch => {
    Object.keys(MESSAGE_TYPES)
        .forEach(type => socket.on(type, payload =>
                dispatch({ type, payload })
            )
        );
  };
}

export function handleUserTyping(chats, messageData) {
  return dispatch => {

  };
}

export function listenToChatMessage(mainPageProps, messageData) {
  return dispatch => {
    if (!mainPageProps.chats.active.find(chat => chat.id === messageData.room)) {
      const MESSAGE_NOTIFICATION = {
        type: 'message',
        title: `${getFullUserName(mainPageProps.users.data.find(user => user.id === messageData.payload.author))} ${moment(messageData.payload.timeStamp).format('LT')}`,
        body: messageData.payload.payload,
        data: messageData.room
      };

      createNotification(MESSAGE_NOTIFICATION);
    }
    dispatch(addChatMessage(mainPageProps.chats.all.find(chat => chat.id === messageData.room), messageData.payload));
  };
}

export function listenToNewChatRequest(mainPageProps, messageData) {
  return dispatch => {
    if (messageData.users.find(user => user.id === mainPageProps.currentUser.data.id)) {
      dispatch(fetchChats());
      mainPageProps.webSocket.socket.emit('open-chat', { room: messageData.room });
    }
  };
}

export function socketsDisconnecting() {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_DISCONNECTING });
  };
}

export function socketsDisconnect() {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_DISCONNECT });
  };
}

export function socketsMessageSending(sendMessage) {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_MESSAGE_SENDING, message: sendMessage });
  };
}

export function socketsMessageReceiving(sendMessage) {
  return dispatch => {
    dispatch({ type: ACTIONS.SOCKETS_MESSAGE_RECEIVING, message: sendMessage });
  };
}
