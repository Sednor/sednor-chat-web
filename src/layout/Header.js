import { Component } from 'react';
import { Col, Row } from 'reactstrap';

class Header extends Component {
  render() {
    return <header className="main-header">
      <div className="main-logo">
        <Row>
          <Col xs="12" sm="10" md="8" lg="6">
            <h2>
              Sednor
            </h2>
          </Col>
        </Row>
      </div>
    </header>
  }
}

export default Header;
