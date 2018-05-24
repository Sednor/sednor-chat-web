import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Router from './components/Router';

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
      <Router />
      <audio key={Math.random()} ref={this.audioSound} id="sound" preload="auto">
        <source src={messageMP3} type="audio/mpeg" key={Math.random()} />
        <source src={messageOGG} type="audio/ogg" key={Math.random()} />
        <source src={messageM4R} type="audio/m4r" key={Math.random()} />
        <embed hidden="true" autostart="false" loop="false" src={messageMP3} key={Math.random()} />
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
      actions: bindActionCreators({ ...chatActions }, dispatch)
    })
)(App);
