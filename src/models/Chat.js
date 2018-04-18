export default class Chat {
  constructor(data = {}) {
    this.id = data.id;
    this.users = data.users;
    this.name = data.name;
    this.messages = data.messages;
  }
}
