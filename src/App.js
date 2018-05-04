import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from 'react-web-notification';
import PropTypes from 'prop-types';

import Router from './components/Router';

import * as notificationActions from './actions/notifications';
import * as chatActions from './actions/chats';

import messageM4R from './assets/audio/message.m4r';
import messageMP3 from './assets/audio/message.mp3';
import messageOGG from './assets/audio/message.ogg';


class App extends Component {
  constructor(props) {
    super(props);
    this.audioSound = React.createRef();
  }

  static propTypes = {
    notifications: PropTypes.object,
    actions: PropTypes.object
  };

  static defaultProps = {
    notifications: {},
    actions: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.notifications.type === 'message') {
      this.audioSound.current.play();
    }
  }

  handlePermissionGranted() {
    this.props.actions.enableNotifications();
  }

  handlePermissionDenied() {
    this.props.actions.disableNotifications();
  }

  handleNotSupported() {
    this.props.actions.disableNotifications();
  }

  handleNotificationClick(event) {
    if (event.target.title !== 'Error') {
      const CHAT = this.props.chats.all.find(chat => chat.id === event.target.data);

      if (!this.props.chats.active.find(chat => chat.id === CHAT.id)) {
        this.props.actions.openChat(CHAT);
      }
    }
  }

  render() {
    return <div className="app">
      <Router/>
      <Notification
          ignore={this.props.notifications.ignore && this.props.notifications.title !== ''}
          notSupported={::this.handleNotSupported}
          onPermissionGranted={::this.handlePermissionGranted}
          onPermissionDenied={::this.handlePermissionDenied}
          onClick={::this.handleNotificationClick}
          timeout={5000}
          title={this.props.notifications.title}
          options={this.props.notifications.options}
      />
      <audio ref={this.audioSound} id="sound" preload="auto">
        <source src={messageMP3} type="audio/mpeg"/>
        <source src={messageOGG} type="audio/ogg"/>
        <source src={messageM4R} type="audio/m4r"/>
        <embed hidden="true" autostart="false" loop="false" src={messageMP3}/>
      </audio>
    </div>;
  }
}

export default connect(
    state => ({
      notifications: state.notifications,
      chats: state.chats
    }),
    dispatch => ({
      actions: bindActionCreators({ ...notificationActions, ...chatActions }, dispatch)
    })
)(App);
