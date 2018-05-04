import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { getToken } from '../utils/tokenUtils';

import MainUserPage from './MainUserPage';

class MainHandlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authorized: false
    };
  }

  static propTypes = {
    currentUser: PropTypes.object
  };

  componentWillMount() {
    const TOKEN = getToken();

    if (TOKEN && TOKEN !== 'undefined') {
      this.setState({ authorized: true });
    } else {
      this.setState({ authorized: false });
    }
  }

  render() {
    if (this.state.authorized && this.props.currentUser.data.id) {
      return <MainUserPage history={this.props.history}/>;
    }
    if (this.state.authorized && !this.props.currentUser.data.id) {
      return <Redirect to="/loading"/>;
    }
    return <Redirect to="/login"/>;
  }
}

export default connect(
    state => ({
      currentUser: state.currentUser
    }))(MainHandlePage);
