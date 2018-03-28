import { Component } from 'react';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import { Animated } from 'react-animated-css';
import PropTypes from 'prop-types';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  static propTypes = {
    values: PropTypes.object,
    errors: PropTypes.object
  };

  static defaultProps = {
    values: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirm: ''
    },
    errors: {
      email: false,
      firstName: false,
      lastName: false,
      password: false,
      passwordConfirm: false
    }
  };

  onInputValueChange(value, inputType) {
    this.props.onInputValueChange(value, inputType);
  }

  validate() {
    this.props.validate('signUp');
  }

  render() {
    return (
        <Animated animationIn="pulse" animationOut="fadeOut">
          <div>
            <FormGroup className="d-flex">
              <Input value={this.props.values.email}
                     className={this.props.errors.email ? 'error-input' : ''}
                     onChange={event => this.onInputValueChange(event.target.value, 'email')}
                     type="email"
                     placeholder="Email" />

            </FormGroup>
            <FormGroup>
              <Row>
                <Col md="6" sm="12" xs="12" className="mt-md-0 mt-sm-2">
                  <Input onChange={event => this.onInputValueChange(event.target.value, 'firstName')}
                         value={this.props.values.firstName}
                         className={this.props.errors.firstName ? 'error-input' : ''}
                         type="text"
                         placeholder="First name" />
                </Col>
                <Col md="6" sm="12" xs="12" className="mt-md-0 mt-sm-2">
                  <Input onChange={event => this.onInputValueChange(event.target.value, 'lastName')}
                         value={this.props.values.lastName}
                         className={this.props.errors.lastName ? 'error-input' : ''}
                         type="text"
                         placeholder="Last name" />
                </Col>
              </Row>
            </FormGroup>
            <FormGroup>
              <Input onChange={event => this.onInputValueChange(event.target.value, 'password')}
                     value={this.props.values.password}
                     className={(this.props.errors.password || this.props.errors.passwordConfirm) ? 'error-input' : ''}
                     type="password"
                     placeholder="Password" />
            </FormGroup>
            <FormGroup>
              <Input onChange={event => this.onInputValueChange(event.target.value, 'passwordConfirm')}
                     value={this.props.values.passwordConfirm}
                     className={this.props.errors.passwordConfirm ? 'error-input' : ''}
                     type="password"
                     placeholder="Confirm password" />
            </FormGroup>
            {
              Object.keys(this.props.errors).some(key => this.props.errors[key]) ?
                  <h5 style={{ textAlign: 'center' }}>Enter all fields correctly</h5> : null
            }
            <Button onClick={this.validate} className="submit-button" size="lg">Sign Up</Button>
          </div>
        </Animated>
    )
  }
}

export default SignUp;
