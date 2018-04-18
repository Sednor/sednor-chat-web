import { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return <header className="main-header">
      <div className="main-logo">
        <h1>
          <Link to={'/'}>Sednor</Link>
        </h1>
      </div>
    </header>
  }
}

export default Header;
