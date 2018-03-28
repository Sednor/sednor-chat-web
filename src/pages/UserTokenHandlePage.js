import { Component } from 'react';
import UserLoginPage from '../components/authorization/UserLoginPage';
import axios from 'axios';

class UserTokenHandlePage extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    axios.post('https://sednor-chat-server.herokuapp.com/post-test', {
      headers: {
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
      }
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
