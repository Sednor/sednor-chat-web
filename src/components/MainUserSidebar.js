import { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';

import User from '../models/User';

class MainUserSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: '',
      sideBarValue: 'content'
    };
  }

  static propTypes = {
    userData: User,
    logout: PropTypes.func
  };

  static defaultProps = {
    userData: new User(),
    logout: () => {
    }
  };

  render() {
    if (Object.keys(this.props.userData).length) {
      return (
          <div className="main-user-sidebar">
            <div className="control-column">
              <div className="authorship">Sednor</div>
              <div className="photo">
                {this.props.userData.firstName[0].toUpperCase()}
              </div>
              <ul className="control-panel">
                <li onClick={() => this.setState({ sideBarValue: 'content' })}
                    className={`control-panel-item ${this.state.sideBarValue === 'content' ? 'active' : ''}`}><i
                    className="fa fa-comments"/></li>
                <li onClick={() => this.setState({ sideBarValue: 'settings' })}
                    className={`control-panel-item ${this.state.sideBarValue === 'settings' ? 'active' : ''}`}><i
                    className="fa fa-cog"/></li>
                <li onClick={this.props.logout} className="control-panel-item"><i className="fa fa-sign-out"/></li>
              </ul>
            </div>

            {
              this.state.sideBarValue === 'content' ?
                  <div className="content-column">
                    <div className="content-column-header">
                      <Input onChange={event => this.setState({ searchValue: event.target.value })}
                             style={{ fontFamily: 'FontAwesome' }}
                             placeholder="&#61442; Search..."/>
                      <i onClick={this.props.onChatModalOpen} className="create-chat-button fa fa-plus"/>
                    </div>
                    <div className="content-column-body">
                      <ul className="chat-list">
                        {
                          this.props.chats.filter(chat => chat.name.toLowerCase().includes(this.state.searchValue.toLowerCase())).map(chat =>
                              <li onClick={() => this.props.onChatOpen(chat)}
                                  key={chat.id}
                                  className={`chat-item ${this.props.activeChats.find(item => item.id === chat.id) ? 'active' : ''}`}>
                                <div className="chat-item-photo">{chat.name[0]}</div>
                                <div className="chat-item-content w-100">
                                  <div className="chat-item-name">
                                    {chat.name}
                                  </div>
                                  <div className="chat-item-message">
                                    {chat.messages[0] ? `${this.props.findUserById(chat.messages[chat.messages.length - 1].author).firstName} : ${chat.messages[chat.messages.length - 1].payload}` : ''}
                                  </div>
                                </div>

                              </li>).reverse()
                        }
                      </ul>
                    </div>
                  </div>
                  :
                  <div className="settings-column">

                  </div>

            }
          </div>
      );
    }
    return null;
  }
}

export default MainUserSidebar;
