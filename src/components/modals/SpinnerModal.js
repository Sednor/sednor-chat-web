import { Component } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';
import { Animated } from 'react-animated-css';
import PropTypes from 'prop-types';

class SpinnerModal extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    show: PropTypes.bool,
    abortRequest: PropTypes.func
  };

  static defaultProps = {
    show: false,
    abortRequest: () => {
    }
  };

  render() {
    return (
        <Modal className="spinner-modal" isOpen={this.props.show}>
          <ModalBody>
            <i className="loading-spinner fa fa-spinner" />
            <div className="loading-text">
              Loading
            </div>
          </ModalBody>
          <ModalFooter>
            <Button onClick={this.props.abortRequest} color="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
    )
  }
}

export default SpinnerModal;
