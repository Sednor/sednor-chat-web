import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import RGL, { WidthProvider } from 'react-grid-layout';

import * as currentUser from '../actions/currentUser';
import * as modalsActions from '../actions/modals';
import * as usersActions from '../actions/users';
import * as chatActions from '../actions/chats';
import * as notificationActions from '../actions/notifications';
import * as webSocketActions from '../actions/webSocket';

import MainUserSidebar from '../components/MainUserSidebar';

import ChatModal from '../components/modals/ChatModal';
import ChatItem from '../components/chat/ChatItem';
import SpinnerModal from '../components/modals/SpinnerModal';

const ReactGridLayout = WidthProvider(RGL);

class MainUserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeChats: [],
      chatPosition: 0
    };
    this.createUserchat = this.createUserchat.bind(this);
    this.openUserChat = this.openUserChat.bind(this);
    this.logout = this.logout.bind(this);
    this.findUserById = this.findUserById.bind(this);
    this.closeUserChat = this.closeUserChat.bind(this);
  }

  static propTypes = {
    currentUser: PropTypes.object,
    modals: PropTypes.object,
    users: PropTypes.object,
    chats: PropTypes.object,
    actions: PropTypes.object
  };

  componentDidMount() {
    this.props.webSocket.socket.on('message', data => {
      this.props.actions.listenToChatMessage(this.props, data);
    });
    this.props.webSocket.socket.on('create-chat', data => {
      this.props.actions.listenToNewChatRequest(this.props, data);
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.chats.active.length) {
      this.setState({
        activeChats: nextProps.chats.active
      });
    }
  }

  createUserchat(members) {
    const CHAT_MEMBERS = members.split(',').map(item => this.props.users.data.find(elem => elem.id === item));

    CHAT_MEMBERS.push(this.props.currentUser.data);
    this.props.actions.closeChatModal();
    const CHAT = this.props.chats.all.find(chat => {
      if (chat.users.length === CHAT_MEMBERS.length && chat.users.every(user => CHAT_MEMBERS.find(item => item.id === user.id))) {
        return chat;
      }
    });

    if (this.state.activeChats.length === 6) {
      const WARNING_NOTIFICATION = {
        type: 'warning',
        title: 'Too many chats opened!',
        body: 'You have opened too many chats. Please, close some of them to open the new one.',
        tag: Date.now()
      };

      this.props.actions.createNotification(WARNING_NOTIFICATION);
      return;
    }

    if (!this.state.activeChats.find(item => item.id === CHAT.id)) {
      if (CHAT) {
        this.props.actions.openChat(CHAT);
      } else {
        this.props.actions.createChat(CHAT_MEMBERS, this.props.webSocket.socket);
      }
      this.setState(prevState => ({
        positionCounter: prevState.positionCounter < 6 ? prevState.positionCounter + 1 : 0
      }));
    }
  }

  openUserChat(chat) {
    if (this.state.activeChats.length > 5) {
      const WARNING_NOTIFICATION = {
        type: 'warning',
        title: 'Too many chats opened!',
        body: 'You have opened too many chats. Please, close some of them to open the new one.',
        tag: Date.now()
      };

      this.props.actions.createNotification(WARNING_NOTIFICATION);
      return;
    }
    if (!this.state.activeChats.find(item => item.id === chat.id)) {
      const FREE_POSITIONS = this.findFreePosition();
      const POSITION = FREE_POSITIONS[0];

      this.setState({
        chatPosition: POSITION
      });
      this.props.actions.openChat({ ...chat, position: POSITION });
    }
  }

  closeUserChat(chat) {
    const ITEMS_TO_MOVE = [];

    for (let i = this.state.activeChats.indexOf(chat) + 1; i < this.state.activeChats.length; i++) {
      ITEMS_TO_MOVE.push({ ...this.state.activeChats[i], position: this.state.activeChats[i].position - 1 });
      /*
       can be bugs with same chats
       */
    }
    ITEMS_TO_MOVE.forEach(item => {
      this.props.actions.updateChat(item);
    });
    this.props.actions.closeChat(chat);
  }

  findFreePosition() {
    return [0, 1, 2, 3, 4, 5].filter(item => !this.state.activeChats.find(chat => chat.position === item));
  }

  logout() {
    this.props.actions.abortUserData();
    this.props.history.push('/login');
  }

  findUserById(id) {
    return this.props.users.data.find(user => user.id === id) || null;
  }

  render() {
    const AVAILABLE_USERS = this.props.users.data.filter(user => user.id !== this.props.currentUser.data.id);
    const ITEM_LAYOUT = {
      x: this.state.chatPosition > 2 ? this.state.chatPosition - 3 : this.state.chatPosition,
      y: 0,
      w: 1,
      h: 3
    };

    return (
      <div className="messenger-main-page">
        <MainUserSidebar userData={ this.props.currentUser.data }
                         logout={ this.logout }
                         onChatModalOpen={ this.props.actions.openChatModal }
                         users={ AVAILABLE_USERS }
                         findUserById={ this.findUserById }
                         chats={ this.props.chats.all }
                         onChatOpen={ this.openUserChat }
                         activeChats={ this.state.activeChats }

        />
        <ReactGridLayout className="messenger-main-page-content"
                         draggableCancel="input,textarea,i,form"
                         cols={ 3 }
                         useCSSTransforms={ true }>

          { this.state.activeChats.map((chat, index) => <div
            className="chat"
            key={ index }
            data-grid={ { i: index.toString(), ...ITEM_LAYOUT } }>
            <ChatItem chat={ chat }
                      chatsData={ this.props.chats }
                      addMessage={ this.props.actions.addChatMessage }
                      closeChat={ this.closeUserChat }
                      users={ this.props.users.data }
                      currentUser={ this.props.currentUser.data }
                      index={ index }
                      socket={ this.props.webSocket.socket }/>
          </div>)
          }

        </ReactGridLayout>
        <ChatModal onchatCreate={ this.createUserchat }
                   show={ this.props.modals.chatModal }
                   users={ AVAILABLE_USERS }
                   close={ this.props.actions.closeChatModal }/>
        <SpinnerModal show={ this.props.chats.loading }/>
      </div>
    );
  }
}

export default compose(connect(
  state => ({
    currentUser: state.currentUser,
    modals: state.modals,
    users: state.users,
    chats: state.chats,
    webSocket: state.webSocket
  }),
  dispatch => ({
    actions: bindActionCreators({ ...currentUser, ...modalsActions, ...usersActions, ...chatActions, ...notificationActions, ...webSocketActions }, dispatch)
  })))(MainUserPage);
