const emojiJson = require('emoji-datasource-apple/emoji.json');

export function formatChatInputValue(message) {
  let formattedMessage = message;
  const EMOJI_COLONS = message.match(/:(.*?):/gmi);

  if (EMOJI_COLONS) {
    EMOJI_COLONS.forEach(emojiItem => {
      const EMOJI = emojiJson.find(item => item.short_name === emojiItem.slice(1, -1));

      if (!EMOJI) {
        return;
      }
      const IMAGE_SOURCE = require(`emoji-datasource-apple/img/apple/64/${EMOJI.image}`);
      const IMAGE = document.createElement('img');

      IMAGE.setAttribute('src', IMAGE_SOURCE);
      IMAGE.classList.add('emoji-image');
      formattedMessage = formattedMessage.replace(emojiItem, IMAGE.outerHTML);
    });
    return formattedMessage;
  }
  return message;
}

export function formatChatMessage(message) {
  let formattedMessage = document.createElement("div");

  formattedMessage.innerHTML = message;
  const EMOJI_COLONS = formattedMessage.innerHTML.match(/:(.*?):/gmi);

  if (EMOJI_COLONS) {
    EMOJI_COLONS.forEach(emojiItem => {
      const EMOJI = emojiJson.find(item => item.short_name === emojiItem.slice(1, -1));

      if (!EMOJI) {
        return;
      }
      const IMAGE_SOURCE = require(`emoji-datasource-apple/img/apple/64/${EMOJI.image}`);
      const IMAGE = document.createElement('img');

      IMAGE.setAttribute('src', IMAGE_SOURCE);
      IMAGE.classList.add('emoji-image');
      formattedMessage = formattedMessage.innerHTML.replace(emojiItem, IMAGE.outerHTML);
    });
  }

  return formattedMessage;
}
