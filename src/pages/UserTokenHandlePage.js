import { Component } from 'react';
import UserLoginPage from '../components/authorization/UserLoginPage';
import axios from 'axios';

class UserTokenHandlePage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    axios.post('https://sednor-chat-server.herokuapp.com/post-test', {

    });
  }

  render() {
    return (
        <div>
          <UserLoginPage />
        </div>
    )
  }
}

export default UserTokenHandlePage;
