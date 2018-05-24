export const SERVER_DOMAIN = 'https://sednor-chat-server.herokuapp.com';
export const API_PREFIX = `${SERVER_DOMAIN}/api/v1`;

export const CLIENT_DOMAIN = {
  development: 'http://localhost:3002/',
  production: 'http://chat.sednor.com'
};

export const URL = {
  webSocket: { SERVER_DOMAIN },
  auth: {
    signIn: `${API_PREFIX}/auth/signin`,
    signUp: `${API_PREFIX}/auth/signup`,
    currentUser: `${API_PREFIX}/auth/current`
  },
  users: `${API_PREFIX}/user/index`,
  chats: {
    main: `${API_PREFIX}/chat`,
    get: `${API_PREFIX}/chat/index`,
    byId: id => `${API_PREFIX}/chat/${id}`
  }
};
