import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

import * as userActions from '../../actions/user';

import MainUserSidebar from '../../components/MainUserSidebar';

class MainUserPage extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    logout: PropTypes.func
  };

  static defaultProps = {
    logout: () => {
    }
  };

  render() {
    return (
        <div className="messenger-main-page">
          <MainUserSidebar userData={this.props.user.data}
                           logout={this.props.logout} />
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
(MainUserPage);
