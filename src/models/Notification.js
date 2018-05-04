export default class Notification {
  constructor(data = {}) {
    this.type = data.type;
    this.title = data.title;
    this.options = {
      body: data.body,
      icon: data.icon,
      tag: data.tag,
      data: data.data
      /* can store user's id here
       */
    };
  }
}
