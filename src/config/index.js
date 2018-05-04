export const DOMAIN = 'https://sednor-chat-server.herokuapp.com';
export const API_PREFIX = `${DOMAIN}/api/v1`;

export const URL = {
  webSocket: { DOMAIN },
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
