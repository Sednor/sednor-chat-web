import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchToken } from '../api/token';

import UserLoginForm from '../components/authorization/UserLoginForm';
import SpinnerModal from '../components/modals/SpinnerModal';

import Header from '../layout/Header';

import * as notificationActions from '../actions/notifications';

class UserLoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.fetchUserToken = this.fetchUserToken.bind(this);
    this.formDataSubmit = this.formDataSubmit.bind(this);
  }

  async fetchUserToken(loginType, data) {
    try {
      await fetchToken(loginType, data);
      if (loginType === 'signUp') {
        this.setState({ loading: false });
        const SUCCESS_NOTIFICATION = {
          type: 'success',
          title: 'Your account was successfully created!',
          body: 'Verifying letter was sent to your email. Please, verify your account and sign in!',
          tag: Date.now()
        };

        this.props.actions.createNotification(SUCCESS_NOTIFICATION);
      }
      if (loginType === 'signIn') {
        this.setState({ loading: false });
        this.props.history.push('/loading');
      }
    } catch (error) {
      const ERROR_NOTIFICATION = {
        type: 'error',
        title: 'Error',
        body: error.message,
        tag: Date.now()
      };

      this.props.actions.createNotification(ERROR_NOTIFICATION);
      this.setState({ loading: false });
    }
  }

  formDataSubmit(loginType, data) {
    this.setState({ loading: true });
    this.fetchUserToken(loginType, data);
  }

  render() {
    return (
        <div>
          <Header/>
          <UserLoginForm onSuccess={this.formDataSubmit}/>
          <SpinnerModal show={this.state.loading}
                        abortRequest={() => this.setState({ loading: false })}/>
        </div>
    );
  }
}

export default connect(
    dispatch => ({
      actions: bindActionCreators({ ...notificationActions }, dispatch)
    })
)(UserLoginPage);
