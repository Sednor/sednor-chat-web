const emojiJson = require('emoji-datasource-apple/emoji.json');

export function formatChatInputValue(message) {
  let NEW_MESSAGE = message;
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

      NEW_MESSAGE = NEW_MESSAGE.replace(emojiItem, IMAGE.outerHTML);
    });
    return NEW_MESSAGE;
  }
  return message;
}

export function formatChatMessage(message) {
  let NEW_MESSAGE = document.createElement("div");

  NEW_MESSAGE.innerHTML = message;

  const EMOJI_COLONS = NEW_MESSAGE.innerHTML.match(/:(.*?):/gmi);
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

      NEW_MESSAGE = NEW_MESSAGE.innerHTML.replace(emojiItem, IMAGE.outerHTML);
    });
  }

  return NEW_MESSAGE;
}
