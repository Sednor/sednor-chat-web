import { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notification from 'react-web-notification';
import PropTypes from 'prop-types';

import MainHandlePage from './pages/MainHandlePage';
import Loading from './layout/Loading';
import UserLoginPage from './pages/UserLoginPage';

import * as notificationActions from './actions/notifications'

class App extends Component {
  static propTypes = {
    notifications: PropTypes.object,
    actions: PropTypes.object
  };

  static defaultProps = {
    notifications: {},
    actions: {}
  };

  handlePermissionGranted() {
    console.log('Permission Granted');
    this.props.actions.enableNotifications();
  }

  handlePermissionDenied() {
    console.log('Permission Denied');
    this.props.actions.disableNotifications();
  }

  handleNotSupported() {
    console.log('Web Notification not Supported');
    this.props.actions.disableNotifications();
  }

  render() {
    return <div className="app">
      <Switch>
        <Route exact path="/" component={MainHandlePage} />
        <Route path="/loading" component={Loading} />
        <Route path="/login" component={UserLoginPage} />
      </Switch>
      <Notification
          ignore={this.props.notifications.ignore && this.props.notifications.title !== ''}
          notSupported={::this.handleNotSupported}
          onPermissionGranted={::this.handlePermissionGranted}
          onPermissionDenied={::this.handlePermissionDenied}
          timeout={5000}
          title={this.props.notifications.title}
          options={this.props.notifications.options}
      />
    </div>;
  }
}

export default connect(
    state => ({
      notifications: state.notifications
    }),
    dispatch => ({
      actions: bindActionCreators({ ...notificationActions }, dispatch)
    })
)(App);
