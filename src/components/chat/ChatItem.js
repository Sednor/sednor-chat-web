import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { compose } from 'redux';
import { DragSource, DropTarget } from 'react-dnd';
import PropTypes from 'prop-types';

import { getFullUserName } from '../../utils/userUtils';

import { getShortTimestamp } from '../../utils/timestampUtils';

import { ITEM_TYPES } from '../../common/drag-n-drop/itemTypes';
import { chatSource, chatSourceCollect } from '../../common/drag-n-drop/chat/source';
import { chatTarget, chatTargetCollect } from '../../common/drag-n-drop/chat/target';

import Chat from '../../models/Chat';

class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.messageSubmit = this.messageSubmit.bind(this);
  }

  static propTypes = {
    data: PropTypes.object,
    closeChat: PropTypes.func,
    users: PropTypes.array,
    moveChat: PropTypes.func,
    index: PropTypes.number
  };

  static defaultProps = {
    data: new Chat(),
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
    const { message } = this.state;

    if (message) {
      this.setState({ message: '' });
      this.props.addMessage(this.props.data, message);
    }

  }

  render() {
    return <div className="chat-content">
      <div className="chat-header">
        <h4 className="chat-name">
          {this.props.data.name}
        </h4>
        <div className="chat-header-control">
          <i className="fa fa-phone" />
          <i className="fa fa-video-camera" />
          <i onClick={() => this.props.closeChat(this.props.data)} className="chat-close-icon fa fa-times" />
        </div>
      </div>
      <div className="chat-body">
        {
          this.props.data.messages.map((message, index) => {
            if (this.props.data.messages[index - 1]) {
              if (this.props.data.messages[index - 1].author !== message.author) {
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
