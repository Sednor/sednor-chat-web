export default class Message {
  constructor(data = {}) {
    this.id = data.id;
    this.timestamp = data.timestamp;
    this.payload = data.payload;
    this.author = data.author;
  }
}
