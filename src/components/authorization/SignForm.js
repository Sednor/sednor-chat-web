import { Component } from 'react';
import { Button, Col, FormGroup, Input, Row } from 'reactstrap';
import { Animated } from 'react-animated-css';
import PropTypes from 'prop-types';

class SignForm extends Component {
  constructor(props) {
    super(props);
    this.onInputValueChange = this.onInputValueChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  static propTypes = {
    formType: PropTypes.string,
    values: PropTypes.object,
    errors: PropTypes.object,
    validate: PropTypes.func,
    onInputValueChange: PropTypes.func
  };

  static defaultProps = {
    formType: 'signIn',
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
    },
    validate: () => {
    },
    onInputValueChange: () => {
    }
  };

  validate() {
    this.props.validate();
  }

  onInputValueChange(value, inputType) {
    this.props.onInputValueChange(value, inputType);
  }

  render() {
    return (
        <div>
          <FormGroup>
            <Input value={this.props.values.email}
                   className={this.props.errors.email ? 'error-input' : ''}
                   onChange={event => this.onInputValueChange(event.target.value, 'email')}
                   type="email"
                   placeholder="Email" />
          </FormGroup>
          {
            this.props.formType === 'signUp' &&
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
          }

          <FormGroup>
            <Input value={this.props.values.password}
                   className={this.props.errors.password ? 'error-input' : ''}
                   onChange={event => this.onInputValueChange(event.target.value, 'password')}
                   type="password"
                   placeholder="Password" />
          </FormGroup>
          {
            this.props.formType === 'signUp' &&
            <FormGroup>
              <Input onChange={event => this.onInputValueChange(event.target.value, 'passwordConfirm')}
                     value={this.props.values.passwordConfirm}
                     className={this.props.errors.passwordConfirm ? 'error-input' : ''}
                     type="password"
                     placeholder="Confirm password" />
            </FormGroup>
          }

          {
            Object.keys(this.props.errors).some(key => this.props.errors[key]) ?
                <h5 style={{ textAlign: 'center' }}>Enter all fields correctly</h5> : null
          }
          <Button onClick={this.validate} className="submit-button" size="lg"> {
            this.props.formType === 'signIn' ? 'Sign In' : 'Sign Up'
          }</Button>
        </div>

    )
  }
}

export default SignForm;
