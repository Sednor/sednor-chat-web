export function getToken() {
  return localStorage.getItem('sednorChatUserToken');
}

export function setToken(token) {
  localStorage.setItem('sednorChatUserToken', token);
}

export function deleteToken() {
  localStorage.removeItem('sednorChatUserToken');
}
