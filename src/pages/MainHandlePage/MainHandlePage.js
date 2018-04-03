import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as userActions from '../../actions/user';

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
    this.formDataSubmit = this.formDataSubmit.bind(this);
  }

  componentDidMount() {
    const TOKEN = getToken();

    if (TOKEN) {
      this.setState({ token: true });
      this.props.actions.fetchUserData(TOKEN);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!Object.keys(nextProps.user.data).length && !nextProps.user.loading) {
      this.setState({ token: false, tokenLoading: false });
    }
  }

  async fetchUserToken(loginType, data) {
    let token = '';
    try {
      token = await fetchToken(loginType, data);
      this.setState({ token: true, tokenLoading: false });
      this.props.actions.fetchUserData(token);
    }
    catch (error) {
      this.setState({ token: false, tokenLoading: false });
    }
  }

  formDataSubmit(loginType, data) {
    this.setState({ tokenLoading: true });
    this.fetchUserToken(loginType, data);
  }

  render() {
    if (this.state.token) {
      return (
          <MainUserPage logout={this.props.actions.abortUserData} />
      )
    }
    return (
        <div>
          <MainSignPage logout={this.props.actions.abortUserData}
                        show={this.state.tokenLoading || this.props.user.loading}
                        formDataSubmit={this.formDataSubmit} />
        </div>
    )
  }
}

export default connect(
    state => ({
      user: state.user
    }),
    dispatch => ({
      actions: bindActionCreators({ ...userActions }, dispatch)
    }))
(MainHandlePage);
