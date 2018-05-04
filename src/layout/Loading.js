import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as currentUserActions from '../actions/currentUser';
import * as usersActions from '../actions/users';
import * as chatActions from '../actions/chats';
import * as webSocketActions from '../actions/webSocket';

import { getToken } from '../utils/tokenUtils';
import SpinnerModal from '../components/modals/SpinnerModal';

class Loading extends Component {
  static propTypes = {
    currentUser: PropTypes.object,
    modals: PropTypes.object,
    users: PropTypes.object,
    chats: PropTypes.object,
    webSocket: PropTypes.object,
    actions: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.abortLoading = this.abortLoading.bind(this);
  }

  componentDidMount() {
    const TOKEN = getToken();

    if (TOKEN) {
      this.props.actions.socketsConnecting();
      this.uploadAllEntities(TOKEN);
    } else {
      this.props.history.push('/');
    }
  }

  uploadAllEntities(TOKEN) {
    try {
      this.props.actions.fetchUserData(TOKEN);
      this.props.actions.fetchUsers();
      this.props.actions.fetchChats();
    } catch (error) {
      this.abortLoading();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser.data.id && !nextProps.chats.loading && !nextProps.users.loading && nextProps.webSocket.socket) {
      this.props.actions.socketsConnect(nextProps.webSocket.socket);
      nextProps.chats.all.forEach(chat => {
        nextProps.webSocket.socket.emit('open-chat', { room: chat.id });
      });
      this.props.history.push('/');
    }
  }

  abortLoading() {
    this.props.actions.abortUserData();
    this.props.history.push('/');
  }

  render() {
    return <SpinnerModal show abortRequest={this.abortLoading}/>;
  }
}

export default connect(
    state => ({
      currentUser: state.currentUser,
      users: state.users,
      chats: state.chats,
      modals: state.modals,
      webSocket: state.webSocket
    }),
    dispatch => ({
      actions: bindActionCreators({ ...currentUserActions, ...usersActions, ...chatActions, ...webSocketActions }, dispatch)
    }))(Loading);
