import { ACTIONS } from './actionTypes';

import api from '../api/api';

import { URL } from '../config';

import Chat from '../models/Chat';

export function fetchChats() {
  return dispatch => {
    dispatch({
      type: ACTIONS.REQUEST_CHATS
    });
    api.get(URL.chats.get)
        .then(response => {
          dispatch({
            type: ACTIONS.RECEIVE_CHATS,
            data: response.data.map(chat => new Chat(chat))
          })
        })
        .catch(error => {
          console.log(error);
        })

  };
}

export function createChat(chatMembers) {
  return dispatch => {
    api.post(URL.chats.main, { users: chatMembers.map(item => ({ ...item, id: item.id })) })
        .then(res => {
          dispatch({
            type: ACTIONS.CREATE_CHAT,
            data: new Chat(res.data)
          });
        })
        .catch(error => {
          console.log(error);
        })
  };
}

export function updateChat(chat) {
  return dispatch => {
    dispatch({
      type: ACTIONS.UPDATE_CHAT,
      data: chat
    })
  }
}

export function openChat(chat) {
  return dispatch => {
    dispatch({
      type: ACTIONS.OPEN_CHAT,
      data: chat
    })
  }
}

export function closeChat(chat) {
  return dispatch => {
    dispatch({
      type: ACTIONS.CLOSE_CHAT,
      data: chat
    })
  }
}
