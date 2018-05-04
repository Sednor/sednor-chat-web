import { Component } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { Button, Form, FormGroup, Modal, ModalBody } from 'reactstrap';

class ChatModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: []
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.createchat = this.createchat.bind(this);
  }

  static propTypes = {
    onChatCreate: PropTypes.func,
    users: PropTypes.array,
    close: PropTypes.func
  };

  static defaultProps = {
    onChatCreate: () => {
    },
    users: [],
    close: PropTypes.func
  };


  handleSelectChange(selectedUsers) {
    this.setState({ selectedUsers });
  }

  createchat(event) {
    if (event) {
      event.preventDefault();
    }
    this.setState({
      selectedUsers: []
    });
    this.props.onchatCreate(this.state.selectedUsers);
  }

  render() {
    const USERS = this.props.users.map(user => ({
      label: `${user.firstName} ${user.lastName}`,
      value: user.id
    }));

    return (
        <Modal className="create-chat-modal border-0"
               isOpen={this.props.show}>
          <div onClick={() => this.props.close()} className="modal-exit">
            <i className="close-icon fa fa-times" />
            <span className="d-block w-100">exit</span>
          </div>

          <Form onSubmit={this.createchat}>
            <h2 className="font-weight-bold pl-3">
              Direct Messages
            </h2>
            <ModalBody className="create-chat-modal-body">
              <FormGroup className="d-flex">
                <Select
                    closeOnSelect
                    multi
                    onChange={this.handleSelectChange}
                    options={USERS}
                    placeholder="Find or start a chat"
                    removeSelected
                    simpleValue
                    value={this.state.selectedUsers}
                />
                <Button disabled={!this.state.selectedUsers.length}
                        className="h-100 ml-2"
                        color="success">Start</Button>
              </FormGroup>
            </ModalBody>
          </Form>
        </Modal>
    );
  }
}

export default ChatModal;
