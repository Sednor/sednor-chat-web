export const API_PREFIX = 'https://sednor-chat-server.herokuapp.com/api/v1';

export const URL = {
  webSocket: 'https://sednor-chat-server.herokuapp.com',
  auth: {
    signIn: `${API_PREFIX}/auth/signin`,
    signUp: `${API_PREFIX}/auth/signup`,
    currentUser: `${API_PREFIX}/auth/current`,
  },
  users: `${API_PREFIX}/user/index`,
  chats: {
    main: `${API_PREFIX}/chat`,
    get: `${API_PREFIX}/chat/index`,
    byId: id => `${API_PREFIX}/chat/${id}`
  }
};
