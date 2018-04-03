import { Component } from 'react';
import PropTypes from 'prop-types';

import UserLoginForm from '../../components/authorization/UserLoginForm';
import SpinnerModal from '../../components/modals/SpinnerModal';
import Header from '../../layout/Header';

class MainSignPage extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    show: PropTypes.bool,
    formDataSubmit: PropTypes.func,
    abortRequest: PropTypes.func
  };

  static defaultProps = {
    show: false,
    formDataSubmit: () => {},
    abortRequest: () => {},
  };

  render() {
    return (
        <div>
          <Header />
          <UserLoginForm onSuccess={this.props.formDataSubmit} />
          <SpinnerModal show={this.props.show}
                        abortRequest={this.props.logout} />
        </div>
    )
  }
}

export default MainSignPage;
