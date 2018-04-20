import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import PropTypes from 'prop-types';

import { getFullUserName } from '../../utils/userUtils';

import { getShortTimestamp } from '../../utils/timestampUtils';

import Chat from '../../models/Chat';
import Message from '../../models/Message';

class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.messageSubmit = this.messageSubmit.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('message', data => {
      if (data.room === this.props.chat.id) {
        this.props.addMessage(this.props.chat, data.payload);
        // if (!this.props.chatsData.active.find(chat => chat.id === this.props.chat.id)) {
        this.props.createNotification('Message',
            `${getFullUserName(this.props.users.find(user => user.id === data.payload.author))} ${moment(data.payload.timeStamp).format('LT')}`,
            {
              body: data.payload.payload,
              tag: data.payload.timeStamp,
              lang: 'en',
              dir: 'ltr'
            });
        //   }
      }
    });
  }

  static propTypes = {
    chat: PropTypes.object,
    closeChat: PropTypes.func,
    users: PropTypes.array,
    moveChat: PropTypes.func,
    index: PropTypes.number
  };

  static defaultProps = {
    chat: new Chat(),
    closeChat: () => {
    },
    users: [],
    moveChat: () => {
    },
    index: Math.random()
  };

  messageSubmit(event) {
    if (event) {
      event.preventDefault();
    }
    if (this.state.message) {
      const MESSAGE = new Message({
        timestamp: Date.now(),
        payload: this.state.message,
        author: this.props.currentUser.id
      });

      this.setState({ message: '' });
      this.props.socket.emit('message', {
        room: this.props.chat.id,
        payload: MESSAGE
      });
      this.props.addMessage(this.props.chat, MESSAGE);
    }
  }

  render() {
    return <div className="chat-content">
      <div className="chat-header">
        <h4 className="chat-name">
          {this.props.chat.name}
        </h4>
        <div className="chat-header-control">
          <i className="fa fa-phone" />
          <i className="fa fa-video-camera" />
          <i onClick={() => this.props.closeChat(this.props.chat)} className="chat-close-icon fa fa-times" />
        </div>
      </div>
      <div className="chat-body">
        {
          this.props.chat.messages.map((message, index) => {
            if (this.props.chat.messages[index - 1]) {
              if (this.props.chat.messages[index - 1].author !== message.author) {
                return (
                    <div className="message full-message">
                      <div className="message-author">
                        <div className="message-author-photo">
                          {
                            this.props.users.find(user => user.id === message.author).firstName[0]
                          }
                        </div>
                        <span className="message-author-name">
                               {getFullUserName(this.props.users.find(user => user.id === message.author))}
                            </span>
                        <span className="message-timestamp">
                  {getShortTimestamp(message.timestamp)}
                </span>
                      </div>
                      <div className="message-body">
                        <div className="pl-5 message-body-text">
                          {
                            message.payload
                          }
                        </div>
                      </div>
                    </div>
                )
              }
              else {
                return <div className="message">
                  <div className="message-body">
                        <span className="message-timestamp">
                  {getShortTimestamp(message.timestamp)}
                </span>
                    <div className="message-body-text">
                      {
                        message.payload
                      }
                    </div>
                  </div>
                </div>
              }
            }
            else {
              return <div className="message full-message">
                <div className="message-author">
                  <div className="message-author-photo">
                    {
                      this.props.users.find(user => user.id === message.author).firstName[0]
                    }
                  </div>
                  <span className="message-author-name">
                               {getFullUserName(this.props.users.find(user => user.id === message.author))}
                            </span>
                  <span className="message-timestamp">
                  {getShortTimestamp(message.timestamp)}
                </span>
                </div>
                <div className="message-body">
                  <div className="pl-5 message-body-text">
                    {
                      message.payload
                    }
                  </div>
                </div>
              </div>
            }
          })
        }
      </div>
      <Form onSubmit={this.messageSubmit} className="chat-form">
        <FormGroup className="d-flex w-100 m-0 align-items-center">
          <i className="new-file-icon fa fa-plus" />
          <Input value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })}
                 className="chat-input"
                 placeholder="Message..." />
          <i onClick={this.messageSubmit} className="send-message-icon fa fa-paper-plane" />
        </FormGroup>
      </Form>
    </div>
  }
}

export default ChatItem;
