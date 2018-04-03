import { Component } from 'react';
import PropTypes from 'prop-types';

import User from '../models/User';

class MainUserSidebar extends Component {
  constructor(props) {
    super(props);
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
            <div className="main-user-sidebar-header">
              <div className="photo">
                {this.props.userData.firstName[0].toUpperCase()}
              </div>
              <h4 className="username">{this.props.userData.firstName}</h4>
            </div>
            <div className="main-user-sidebar-chatlist">
              <div className="chat-handler">
                <span className="all-chats-button ">Chats</span>
                <i className="create-chat-button fa fa-plus-square" />
              </div>
              <ul className="chat-list">
                <li>Nikita</li>
                <li>Lev</li>
                <li>Dima</li>
                <li>Dima, Lev, Nikita</li>
              </ul>
            </div>
            <div className="logout" onClick={this.props.logout}>
              <h4>Logout</h4>
            </div>
          </div>
      )
    }

    return null;
  }
}

export default MainUserSidebar;
