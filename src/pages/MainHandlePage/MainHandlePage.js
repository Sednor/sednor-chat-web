import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userTokenActions from '../../actions/userData';

import MainUserPage from '../MainUserPage/MainUserPage';
import MainSignPage from '../MainSignPage/MainSignPage';

import { getToken } from '../../utils/tokenUtils';

import { fetchToken } from '../../api/token';

class MainHandlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: false,
      tokenLoading: false
    };

    this.fetchUserToken = this.fetchUserToken.bind(this);
    this.logout = this.logout.bind(this);
    this.formDataSubmit = this.formDataSubmit.bind(this);
  }

  componentDidMount() {
    const TOKEN = getToken();

    if (TOKEN) {
      this.setState({ token: true });
      this.props.actions.fetchUserData(TOKEN);
    }
  }

  async fetchUserToken(loginType, data) {
    const TOKEN = await fetchToken(loginType, data);

    if (TOKEN) {
      this.setState({ token: true, tokenLoading: false });
      this.props.actions.fetchUserData(TOKEN);
    }
  }

  formDataSubmit(loginType, data) {
    this.setState({ tokenLoading: true });
    this.fetchUserToken(loginType, data);
  }

  logout() {
    this.setState({ token: false, tokenLoading: false });
    this.props.actions.abortUserData();
  }

  render() {
    if (this.state.token) {
      return (
          <MainUserPage logout={this.logout} />
      )
    }
    return (
        <div>
          <MainSignPage logout={this.logout}
                        show={this.state.tokenLoading || this.props.userDataStore.loading}
                        formDataSubmit={this.formDataSubmit} />
        </div>
    )
  }
}

export default connect(
    state => ({
      userDataStore: state.userData
    }),
    dispatch => ({
      actions: bindActionCreators({ ...userTokenActions }, dispatch)
    }))
(MainHandlePage);
