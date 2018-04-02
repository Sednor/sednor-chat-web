import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';

import * as userTokenActions from '../../actions/userData';

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
          <MainUserSidebar userData={this.props.userDataStore.userData}
                           logout={this.props.logout} />
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
(MainUserPage);
